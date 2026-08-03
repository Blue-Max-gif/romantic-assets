import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { Heart } from 'lucide-react';

export function Forever() {
  return (
    <footer className="py-20 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center"
        >
          <Heart className="w-8 h-8 text-primary fill-primary mb-6 animate-pulse" />
          
          <p className="font-serif text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
            {siteContent.footer.text}
          </p>
          
          <div className="mt-12 font-script text-3xl md:text-4xl text-primary/50">
            Forever & Always
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
