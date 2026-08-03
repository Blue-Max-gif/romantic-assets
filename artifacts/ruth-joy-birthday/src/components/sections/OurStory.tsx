import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { Camera, Coffee, Heart, Star, RotateCcw } from 'lucide-react';

const icons = {
  camera: Camera,
  coffee: Coffee,
  heart: Heart,
  star: Star,
};

export function OurStory() {
  const [playCount, setPlayCount] = useState(0);

  const handleReplay = () => {
    setPlayCount(c => c + 1);
  };

  return (
    <section id="story" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">{siteContent.story.title}</h2>
          <p className="font-serif text-muted-foreground italic">Every moment led me to you.</p>
        </motion.div>

        <div className="relative" key={playCount}>
          {/* Timeline line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent md:-translate-x-1/2" />

          <div className="space-y-16 md:space-y-32">
            {siteContent.story.milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              const Icon = icons[milestone.icon as keyof typeof icons] || Star;
              
              return (
                <motion.div 
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Center Dot / Icon */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-card border border-primary flex items-center justify-center shadow-lg shadow-primary/20 z-10 md:-translate-x-1/2 group">
                    <motion.div 
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content Box */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                      
                      <span className="inline-block font-sans text-xs tracking-widest text-secondary uppercase mb-3 bg-secondary/10 px-3 py-1 rounded-full">
                        {milestone.date}
                      </span>
                      <h3 className="font-serif text-2xl text-foreground mb-3">{milestone.title}</h3>
                      <p className="font-sans font-light text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button 
            onClick={handleReplay}
            className="inline-flex items-center gap-2 font-serif text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Replay Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}
