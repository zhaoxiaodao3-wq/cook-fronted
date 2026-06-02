import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Plus, Trash2, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';

const STEPS = ['基本信息', '食材清单', '制作步骤', '其他补充'];
const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert'];

export const Upload = () => {
  const navigate = useNavigate();
  const { addRecipe } = useStore();
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [difficulty, setDifficulty] = useState<'Simple'|'Medium'|'Hard'>('Simple');
  const [duration, setDuration] = useState('30 mins');
  const [crowd, setCrowd] = useState('Family');
  
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [steps, setRecipeSteps] = useState([{ text: '' }]);
  
  const [category, setCategory] = useState('Dinner');
  const [tips, setTips] = useState('');

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const addIngredient = () => setIngredients([...ingredients, { name: '', amount: '' }]);
  const removeIngredient = (idx: number) => setIngredients(ingredients.filter((_, i) => i !== idx));
  const updateIngredient = (idx: number, field: 'name'|'amount', val: string) => {
    const newIng = [...ingredients];
    newIng[idx][field] = val;
    setIngredients(newIng);
  };

  const addStep = () => setRecipeSteps([...steps, { text: '' }]);
  const removeStep = (idx: number) => setRecipeSteps(steps.filter((_, i) => i !== idx));
  const updateStep = (idx: number, val: string) => {
    const newSt = [...steps];
    newSt[idx].text = val;
    setRecipeSteps(newSt);
  };

  const updateStepImage = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newSt = [...steps];
      newSt[idx].image = URL.createObjectURL(e.target.files[0]);
      setRecipeSteps(newSt);
    }
  };

  const handlePublish = () => {
    addRecipe({
      title: title || '未命名菜谱',
      coverImage: coverImage || 'https://images.unsplash.com/photo-1495147466023-e6a920409c13?w=800',
      category,
      duration,
      difficulty,
      crowd,
      ingredients: ingredients.filter(i => i.name.trim()),
      steps: steps.filter(s => s.text.trim()),
      tips
    });
    navigate('/profile');
  };

  return (
    <div className="bg-[#FBF8FD] min-h-screen pb-24 flex flex-col">
      <header className="pt-8 pb-4 px-5 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900 text-center">上传菜谱</h1>
        <div className="flex justify-between mt-6 px-2">
          {STEPS.map((stepName, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                idx === currentStep ? 'bg-[#52C41A] text-white shadow-md' : 
                idx < currentStep ? 'bg-[#52C41A]/20 text-[#52C41A]' : 'bg-gray-100 text-gray-400'
              }`}>
                {idx < currentStep ? <Check size={14} /> : idx + 1}
              </div>
              <span className={`text-[10px] ${idx === currentStep ? 'text-[#52C41A] font-bold' : 'text-gray-400'}`}>{stepName}</span>
            </div>
          ))}
          <div className="absolute top-[52px] left-8 right-8 h-0.5 bg-gray-100 z-0">
            <div className="h-full bg-[#52C41A] transition-all duration-300" style={{ width: `${(currentStep / 3) * 100}%` }} />
          </div>
        </div>
      </header>

      <main className="flex-1 p-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {currentStep === 0 && (
              <>
                <div className="bg-white p-5 rounded-[16px] shadow-sm">
                  <label className="relative aspect-video bg-gray-50 rounded-[12px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 mb-6 cursor-pointer active:bg-gray-100 transition-colors overflow-hidden block">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCoverImage(URL.createObjectURL(e.target.files[0]));
                        }
                      }} 
                    />
                    {coverImage ? (
                      <img src={coverImage} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <>
                        <Camera size={32} className="mb-2" />
                        <span className="text-sm font-medium">点击上传成品图</span>
                      </>
                    )}
                  </label>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">菜品名称</label>
                      <input 
                        type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="例如：红烧肉、蒜蓉西兰花"
                        className="w-full bg-gray-50 h-12 px-4 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] border border-transparent focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">烹饪时长</label>
                        <input 
                          type="text" 
                          value={duration}
                          onChange={e => setDuration(e.target.value)}
                          placeholder="如 30 mins"
                          className="w-full bg-gray-50 h-12 px-4 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-2">适合人群</label>
                        <input 
                          type="text" 
                          value={crowd}
                          onChange={e => setCrowd(e.target.value)}
                          placeholder="如 老少皆宜"
                          className="w-full bg-gray-50 h-12 px-4 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">难度</label>
                      <div className="flex gap-3">
                        {['Simple', 'Medium', 'Hard'].map(d => (
                          <button
                            key={d}
                            onClick={() => setDifficulty(d as any)}
                            className={`flex-1 py-2.5 rounded-[12px] text-sm font-medium transition-colors ${difficulty === d ? 'bg-[#52C41A] text-white' : 'bg-gray-50 text-gray-600'}`}
                          >
                            {d === 'Simple' ? '简单' : d === 'Medium' ? '中等' : '困难'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 1 && (
              <div className="bg-white p-5 rounded-[16px] shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-bold text-gray-900">添加食材</h2>
                  <span className="text-xs text-gray-400">滑动删除</span>
                </div>
                <div className="space-y-3 mb-6">
                  {ingredients.map((ing, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        placeholder="食材名" 
                        value={ing.name}
                        onChange={e => updateIngredient(idx, 'name', e.target.value)}
                        className="flex-1 bg-gray-50 h-12 px-4 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A]"
                      />
                      <input 
                        type="text" 
                        placeholder="用量" 
                        value={ing.amount}
                        onChange={e => updateIngredient(idx, 'amount', e.target.value)}
                        className="w-24 bg-gray-50 h-12 px-4 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A]"
                      />
                      {ingredients.length > 1 && (
                        <button onClick={() => removeIngredient(idx)} className="w-10 h-12 flex items-center justify-center text-red-400 active:scale-90">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addIngredient}
                  className="w-full py-3 border-2 border-dashed border-[#52C41A]/30 text-[#52C41A] font-medium rounded-[12px] flex items-center justify-center gap-2 active:bg-[#52C41A]/5 transition-colors"
                >
                  <Plus size={18} /> 继续添加食材
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-white p-5 rounded-[16px] shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-bold text-gray-900">制作步骤</h2>
                </div>
                <div className="space-y-6 mb-6">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#52C41A]/10 text-[#52C41A] flex items-center justify-center font-bold text-xs shrink-0 mt-2">
                        {idx + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <textarea 
                          placeholder={`第 ${idx + 1} 步的详细描述...`}
                          value={step.text}
                          onChange={e => updateStep(idx, e.target.value)}
                          className="w-full h-24 bg-gray-50 p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] resize-none"
                        />
                        <label className="h-20 bg-gray-50 rounded-[12px] border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs relative overflow-hidden cursor-pointer active:bg-gray-100 block">
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => updateStepImage(idx, e)} 
                          />
                          {step.image ? (
                            <img src={step.image} alt={`Step ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover" />
                          ) : (
                            <>
                              <Camera size={16} className="mr-2" /> 添加步骤图 (可选)
                            </>
                          )}
                        </label>
                      </div>
                      {steps.length > 1 && (
                        <button onClick={() => removeStep(idx)} className="text-red-400 active:scale-90 self-start mt-2">
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={addStep}
                  className="w-full py-3 border-2 border-dashed border-[#52C41A]/30 text-[#52C41A] font-medium rounded-[12px] flex items-center justify-center gap-2 active:bg-[#52C41A]/5 transition-colors"
                >
                  <Plus size={18} /> 添加下一步
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-white p-5 rounded-[16px] shadow-sm space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-3">菜品分类</label>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map(c => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={`py-3 rounded-[12px] text-sm font-medium transition-colors ${category === c ? 'bg-[#52C41A] text-white shadow-md' : 'bg-gray-50 text-gray-600'}`}
                      >
                        {c === 'Breakfast' ? '早餐' : c === 'Lunch' ? '午餐' : c === 'Dinner' ? '晚餐' : '甜点'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">厨神贴士 (选填)</label>
                  <textarea 
                    value={tips}
                    onChange={e => setTips(e.target.value)}
                    placeholder="分享你的独门秘籍，让大家做得更好吃！"
                    className="w-full h-24 bg-gray-50 p-3 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] resize-none"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="fixed bottom-[80px] left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        {currentStep > 0 && (
          <button 
            onClick={prevStep}
            className="w-1/3 py-3.5 rounded-[16px] bg-gray-100 font-bold text-gray-600 active:bg-gray-200 transition-colors"
          >
            上一步
          </button>
        )}
        {currentStep < 3 ? (
          <button 
            onClick={nextStep}
            className="flex-1 py-3.5 rounded-[16px] bg-[#52C41A] font-bold text-white shadow-[0_8px_16px_rgba(82,196,26,0.2)] flex items-center justify-center gap-2 active:bg-[#45A616] transition-colors"
          >
            下一步 <ArrowRight size={18} />
          </button>
        ) : (
          <button 
            onClick={handlePublish}
            className="flex-1 py-3.5 rounded-[16px] bg-[#52C41A] font-bold text-white shadow-[0_8px_16px_rgba(82,196,26,0.2)] flex items-center justify-center gap-2 active:bg-[#45A616] transition-colors"
          >
            发布菜谱 <Check size={18} />
          </button>
        )}
      </div>
    </div>
  );
};