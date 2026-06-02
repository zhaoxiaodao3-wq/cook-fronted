import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Recipe = {
  id: string;
  title: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  rating: number;
  ratingCount: number;
  category: string;
  duration: string;
  difficulty: 'Simple' | 'Medium' | 'Hard';
  crowd: string;
  ingredients: { name: string; amount: string; checked?: boolean }[];
  steps: { text: string; image?: string }[];
  tips?: string;
  reviews: { id: string; userId: string; userName: string; userAvatar: string; rating: number; date: string }[];
  suggestions: { id: string; userId: string; userName: string; userAvatar: string; content: string; date: string }[];
};

type StoreContextType = {
  currentUser: { id: string; name: string; avatar: string; bio: string };
  recipes: Recipe[];
  favorites: string[];
  isLoading: boolean;
  toggleFavorite: (recipeId: string) => void;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'author' | 'rating' | 'ratingCount' | 'reviews' | 'suggestions'>) => Promise<void>;
  rateRecipe: (recipeId: string, rating: number) => Promise<void>;
  suggestRecipe: (recipeId: string, content: string) => Promise<void>;
};

const mockUser = {
  id: 'u1',
  name: '小圈子主厨',
  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
  bio: '分享最地道的家常菜！'
};

const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'r1',
    title: 'Avocado Toast with Egg',
    coverImage: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800',
    author: { id: 'u2', name: 'Bob', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    createdAt: '2026-05-30T10:00:00Z',
    rating: 4.8,
    ratingCount: 12,
    category: '早餐',
    duration: '15 mins',
    difficulty: 'Simple',
    crowd: 'All ages',
    ingredients: [
      { name: 'Bread', amount: '2 slices' },
      { name: 'Avocado', amount: '1' },
      { name: 'Eggs', amount: '2' },
      { name: 'Salt & Pepper', amount: 'to taste' },
    ],
    steps: [
      { text: 'Toast the bread until golden brown.' },
      { text: 'Mash the avocado with a fork and spread it on the toast.' },
      { text: 'Cook the eggs (fried or poached) and place them on top.' },
      { text: 'Season with salt and pepper.' }
    ],
    tips: 'Add some chili flakes for an extra kick!',
    reviews: [
      { id: 'rev1', userId: 'u3', userName: 'Charlie', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', rating: 5, date: '2026-06-01' }
    ],
    suggestions: []
  },
  {
    id: 'r2',
    title: 'Fresh Garden Salad Bowl',
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    author: mockUser,
    createdAt: '2026-05-28T12:30:00Z',
    rating: 4.5,
    ratingCount: 8,
    category: '午餐',
    duration: '20 mins',
    difficulty: 'Simple',
    crowd: 'Vegetarians',
    ingredients: [
      { name: 'Mixed Greens', amount: '2 cups' },
      { name: 'Cherry Tomatoes', amount: '1 cup' },
      { name: 'Cucumber', amount: '1/2' },
      { name: 'Olive Oil', amount: '2 tbsp' }
    ],
    steps: [
      { text: 'Wash and chop all vegetables.' },
      { text: 'Toss vegetables in a large bowl.' },
      { text: 'Drizzle with olive oil and serve.' }
    ],
    tips: 'Best served chilled.',
    reviews: [],
    suggestions: []
  }
];

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay and load mock data
    const loadMockData = () => {
      setTimeout(() => {
        setRecipes(INITIAL_RECIPES);
        setIsLoading(false);
      }, 500);
    };
    loadMockData();
  }, []);

  const toggleFavorite = async (recipeId: string) => {
    setFavorites(prev => 
      prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]
    );
  };

  const addRecipe = async (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'author' | 'rating' | 'ratingCount' | 'reviews' | 'suggestions'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `r${Date.now()}`,
      createdAt: new Date().toISOString(),
      author: mockUser,
      rating: 0,
      ratingCount: 0,
      reviews: [],
      suggestions: []
    };
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const rateRecipe = async (recipeId: string, rating: number) => {
    setRecipes(prev => prev.map(r => {
      if (r.id !== recipeId) return r;
      const existingIdx = r.reviews.findIndex(rev => rev.userId === mockUser.id);
      const newReviews = [...r.reviews];
      if (existingIdx >= 0) {
        newReviews[existingIdx] = { ...newReviews[existingIdx], rating, date: new Date().toISOString() };
      } else {
        newReviews.push({ id: `rev${Date.now()}`, userId: mockUser.id, userName: mockUser.name, userAvatar: mockUser.avatar, rating, date: new Date().toISOString() });
      }
      const newTotal = newReviews.reduce((sum, rev) => sum + rev.rating, 0);
      return { 
        ...r, 
        reviews: newReviews, 
        rating: Number((newTotal / newReviews.length).toFixed(1)), 
        ratingCount: newReviews.length 
      };
    }));
  };

  const suggestRecipe = async (recipeId: string, content: string) => {
    setRecipes(prev => prev.map(r => {
      if (r.id !== recipeId) return r;
      const existingIdx = r.suggestions.findIndex(sugg => sugg.userId === mockUser.id);
      const newSuggestions = [...r.suggestions];
      if (existingIdx >= 0) {
        newSuggestions[existingIdx] = { ...newSuggestions[existingIdx], content, date: new Date().toISOString() };
      } else {
        newSuggestions.push({ id: `sugg${Date.now()}`, userId: mockUser.id, userName: mockUser.name, userAvatar: mockUser.avatar, content, date: new Date().toISOString() });
      }
      return { ...r, suggestions: newSuggestions };
    }));
  };

  return (
    <StoreContext.Provider value={{
      currentUser: mockUser,
      recipes,
      favorites,
      isLoading,
      toggleFavorite,
      addRecipe,
      rateRecipe,
      suggestRecipe
    }}>
      {children}
    </StoreContext.Provider>
  );
};