import { Outlet, NavLink } from "react-router";
import { Home, Menu, Plus, User } from "lucide-react";

export function MainLayout() {
  return (
    <div className="mx-auto max-w-md bg-background min-h-screen relative shadow-xl overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>
      
      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 flex justify-between items-center px-6 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <NavItem to="/" icon={<Home size={24} />} label="首页" />
        <NavItem to="/recipes" icon={<Menu size={24} />} label="全部" />
        
        {/* Upload FAB */}
        <NavLink 
          to="/upload" 
          className={({ isActive }) => 
            `relative -top-5 w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 ${
              isActive ? 'bg-primary-hover shadow-primary/30' : 'bg-primary shadow-primary/40'
            }`
          }
        >
          <Plus size={28} strokeWidth={2.5} />
        </NavLink>
        
        <NavItem to="/profile" icon={<User size={24} />} label="我的" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `flex flex-col items-center justify-center space-y-1 w-12 transition-colors ${
          isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
        }`
      }
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}
