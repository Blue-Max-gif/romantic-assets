import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '@/data/siteContent';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export function Memories() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const photos = siteContent.memories.photos;
  const selectedIndex = photos.findIndex(p => p.id === selectedId);
  const selectedPhoto = selectedIndex >= 0 ? photos[selectedIndex] : null;

  const navigate = (direction: 'next' | 'prev') => {
    if (selectedIndex === -1) return;
    
    let newIndex = direction === 'next' ? selectedIndex + 1 : selectedIndex - 1;
    if (newIndex >= photos.length) newIndex = 0;
    if (newIndex < 0) newIndex = photos.length - 1;
    
    setSelectedId(photos[newIndex].id);
  };

  return (
    <section id="memories" className="py-32 relative bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-script text-5xl md:text-6xl text-primary mb-4">{siteContent.memories.title}</h2>
          <p className="font-serif text-muted-foreground italic">Flashes of forever.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layoutId={`photo-container-${photo.id}`}
              className="relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer group bg-gradient-to-br from-card to-muted border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedId(photo.id)}
            >
              {/* Image with fallback */}
              <img 
                src={photo.url} 
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  // Fallback for missing photos
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                }}
              />
              
              {/* Placeholder text if image fails/missing */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/30 -z-10">
                <ImageIcon className="w-12 h-12 mb-2" />
                <span className="font-sans text-xs uppercase tracking-widest">{photo.url.split('/').pop()}</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="font-serif text-white text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              onClick={() => setSelectedId(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button 
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); navigate('next'); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div 
              layoutId={`photo-container-${selectedPhoto.id}`}
              className="relative max-w-5xl max-h-full w-full h-full flex flex-col items-center justify-center outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.caption}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              {/* Fallback for lightbox */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 -z-10">
                <ImageIcon className="w-24 h-24 mb-4" />
                <span className="font-sans text-sm uppercase tracking-widest">{selectedPhoto.url.split('/').pop()}</span>
              </div>
              
              <motion.p 
                className="mt-6 font-serif text-white/80 text-xl text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {selectedPhoto.caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
