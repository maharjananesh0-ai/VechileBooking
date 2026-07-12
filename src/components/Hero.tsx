import { useState, useEffect } from 'react';
import { Users, Calendar, ArrowRight, ShieldCheck, Heart, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
  onBookNowClick: () => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1546422904-90eabf3bac0a?auto=format&fit=crop&q=85&w=1600',
    title: 'Luxury King Long 14-Seater',
    subtitle: 'Your Premium Private Charter in Nepal',
  },
  {
    image: 'https://images.unsplash.com/photo-1592853625527-415be8472954?auto=format&fit=crop&q=85&w=1600',
    title: 'Premium Leather Cabin',
    subtitle: 'Airy, clean, and highly comfortable interior',
  },
  {
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=85&w=1600',
    title: 'Manakamana Pilgrimage Trips',
    subtitle: 'Safe and smooth ride through the hills',
  },
  {
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=85&w=1600',
    title: 'Kathmandu Valley Sightseeing',
    subtitle: 'Perfect for family events, office trips & tours',
  },
];

const featureBadges = [
  { text: 'Comfortable', desc: 'Plush reclining seats' },
  { text: 'Clean', desc: 'Sanitized before every trip' },
  { text: 'Airy Interior', desc: 'High roof & spacious' },
  { text: 'Professional Driver', desc: 'Courteous & experienced' },
  { text: 'Family Friendly', desc: 'Safe for kids & elderly' },
  { text: 'Office Trips', desc: 'Corporate & crew travels' },
  { text: 'Tours', desc: 'Kathmandu and beyond' },
  { text: 'Airport Transfers', desc: 'With generous luggage space' },
  { text: 'Pilgrimage Trips', desc: 'Dedicated Manakamana service' },
];

export default function Hero({ darkMode, onBookNowClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-24 pb-16 md:py-32 overflow-hidden" id="hero-section">
      {/* Background Gradient Ornaments */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rhodo-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* VIP Header Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border bg-gold-500/10 border-gold-500/30 text-gold-600 dark:text-gold-500">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider">Exclusive Single Vehicle Service</span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight ${darkMode ? 'text-white' : 'text-zinc-950'}`}>
                King Long <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rhodo-500 to-amber-500">
                  14-Seater Micro
                </span>
              </h1>
              <p className={`text-lg max-w-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Travel with prestige, comfort, and peace of mind. Scan-and-Book our modern 14-seater microbus, driven by a dedicated professional driver for your custom road trip.
              </p>
            </div>

            {/* Quick specifications banner */}
            <div className={`grid grid-cols-2 gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-rhodo-500/10 text-rhodo-500">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Capacity</div>
                  <div className={`text-sm font-semibold font-display ${darkMode ? 'text-white' : 'text-zinc-900'}`}>13 Passengers</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Base Hub</div>
                  <div className={`text-sm font-semibold font-display ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Sohrakhutte, Kathmandu</div>
                </div>
              </div>
            </div>

            {/* Beautiful grid of service badges */}
            <div className="space-y-2">
              <span className={`text-xs font-mono tracking-wider uppercase font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Perfect For Every Journey:
              </span>
              <div className="flex flex-wrap gap-2">
                {featureBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-3 py-1 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      darkMode
                        ? 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        : 'bg-white border border-zinc-200 text-zinc-700 shadow-xs hover:border-zinc-300'
                    }`}
                    title={badge.desc}
                  >
                    {badge.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookNowClick}
                className="flex items-center justify-center px-8 py-4 rounded-xl font-display font-bold text-white bg-rhodo-500 hover:bg-rhodo-600 shadow-lg shadow-rhodo-500/20 hover:shadow-rhodo-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer group"
                id="hero_book_now_cta"
              >
                Book This Vehicle Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="#vehicle-info"
                className={`flex items-center justify-center px-6 py-4 rounded-xl font-display font-semibold border transition-all ${
                  darkMode
                    ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
                id="hero_learn_more"
              >
                Explore Details
              </a>
            </div>

            {/* Trust Badges */}
            <div className={`flex items-center space-x-6 pt-4 text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" /> Fully Insured
              </span>
              <span className="flex items-center">
                <Heart className="w-4 h-4 text-rhodo-500 mr-1.5" /> Well-Maintained
              </span>
            </div>
          </div>

          {/* Right Column: Premium Vehicle Slider */}
          <div className="lg:col-span-6 relative">
            <div className={`relative aspect-video sm:aspect-4/3 rounded-3xl overflow-hidden border shadow-2xl ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              
              {/* Slides */}
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                  }`}
                >
                  {/* Image with no-referrer */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Subtle black overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
                  
                  {/* Slide Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left text-white">
                    <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-gold-500 uppercase bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      Featured Gallery
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold mt-2 text-white">
                      {slide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              ))}

              {/* Slider Dots */}
              <div className="absolute top-4 right-4 z-20 flex space-x-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-gold-500 w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    id={`hero_slider_dot_${index}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Banner */}
            <div className={`absolute -bottom-5 -right-2 sm:right-6 z-20 flex items-center space-x-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md animate-bounce-slow ${
              darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-100'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-rhodo-500/10 flex items-center justify-center text-rhodo-500">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Standard Config</div>
                <div className={`text-sm font-bold font-display ${darkMode ? 'text-white' : 'text-zinc-950'}`}>13 Luxury Seats</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
