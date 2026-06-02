import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { Search, Star, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CATEGORIES = ['全部', 'Breakfast', 'Lunch', 'Dinner', 'Dessert'];
const TAGS = ['减脂', '素食', '精选', '快手菜', '家常'];

export const AllRecipes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { recipes } = useStore();
  
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '全部';
  const tagParam = searchParams.get('tag') || '';

  const [localSearch, setLocalSearch] = useState(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (localSearch) prev.set('q', localSearch);
      else prev.delete('q');
      return prev;
    });
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => {
      if (!r) return false;
      const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.ingredients.some(i => i.name.toLowerCase().includes(query.toLowerCase()));
      const matchCategory = categoryParam === '全部' || r.category === categoryParam;
      // In a real app we'd check tags, here we just mock it
      const matchTag = !tagParam || true; 
      
      return matchQuery && matchCategory && matchTag;
    });
  }, [recipes, query, categoryParam, tagParam]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 flex flex-col h-full min-h-screen bg-[#FBF8FD]"
    >
      <header className="mb-4 sticky top-0 bg-[#FBF8FD] z-10 py-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="搜索菜谱或食材..." 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-white h-10 pl-10 pr-4 rounded-[16px] shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#52C41A]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button type="button" className="w-10 h-10 bg-white rounded-[16px] flex items-center justify-center shadow-sm text-gray-600 active:scale-95">
            <SlidersHorizontal size={18} />
          </button>
        </form>
      </header>

      <div className="mb-4">
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
          {CATEGORIES.map(cat => {
            const displayCat = cat === 'Breakfast' ? '早餐' : cat === 'Lunch' ? '午餐' : cat === 'Dinner' ? '晚餐' : cat === 'Dessert' ? '甜点' : cat;
            return (
              <button
                key={cat}
                onClick={() => setSearchParams(prev => { prev.set('category', cat); return prev; })}
                className={`whitespace-nowrap px-4 py-1.5 rounded-[16px] text-sm transition-colors ${
                  categoryParam === cat ? 'bg-[#52C41A] text-white' : 'bg-white text-gray-600 border border-gray-100'
                }`}
              >
                {displayCat}
              </button>
            )
          })}
        </div>
        <div className="flex overflow-x-auto gap-2 pb-2 mt-2 no-scrollbar">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchParams(prev => { 
                if (tagParam === tag) prev.delete('tag');
                else prev.set('tag', tag); 
                return prev; 
              })}
              className={`whitespace-nowrap px-3 py-1 rounded-[16px] text-xs transition-colors ${
                tagParam === tag ? 'bg-[#52C41A]/10 text-[#52C41A] border border-[#52C41A]/20' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 pb-4">
        {filteredRecipes.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-gray-400">
            <Search size={32} className="mb-2 opacity-50" />
            <p className="text-sm">没有找到相关菜谱</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                className="bg-white rounded-[16px] overflow-hidden shadow-sm active:scale-95 transition-transform flex flex-col"
              >
                <div className="relative aspect-[4/5]">
                  <ImageWithFallback 
                    src={recipe.coverImage} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-[8px] flex items-center gap-1">
                    <Star size={10} fill="currentColor" className="text-yellow-400" /> {recipe.rating}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 leading-tight">{recipe.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <ImageWithFallback src={recipe.author.avatar} alt={recipe.author.name} className="w-5 h-5 rounded-[6px]" />
                    <span className="truncate">{recipe.author.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};