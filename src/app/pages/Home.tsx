import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Star, Clock, Trophy } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORIES = ['全部', '早餐', '午餐', '晚餐', '甜点'];

export const Home = () => {
  const navigate = useNavigate();
  const { recipes } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeLeaderboard, setActiveLeaderboard] = useState<'总榜'|'本周'|'本月'>('总榜');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const sortedByRating = [...recipes].filter(r => r != null).sort((a, b) => (b?.rating || 0) - (a?.rating || 0)).slice(0, 5);
  const sortedByTime = [...recipes].filter(r => r != null).sort((a, b) => new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime());

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4"
    >
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">发现美食</h1>
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            placeholder="想吃点什么？" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white h-12 pl-12 pr-4 rounded-full shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A] transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </form>
      </header>

      <div className="flex overflow-x-auto gap-3 pb-4 mb-2 no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              if (cat !== '全部') {
                 navigate(`/recipes?category=${encodeURIComponent(cat === '早餐' ? 'Breakfast' : cat === '午餐' ? 'Lunch' : cat === '晚餐' ? 'Dinner' : 'Dessert')}`);
              } else {
                 navigate(`/recipes`);
              }
            }}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all active:scale-95 ${
              activeCategory === cat 
                ? 'bg-[#52C41A] text-white shadow-md' 
                : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="text-[#52C41A]" size={20} />
            热门排行榜
          </h2>
          <div className="flex gap-2 text-xs">
            {['总榜', '本周', '本月'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveLeaderboard(tab as any)}
                className={`px-3 py-1 rounded-full transition-colors ${activeLeaderboard === tab ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-[16px] p-4 shadow-sm">
          {sortedByRating.map((recipe, index) => (
            <div 
              key={recipe.id} 
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              className="flex items-center gap-4 mb-4 last:mb-0 active:scale-[0.98] transition-transform"
            >
              <div className={`w-8 text-center font-bold text-xl ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-gray-300'}`}>
                {index + 1}
              </div>
              <ImageWithFallback 
                src={recipe.coverImage} 
                alt={recipe.title} 
                className="w-16 h-16 rounded-[12px] object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{recipe.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-amber-500 font-medium">
                    <Star size={12} fill="currentColor" /> {recipe.rating}
                  </span>
                  <span>{recipe.ratingCount} 人评分</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="text-[#52C41A]" size={20} />
          最新上传
        </h2>
        
        <div className="grid grid-cols-2 gap-3">
          {sortedByTime.map(recipe => (
            <div 
              key={recipe.id}
              onClick={() => navigate(`/recipes/${recipe.id}`)}
              className="bg-white rounded-[16px] overflow-hidden shadow-sm active:scale-95 transition-transform"
            >
              <div className="relative aspect-square">
                <ImageWithFallback 
                  src={recipe.coverImage} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={10} fill="currentColor" /> {recipe.rating}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm text-gray-900 line-clamp-1 mb-2">{recipe.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ImageWithFallback src={recipe.author.avatar} alt={recipe.author.name} className="w-4 h-4 rounded-full" />
                    <span className="truncate w-16">{recipe.author.name}</span>
                  </div>
                  <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};