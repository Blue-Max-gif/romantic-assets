import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { Heart } from 'lucide-react';

export function WhyILoveYou() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="reasons" className="py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">{siteContent.reasons.title}</h2>
          <p className="font-serif text-muted-foreground italic">Just a few of the millions of reasons.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.reasons.items.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
              <motion.div
                key={item.id}
                className={`relative rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden min-h-[240px] focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive ? 'ring-1 ring-primary shadow-[0_0_30px_rgba(161,18,52,0.2)]' : 'border border-white/5 hover:border-white/20'
                }`}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveIndex(isActive ? null : index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveIndex(isActive ? null : index);
                  }
                }}
              >
                {/* Default State */}
                <div className={`absolute inset-0 glass-panel flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500 z-10 ${
                  isActive ? 'opacity-0' : 'opacity-100'
                }`}>
                  <span className="font-serif text-4xl text-primary/30 mb-4">{index + 1}</span>
                  <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                </div>

                {/* Active/Hover State */}
                <div className={`absolute inset-0 bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center transition-opacity duration-500 z-20 ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  <Heart className="w-8 h-8 text-white/20 mb-4 fill-current" />
                  <h3 className="font-serif text-xl text-white mb-4">{item.title}</h3>
                  <p className="font-sans font-light text-white/90 leading-relaxed text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
