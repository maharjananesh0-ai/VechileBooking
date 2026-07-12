import { useState, useEffect } from 'react';
import { Phone, MessageSquare, Moon, Sun, Shield } from 'lucide-react';
import logo from '../assets/logo.png';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 backdrop-blur-md shadow-md ' + (darkMode ? 'bg-zinc-950/80 border-b border-zinc-800' : 'bg-white/80 border-b border-zinc-100')
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className={`p-1.5 rounded-xl flex items-center justify-center ${darkMode ? 'bg-rhodo-600/20 border border-rhodo-500/30' : 'bg-rhodo-50 border border-rhodo-100'}`}>
              <img
                src={logo}
                alt="Vehicle Booking Logo"
                className="w-7 h-7 object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className={`text-lg sm:text-xl font-display font-bold tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                King Long <span className="text-rhodo-500">14-Seater</span>
              </h1>
              <div className="flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className={`text-[10px] font-medium tracking-widest uppercase ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Nepal Private Tourer
                </span>
              </div>
            </div>
          </div>

          {/* Quick Contact & Dark/Light Mode Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Direct Call Button */}
            <a
              href="tel:+9779851019058"
              className={`flex items-center justify-center p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 ${
                darkMode
                  ? 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Call Owner Now"
              id="header_call_btn"
            >
              <Phone className="w-4.5 h-4.5" />
              <span className="hidden md:inline ml-2 text-xs font-medium">Call Driver</span>
            </a>

            {/* Quick WhatsApp Link */}
            <a
              href="https://wa.me/9779851019058?text=Hi!%20I'm%20interested%20in%20booking%20your%20King%20Long%2014-Seater%20micro%20for%20a%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all hover:scale-105 active:scale-95"
              title="WhatsApp Owner"
              id="header_wa_btn"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              <span className="hidden md:inline ml-2 text-xs font-medium">WhatsApp</span>
            </a>

            {/* Dark Mode Switcher */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800'
                  : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-100'
              }`}
              aria-label="Toggle theme"
              id="theme_toggle_btn"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
