import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { mockRecipes } from "../data";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ListPage({ type }: { type: 'uploads' | 'favorites' | 'suggestions' | 'ratings' }) {
  const navigate = useNavigate();

  const titleMap = {
    uploads: '我的上传',
    favorites: '我的收藏',
    suggestions: '我的建议',
    ratings: '我的评价'
  };

  const list = type === 'uploads' ? mockRecipes.filter(r => r.author.id === 'u1') : mockRecipes.slice(0, 3);

  return (
    <div className="bg-background min-h-screen pb-safe max-w-md mx-auto relative shadow-xl overflow-x-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white pt-safe px-4 pb-3 flex items-center sticky top-0 z-20 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
        <h1 className="flex-1 text-center font-bold text-gray-800 text-lg mr-8">{titleMap[type]}</h1>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {list.length > 0 ? list.map((recipe) => (
          <div 
            key={recipe.id}
            onClick={() => navigate(`/recipes/${recipe.id}`)}
            className="bg-white rounded-2xl p-3 flex shadow-sm border border-gray-50 active:scale-95 transition-transform"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <ImageWithFallback src={recipe.coverImage} alt={recipe.title} className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 flex-1 flex flex-col justify-between py-1">
              <div>
                <h3 className="font-bold text-gray-800 line-clamp-1">{recipe.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded-sm">★ {recipe.rating.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">{recipe.difficulty}</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                {type === 'uploads' && `上传于 ${recipe.uploadTime}`}
                {type === 'favorites' && `收藏于 ${recipe.uploadTime}`}
                {(type === 'suggestions' || type === 'ratings') && `参与于 ${recipe.uploadTime}`}
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p>暂无相关记录</p>
          </div>
        )}
      </div>
    </div>
  );
}
