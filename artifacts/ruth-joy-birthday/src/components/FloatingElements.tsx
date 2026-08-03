import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'star' | 'circle';
}

export function FloatingElements() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100 + 100, // start below screen
      size: Math.random() * 1.5 + 0.5, // rem
      duration: Math.random() * 15 + 15, // 15-30s
      delay: Math.random() * 10,
      type: Math.random() > 0.6 ? 'heart' : Math.random() > 0.5 ? 'star' : 'circle',
    }));
    
    setParticles(newParticles);
  }, []);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-primary/20 dark:text-primary/20"
          initial={{ 
            x: `${p.x}vw`, 
            y: `100vh`,
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`],
            y: `-10vh`,
            opacity: [0, 0.4, 0.4, 0],
            rotate: 360
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: `${p.size}rem`, height: `${p.size}rem` }}
        >
          {p.type === 'heart' && <Heart className="w-full h-full fill-current" />}
          {p.type === 'star' && <Star className="w-full h-full fill-current" />}
          {p.type === 'circle' && <div className="w-full h-full rounded-full bg-current" />}
        </motion.div>
      ))}
    </div>
  );
}
