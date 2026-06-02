import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Heart, Star, Clock, ChefHat, Users, MessageSquare, Plus, Minus, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, favorites, toggleFavorite, rateRecipe, suggestRecipe, currentUser } = useStore();
  const recipe = recipes.find(r => r.id === id);

  const [portions, setPortions] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [showRateModal, setShowRateModal] = useState(false);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [ratingVal, setRatingVal] = useState(5);
  const [suggestVal, setSuggestVal] = useState('');
  const [activeTab, setActiveTab] = useState<'reviews'|'suggestions'>('reviews');

  if (!recipe) return <div className="p-8 text-center text-gray-500">菜谱未找到</div>;

  const isFav = favorites.includes(recipe.id);

  const toggleIngredient = (idx: number) => {
    const newSet = new Set(checkedIngredients);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setCheckedIngredients(newSet);
  };

  const handleIngredientClick = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/recipes?q=${encodeURIComponent(name)}`);
  };

  const submitRating = () => {
    rateRecipe(recipe.id, ratingVal);
    setShowRateModal(false);
  };

  const submitSuggestion = () => {
    if (suggestVal.trim()) {
      suggestRecipe(recipe.id, suggestVal);
      setSuggestVal('');
      setShowSuggestModal(false);
      setActiveTab('suggestions');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-[#FBF8FD] min-h-screen pb-24"
    >
      <div className="relative h-[300px] w-full">
        <ImageWithFallback src={recipe.coverImage} alt={recipe.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <Heart size={20} fill={isFav ? "#EF4444" : "none"} color={isFav ? "#EF4444" : "white"} />
        </button>
      </div>

      <div className="relative -mt-6 bg-[#FBF8FD] rounded-t-[24px] px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{recipe.title}</h1>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <ImageWithFallback src={recipe.author.avatar} alt={recipe.author.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">{recipe.author.name}</p>
              <p className="text-[10px] text-gray-500">{new Date(recipe.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
              <Star size={18} fill="currentColor" /> {recipe.rating}
            </div>
            <p className="text-[10px] text-gray-500">{recipe.ratingCount} 人已评</p>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button 
            onClick={() => setShowRateModal(true)}
            className="flex-1 bg-white border border-gray-200 py-2.5 rounded-[12px] flex items-center justify-center gap-2 text-sm font-medium text-gray-700 active:bg-gray-50 shadow-sm"
          >
            <Star size={16} className="text-yellow-500" /> 我要评分
          </button>
          <button 
            onClick={() => setShowSuggestModal(true)}
            className="flex-1 bg-[#52C41A]/10 text-[#52C41A] py-2.5 rounded-[12px] flex items-center justify-center gap-2 text-sm font-medium active:bg-[#52C41A]/20 shadow-sm"
          >
            <MessageSquare size={16} /> 我要写建议
          </button>
        </div>

        <div className="flex justify-between bg-white p-4 rounded-[16px] shadow-sm mb-6">
          <div className="flex flex-col items-center gap-1">
            <Clock size={20} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{recipe.duration}</span>
          </div>
          <div className="w-px h-10 bg-gray-100" />
          <div className="flex flex-col items-center gap-1">
            <ChefHat size={20} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{recipe.difficulty}</span>
          </div>
          <div className="w-px h-10 bg-gray-100" />
          <div className="flex flex-col items-center gap-1">
            <Users size={20} className="text-gray-400" />
            <span className="text-xs font-medium text-gray-600">{recipe.crowd}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">食材清单</h2>
            <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full shadow-sm">
              <button onClick={() => setPortions(Math.max(1, portions - 1))} className="w-6 h-6 flex items-center justify-center text-gray-400 active:text-[#52C41A]">
                <Minus size={14} />
              </button>
              <span className="text-sm font-medium w-4 text-center">{portions}</span>
              <button onClick={() => setPortions(portions + 1)} className="w-6 h-6 flex items-center justify-center text-gray-400 active:text-[#52C41A]">
                <Plus size={14} />
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-[16px] p-2 shadow-sm">
            {recipe.ingredients.map((ing, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                onClick={() => toggleIngredient(idx)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${checkedIngredients.has(idx) ? 'bg-[#52C41A] border-[#52C41A]' : 'border-gray-300'}`}>
                    {checkedIngredients.has(idx) && <Check size={12} className="text-white" />}
                  </div>
                  <span 
                    className={`text-sm ${checkedIngredients.has(idx) ? 'text-gray-400 line-through' : 'text-gray-800'}`}
                    onClick={(e) => handleIngredientClick(ing.name, e)}
                  >
                    {ing.name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">{ing.amount} {portions > 1 && '(x' + portions + ')'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">制作步骤</h2>
          <div className="space-y-4">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-[#52C41A]/10 text-[#52C41A] flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  {idx < recipe.steps.length - 1 && <div className="w-px h-full bg-[#52C41A]/20 mt-2" />}
                </div>
                <div className="pb-6 pt-0.5">
                  <p className="text-gray-800 text-sm leading-relaxed mb-3">{step.text}</p>
                  {step.image && (
                    <ImageWithFallback src={step.image} alt={`Step ${idx + 1}`} className="w-full h-32 object-cover rounded-[12px]" />
                  )}
                </div>
              </div>
            ))}
          </div>
          {recipe.tips && (
            <div className="mt-2 bg-yellow-50 rounded-[16px] p-4 border border-yellow-100 flex gap-3">
              <ChefHat className="text-yellow-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-sm font-bold text-yellow-800 mb-1">厨神贴士</h4>
                <p className="text-xs text-yellow-700 leading-relaxed">{recipe.tips}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            <button 
              className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'reviews' ? 'text-[#52C41A] border-b-2 border-[#52C41A]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('reviews')}
            >
              所有评分 ({recipe.reviews.length})
            </button>
            <button 
              className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'suggestions' ? 'text-[#52C41A] border-b-2 border-[#52C41A]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('suggestions')}
            >
              做菜建议 ({recipe.suggestions.length})
            </button>
          </div>

          <div className="space-y-4">
            {activeTab === 'reviews' && (
              recipe.reviews.length > 0 ? recipe.reviews.map(rev => (
                <div key={rev.id} className="bg-white p-4 rounded-[16px] shadow-sm flex gap-3">
                  <ImageWithFallback src={rev.userAvatar} alt={rev.userName} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-gray-900">{rev.userName}</h4>
                      <span className="text-[10px] text-gray-400">{new Date(rev.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                </div>
              )) : <p className="text-center text-sm text-gray-400 py-4">暂无评分，来做第一个评分的人吧！</p>
            )}

            {activeTab === 'suggestions' && (
              recipe.suggestions.length > 0 ? recipe.suggestions.map(sugg => (
                <div key={sugg.id} className="bg-white p-4 rounded-[16px] shadow-sm flex gap-3">
                  <ImageWithFallback src={sugg.userAvatar} alt={sugg.userName} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-gray-900">{sugg.userName}</h4>
                      <span className="text-[10px] text-gray-400">{new Date(sugg.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-[12px]">{sugg.content}</p>
                  </div>
                </div>
              )) : <p className="text-center text-sm text-gray-400 py-4">暂无建议，期待你的分享！</p>
            )}
          </div>
        </div>
      </div>

      {showRateModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[24px] p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-center mb-6">为这道菜打分</h3>
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map(star => (
                <button key={star} onClick={() => setRatingVal(star)} className="focus:outline-none transition-transform active:scale-75">
                  <Star size={40} fill={star <= ratingVal ? "#EAB308" : "none"} className={star <= ratingVal ? "text-yellow-500" : "text-gray-200"} />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowRateModal(false)} className="flex-1 py-3 rounded-[12px] bg-gray-100 font-medium text-gray-600">取消</button>
              <button onClick={submitRating} className="flex-1 py-3 rounded-[12px] bg-[#52C41A] font-medium text-white shadow-lg shadow-[#52C41A]/30">提交</button>
            </div>
          </motion.div>
        </div>
      )}

      {showSuggestModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm">
          <motion.div initial={{ y: 300 }} animate={{ y: 0 }} className="bg-white rounded-t-[24px] sm:rounded-[24px] p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">写个建议吧</h3>
              <button onClick={() => setShowSuggestModal(false)} className="text-gray-400 p-2">✕</button>
            </div>
            <textarea 
              value={suggestVal}
              onChange={(e) => setSuggestVal(e.target.value)}
              placeholder="分享你的烹饪心得或改进建议..."
              className="w-full h-32 bg-gray-50 border border-gray-100 rounded-[12px] p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] resize-none mb-6"
            />
            <button 
              onClick={submitSuggestion} 
              disabled={!suggestVal.trim()}
              className="w-full py-3.5 rounded-[12px] bg-[#52C41A] font-bold text-white shadow-lg shadow-[#52C41A]/30 disabled:opacity-50 disabled:shadow-none transition-opacity"
            >
              提交建议
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};