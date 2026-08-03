import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { siteContent } from '@/data/siteContent';

interface MusicPlayerProps {
  autoPlayTriggered: boolean;
}

export function MusicPlayer({ autoPlayTriggered }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTriggered && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio autoplay blocked or failed:", err);
          setHasError(true);
        });
    }
  }, [autoPlayTriggered]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.warn("Play failed:", err);
          setHasError(true);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={siteContent.music.path} 
        loop 
        preload="auto"
        onError={() => setHasError(true)}
      />
      
      <motion.div 
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className={`flex items-center gap-2 bg-card/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full shadow-lg transition-all duration-500 ${isPlaying ? 'pr-4' : ''}`}>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/20 text-primary-foreground hover:bg-primary/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          
          {isPlaying && (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              className="flex items-center gap-2 overflow-hidden"
            >
              <div className="flex gap-0.5 items-end h-4 mr-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-t-sm"
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
              <button 
                onClick={toggleMute}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
          
          {!isPlaying && !hasError && (
            <span className="text-xs font-serif italic text-muted-foreground pr-2">
              Play our song
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
}
