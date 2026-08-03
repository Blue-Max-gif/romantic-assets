import { useState } from 'react';
import { OpeningSurprise } from '@/components/sections/OpeningSurprise';
import { Hero } from '@/components/sections/Hero';
import { Countdown } from '@/components/sections/Countdown';
import { OurStory } from '@/components/sections/OurStory';
import { Memories } from '@/components/sections/Memories';
import { WhyILoveYou } from '@/components/sections/WhyILoveYou';
import { LoveLetter } from '@/components/sections/LoveLetter';
import { BirthdayWish } from '@/components/sections/BirthdayWish';
import { Forever } from '@/components/sections/Forever';
import { Navigation } from '@/components/Navigation';
import { FloatingElements } from '@/components/FloatingElements';
import { MusicPlayer } from '@/components/MusicPlayer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <main className="min-h-[100dvh] bg-background text-foreground relative selection:bg-primary/30">
      <OpeningSurprise onOpen={() => setHasOpened(true)} />

      <AnimatePresence>
        {hasOpened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            <FloatingElements />
            <MusicPlayer autoPlayTriggered={hasOpened} />
            <Navigation />

            <div className="flex flex-col gap-0">
              <Hero />
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                <Countdown />
                <OurStory />
              </div>
              
              <Memories />
              <WhyILoveYou />
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                <LoveLetter />
                <BirthdayWish />
              </div>
              
              <Forever />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
