import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Settings, ChevronRight, BookOpen, Star, MessageSquare, Heart, LogOut, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, recipes, favorites } = useStore();
  
  const validRecipes = recipes.filter(r => r != null);
  const myUploads = validRecipes.filter(r => r.author?.id === currentUser.id);
  const myReviews = validRecipes.flatMap(r => r.reviews || []).filter(rev => rev?.userId === currentUser.id);
  const mySuggestions = validRecipes.flatMap(r => r.suggestions || []).filter(sugg => sugg?.userId === currentUser.id);

  const [activeTab, setActiveTab] = useState<'uploads'|'favorites'|'none'>('none');

  const STATS = [
    { label: '我的上传', value: myUploads.length, icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50', action: () => setActiveTab('uploads') },
    { label: '我的评价', value: myReviews.length, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50', action: () => {} },
    { label: '我的建议', value: mySuggestions.length, icon: MessageSquare, color: 'text-green-500', bg: 'bg-green-50', action: () => {} },
    { label: '我的收藏', value: favorites.length, icon: Heart, color: 'text-red-500', bg: 'bg-red-50', action: () => setActiveTab('favorites') },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#FBF8FD] min-h-screen pb-6 flex flex-col relative"
    >
      <div className="bg-[#52C41A] rounded-b-[32px] pt-12 pb-8 px-6 text-white relative shadow-md">
        <button className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-sm active:scale-95">
          <Settings size={20} />
        </button>
        <div className="flex items-center gap-4">
          <ImageWithFallback src={currentUser.avatar} alt={currentUser.name} className="w-20 h-20 rounded-full border-4 border-white/30" />
          <div>
            <h1 className="text-2xl font-bold mb-1">{currentUser.name}</h1>
            <p className="text-white/80 text-sm">{currentUser.bio}</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 mb-6">
        <div className="bg-white rounded-[20px] shadow-sm p-5 grid grid-cols-4 gap-4">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} onClick={stat.action} className="flex flex-col items-center gap-2 active:scale-95 transition-transform cursor-pointer">
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
                <div className="text-center">
                  <span className="block font-bold text-gray-900 text-lg leading-none mb-1">{stat.value}</span>
                  <span className="text-[10px] text-gray-500">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5 flex-1 space-y-4">
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between active:bg-gray-50 transition-colors" onClick={() => setActiveTab('uploads')}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                <BookOpen size={16} />
              </div>
              <span className="font-medium text-gray-800 text-sm">我的菜谱</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors" onClick={() => setActiveTab('favorites')}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <Heart size={16} />
              </div>
              <span className="font-medium text-gray-800 text-sm">我的收藏</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between active:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                <Info size={16} />
              </div>
              <span className="font-medium text-gray-800 text-sm">关于我们</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
          <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors text-red-500">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut size={16} />
              </div>
              <span className="font-medium text-sm">退出登录</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeTab !== 'none' && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <header className="pt-12 pb-4 px-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b border-gray-100">
              <button onClick={() => setActiveTab('none')} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full active:scale-95">
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <h2 className="text-lg font-bold">{activeTab === 'uploads' ? '我的上传' : '我的收藏'}</h2>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-[100px]">
              {activeTab === 'uploads' ? (
                myUploads.length ? myUploads.map(r => (
                  <div key={r.id} onClick={() => navigate(`/recipes/${r.id}`)} className="flex gap-4 bg-white border border-gray-100 p-3 rounded-[16px] shadow-sm active:scale-95 transition-transform">
                    <ImageWithFallback src={r.coverImage} alt={r.title} className="w-20 h-20 rounded-[12px] object-cover" />
                    <div className="flex-1 py-1">
                      <h3 className="font-bold text-sm mb-2">{r.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor"/> {r.rating}</span>
                        <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )) : <p className="text-center text-gray-400 mt-10">暂无上传记录</p>
              ) : (
                favorites.map(id => {
                  const r = recipes.find(rec => rec.id === id);
                  if (!r) return null;
                  return (
                    <div key={r.id} onClick={() => navigate(`/recipes/${r.id}`)} className="flex gap-4 bg-white border border-gray-100 p-3 rounded-[16px] shadow-sm active:scale-95 transition-transform">
                      <ImageWithFallback src={r.coverImage} alt={r.title} className="w-20 h-20 rounded-[12px] object-cover" />
                      <div className="flex-1 py-1">
                        <h3 className="font-bold text-sm mb-2">{r.title}</h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1 text-yellow-500"><Star size={12} fill="currentColor"/> {r.rating}</span>
                          <span>{r.author.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};