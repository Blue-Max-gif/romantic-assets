import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { Heart, Gift, LockKeyhole } from 'lucide-react';
import { getBirthdayCountdown, birthdayTimeZoneLabel, type BirthdayCountdown } from '@/lib/birthday';

interface OpeningSurpriseProps {
  onOpen: () => void;
}

export function OpeningSurprise({ onOpen }: OpeningSurpriseProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [countdown, setCountdown] = useState<BirthdayCountdown>(() => getBirthdayCountdown());

  useEffect(() => {
    const updateCountdown = () => setCountdown(getBirthdayCountdown());
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1500); // Wait for envelope animation to finish
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Decorative background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] aspect-square bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, delay: 0.2 }}
              className="mb-8 relative"
            >
              <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center border border-white/10 shadow-2xl relative z-10">
                <Gift className="w-10 h-10 text-primary" />
              </div>
              
              <motion.div 
                className="absolute inset-0 bg-primary rounded-full blur-xl z-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.h1 
              className="font-script text-4xl sm:text-5xl md:text-7xl text-foreground mb-4 drop-shadow-xl max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {countdown.isBirthday ? 'Your surprise is ready, Whimssy.' : siteContent.opening.title}
            </motion.h1>

            <motion.p 
              className="font-serif italic text-muted-foreground text-lg mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {countdown.isBirthday
                ? 'Today, on your birthday, it is finally time to open it.'
                : `The countdown is on · ${birthdayTimeZoneLabel}`}
            </motion.p>

            {!countdown.isBirthday ? (
              <motion.div
                className="mt-2 flex flex-col items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-label="Countdown to the birthday">
                  {[
                    ['Days', countdown.days],
                    ['Hours', countdown.hours],
                    ['Minutes', countdown.minutes],
                    ['Seconds', countdown.seconds],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-[64px] rounded-xl border border-primary/20 bg-card/60 px-2 py-3 sm:min-w-[76px]">
                      <div className="font-serif text-2xl sm:text-3xl text-foreground tabular-nums">
                        {String(value).padStart(2, '0')}
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LockKeyhole className="h-4 w-4 text-primary" />
                  <span>{siteContent.opening.lockedMessage}</span>
                </div>
              </motion.div>
            ) : (
              <motion.button
                onClick={handleOpen}
                className="group relative mt-2 min-h-14 rounded-full bg-primary px-8 py-4 text-primary-foreground font-serif tracking-widest uppercase text-sm shadow-[0_0_40px_rgba(161,18,52,0.4)] transition-all hover:shadow-[0_0_60px_rgba(161,18,52,0.6)] hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {siteContent.opening.buttonText}
                  <Heart className="w-4 h-4 fill-current transition-transform group-hover:scale-125" />
                </span>
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
