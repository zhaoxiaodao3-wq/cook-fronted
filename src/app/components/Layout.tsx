import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { Home, Menu, PlusCircle, User } from 'lucide-react';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF8FD] font-sans text-gray-800">
      <main className="flex-1 pb-[80px]">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-100 flex items-center justify-around px-2 z-50 rounded-t-[16px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-16 h-full gap-1 transition-all active:scale-95 ${isActive ? 'text-[#52C41A]' : 'text-gray-400'}`
          }
        >
          <Home size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">首页</span>
        </NavLink>
        
        <NavLink 
          to="/recipes" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-16 h-full gap-1 transition-all active:scale-95 ${isActive ? 'text-[#52C41A]' : 'text-gray-400'}`
          }
        >
          <Menu size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">全部</span>
        </NavLink>
        
        <NavLink 
          to="/upload" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-16 h-full transition-all active:scale-95 group -mt-6`
          }
        >
          <div className="bg-[#52C41A] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(82,196,26,0.3)]">
            <PlusCircle size={28} strokeWidth={2.5} />
          </div>
          <span className="text-[10px] font-medium text-gray-400 mt-1">上传</span>
        </NavLink>
        
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-16 h-full gap-1 transition-all active:scale-95 ${isActive ? 'text-[#52C41A]' : 'text-gray-400'}`
          }
        >
          <User size={24} strokeWidth={2.5} />
          <span className="text-[10px] font-medium">我的</span>
        </NavLink>
      </nav>
    </div>
  );
};