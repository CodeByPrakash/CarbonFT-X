import { useState } from 'react';
import { Leaf, Home, ClipboardCheck, LayoutGrid, Globe, BookOpen, Zap, X, Menu } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'track', label: 'Track', icon: ClipboardCheck },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'visualize', label: 'Visualize', icon: Globe },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'action', label: 'Action', icon: Zap },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(() => false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-forest-deep z-nav transition-all duration-300 hidden lg:flex flex-col
        ${collapsed ? 'w-[72px]' : 'w-[240px]'}`}
    >
      <div className="flex items-center gap-3 px-6 h-16">
        <Leaf className="w-7 h-7 text-forest-sage flex-shrink-0" />
        {!collapsed && <span className="text-white font-semibold text-[1.8rem]">CarbonWise</span>}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[1.4rem] font-medium transition-all duration-200
                ${isActive
                  ? 'bg-forest-sage/15 text-forest-sage border-l-[3px] border-forest-sage'
                  : 'text-white/60 hover:text-white hover:bg-white/5 border-l-[3px] border-transparent'
                }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
