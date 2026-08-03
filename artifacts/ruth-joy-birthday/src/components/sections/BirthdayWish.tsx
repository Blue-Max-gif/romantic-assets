import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { Sparkles } from 'lucide-react';

export function BirthdayWish() {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    if (wished) return;
    setWished(true);
  };

  return (
    <section id="wish" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">{siteContent.wish.title}</h2>
          
          <AnimatePresence mode="wait">
            {!wished ? (
              <motion.p 
                key="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-serif text-muted-foreground italic mb-16"
              >
                {siteContent.wish.instruction}
              </motion.p>
            ) : (
              <motion.p 
                key="message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif text-2xl md:text-3xl text-foreground mb-16"
              >
                {siteContent.wish.wishedMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="relative flex justify-center py-12">
          {/* Cake Illustration / Interaction */}
          <motion.div 
            className={`relative cursor-pointer transition-transform duration-500 ${wished ? '' : 'hover:scale-105'}`}
            onClick={handleMakeWish}
            whileTap={{ scale: wished ? 1 : 0.95 }}
          >
            {/* The Cake Base */}
            <div className="w-48 md:w-64 h-24 md:h-32 bg-gradient-to-b from-card to-background rounded-[50%] border-2 border-primary/20 shadow-2xl relative z-10 flex items-center justify-center">
              <div className="w-full h-full rounded-[50%] border border-white/5 absolute top-0" />
              <div className="w-full h-full rounded-[50%] border-b border-primary/10 absolute top-2" />
              <div className="w-full h-full rounded-[50%] border-b border-primary/10 absolute top-4" />
              <span className="font-script text-primary text-2xl md:text-3xl relative z-20 mt-4 md:mt-8">Happy Birthday</span>
            </div>

            {/* The Candles */}
            <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-0">
              {[1, 2, 3].map((candle, i) => (
                <div key={candle} className="relative flex flex-col items-center">
                  <AnimatePresence>
                    {!wished && (
                      <motion.div 
                        className="w-4 h-6 md:w-5 md:h-8 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-[50%_50%_20%_20%] blur-[2px] absolute -top-5 md:-top-7 origin-bottom"
                        animate={{ 
                          scale: [1, 1.1, 0.9, 1.2, 1],
                          rotate: [-2, 2, -1, 3, 0],
                        }}
                        transition={{ 
                          duration: 1.5 + (i * 0.2), 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        exit={{ 
                          opacity: 0,
                          scale: 0,
                          y: -10,
                          transition: { duration: 0.5 }
                        }}
                      >
                        <div className="absolute inset-0 bg-white/50 rounded-full blur-[4px]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {wished && (
                    <motion.div 
                      className="absolute -top-10 text-primary"
                      initial={{ opacity: 0, y: 10, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], y: -30, scale: 1.5 }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  )}

                  <div className="w-3 md:w-4 h-16 md:h-20 bg-gradient-to-r from-primary to-primary/60 rounded-full border border-white/10" />
                </div>
              ))}
            </div>
            
            {/* Ambient glow when not wished */}
            {!wished && (
              <motion.div 
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full pointer-events-none z-[-1]"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
