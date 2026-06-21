import { Leaf, Github, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-forest-deep py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-forest-sage" />
            <span className="text-white font-semibold text-[1.8rem]">CarbonWise</span>
            <span className="text-white/40 text-[1.2rem] ml-2">Track. Learn. Act.</span>
          </div>
          <nav className="flex gap-6">
            {['Home', 'Track', 'Dashboard', 'Visualize', 'Learn', 'Action'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/60 hover:text-white text-[1.4rem] transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[1.2rem]">
            &copy; 2025 CarbonWise. Built for a greener future.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
