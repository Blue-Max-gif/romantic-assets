import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { siteContent } from '@/data/siteContent';

export function LoveLetter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.5, ease: "easeOut" }
    }
  };

  return (
    <section id="letter" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">{siteContent.letter.title}</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-10 md:p-16 rounded-3xl border border-primary/20 relative shadow-2xl">
            {/* Paper texture/styling */}
            <div className="absolute inset-0 bg-[#fdf8f5]/5 rounded-3xl pointer-events-none mix-blend-overlay" />
            
            <motion.div 
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative z-10 space-y-8"
            >
              {siteContent.letter.paragraphs.map((paragraph, index) => {
                const isFirst = index === 0;
                const isLast = index === siteContent.letter.paragraphs.length - 1;
                const isSignature = isLast || index === siteContent.letter.paragraphs.length - 2;

                return (
                  <motion.p 
                    key={index}
                    variants={itemVariants}
                    className={`
                      text-foreground/90 leading-relaxed
                      ${isFirst ? 'font-script text-3xl text-primary mb-12' : 'font-serif text-lg md:text-xl font-light'}
                      ${isSignature ? 'font-script text-3xl text-primary text-right mt-12' : ''}
                    `}
                  >
                    {paragraph}
                  </motion.p>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
