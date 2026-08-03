import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, ArrowUp } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Our Story' },
  { id: 'memories', label: 'Memories' },
  { id: 'reasons', label: 'Why I Love You' },
  { id: 'letter', label: 'Love Letter' },
  { id: 'wish', label: 'Make A Wish' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple intersection observer logic for active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentId = 'hero';
      sections.forEach(section => {
        if (section && section.offsetTop <= scrollPosition) {
          currentId = section.id;
        }
      });
      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 hidden md:block ${
          scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4 shadow-xl' : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div 
            className="font-script text-2xl text-primary cursor-pointer flex items-center gap-2"
            onClick={() => scrollTo('hero')}
          >
            <Heart className="w-5 h-5 fill-primary" /> R&W
          </div>
          
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`font-serif text-sm tracking-widest uppercase transition-colors relative pb-1 ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Menu Toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 flex items-center justify-center bg-card/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg text-foreground focus:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 md:hidden"
          >
            <Heart className="w-12 h-12 text-primary fill-primary/20 mb-8" />
            <ul className="flex flex-col items-center gap-6 text-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`font-serif text-xl tracking-widest uppercase transition-colors ${
                      activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollTo('hero')}
            className="fixed bottom-6 left-6 z-40 w-10 h-10 flex items-center justify-center bg-card/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg text-foreground hover:bg-primary/20 hover:text-primary transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
