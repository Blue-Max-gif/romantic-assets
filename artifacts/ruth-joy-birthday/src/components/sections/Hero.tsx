import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Cinematic background vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background to-black/80 z-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[50vh] bg-primary/10 blur-[120px] rounded-full z-0" />
      </div>

      <div className="container relative z-10 px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-6 inline-block"
        >
          <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-serif text-sm tracking-[0.2em] uppercase">
            {siteContent.hero.date}
          </span>
        </motion.div>

        <motion.h1 
          className="font-script text-6xl md:text-8xl lg:text-9xl text-foreground leading-tight drop-shadow-2xl mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Happy Birthday,
        </motion.h1>
        
        <motion.h2 
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-white to-secondary pb-4 drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          My {siteContent.hero.nickname}
        </motion.h2>

        <motion.div 
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent my-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />

        <motion.p 
          className="font-sans text-xl md:text-2xl text-muted-foreground font-light max-w-2xl italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          "{siteContent.hero.subtitle}"
        </motion.p>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="font-serif text-xs tracking-widest uppercase">Scroll</span>
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{ 
              height: ["0%", "100%", "0%"],
              y: [0, 20, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
