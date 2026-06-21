import { Home, ClipboardCheck, LayoutGrid, Globe, BookOpen, Zap } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const tabs = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'track', label: 'Track', icon: ClipboardCheck },
  { id: 'dashboard', label: 'Dash', icon: LayoutGrid },
  { id: 'visualize', label: 'Map', icon: Globe },
  { id: 'learn', label: 'Learn', icon: BookOpen },
];

export function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white z-nav shadow-[0_-2px_12px_rgba(0,0,0,0.08)] lg:hidden flex items-center justify-around px-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeSection === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all
              ${isActive ? 'text-forest' : 'text-gray-400'}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
            <span className={`text-[1rem] ${isActive ? 'font-semibold' : ''}`}>{tab.label}</span>
          </button>
        );
      })}
      <button
        onClick={() => onNavigate('action')}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-forest-sage to-teal flex items-center justify-center -mt-4 shadow-lg animate-pulse-fab"
      >
        <Zap className="w-5 h-5 text-white" />
      </button>
    </nav>
  );
}
