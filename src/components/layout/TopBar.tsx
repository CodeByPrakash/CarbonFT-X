import { Leaf, Menu, Bell } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 100;

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-16 z-nav flex items-center justify-between px-4 md:px-6 transition-all duration-300
        lg:left-[240px]
        ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className={`w-6 h-6 ${isScrolled ? 'text-forest-deep' : 'text-white'}`} />
        </button>
        <div className="lg:hidden flex items-center gap-2">
          <Leaf className={`w-5 h-5 ${isScrolled ? 'text-forest-sage' : 'text-forest-sage'}`} />
          <span className={`font-semibold text-[1.6rem] ${isScrolled ? 'text-forest-deep' : 'text-white'}`}>
            CarbonWise
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Bell className={`w-5 h-5 ${isScrolled ? 'text-forest-deep' : 'text-white'}`} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-full bg-forest-sage/20 flex items-center justify-center">
          <span className="text-forest-sage font-semibold text-[1.4rem]">U</span>
        </div>
      </div>
    </header>
  );
}
