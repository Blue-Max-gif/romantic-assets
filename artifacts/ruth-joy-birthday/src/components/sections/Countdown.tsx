import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { getBirthdayCountdown, birthdayTimeZoneLabel } from '@/lib/birthday';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const next = getBirthdayCountdown();
      setIsBirthday(next.isBirthday);
      setTimeLeft(next);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  if (isBirthday) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center glass-panel rounded-3xl p-10 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-0 pointer-events-none" />
            
            <motion.h3 
              className="relative z-10 font-script text-5xl md:text-7xl text-primary mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              It's Today!
            </motion.h3>
            <p className="relative z-10 font-serif text-2xl md:text-3xl text-foreground">
              {siteContent.countdown.birthdayMessage}
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center glass-panel rounded-3xl p-10 md:p-16 border border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-serif text-muted-foreground uppercase tracking-widest text-sm mb-8">
            {siteContent.countdown.message} · {birthdayTimeZoneLabel}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit, index) => (
              <motion.div 
                key={unit.label} 
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-20 h-24 md:w-28 md:h-32 bg-card rounded-xl border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="font-serif text-4xl md:text-6xl text-foreground drop-shadow-md font-light relative z-10">
                    {unit.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-4 font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
