import React, { useState } from 'react';
import { Heart, ZoomIn, X, Sparkles, User, Calendar } from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
  onBookStyle: (styleName: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems, onBookStyle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  const categories = ['Todos', 'Fibra de Vidro', 'Nail Art', 'Esmaltação em Gel', 'Manicure Russa', 'Gel Moldado'];

  const filteredItems = selectedCategory === 'Todos'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section id="galeria" className="py-20 bg-gradient-to-b from-[#FFF8F9] via-white to-[#FFF8F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D64D6E]" />
            <span>Portfólio & Trabalhos Reais</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display tracking-tight">
            Galeria de Unhas Feitas por Elydnara
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B4E4E] leading-relaxed">
            Inspire-se nas criações exclusivas de Elydnara e sua equipe especializada. Cada foto reflete acabamento impecável, curvatura perfeita e brilho duradouro.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D64D6E] text-white shadow-lg shadow-pink-200 scale-102'
                  : 'bg-white text-[#4A2C2C] hover:bg-pink-50 border border-pink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => {
            const currentLikes = item.likes + (likesMap[item.id] || 0);
            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => setSelectedItem(item)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-pink-100 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-pink-50">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3.5 text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold bg-[#D64D6E] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-md">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-black leading-tight line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-pink-200 mt-0.5 flex items-center gap-1 font-semibold">
                        <User className="w-3 h-3" />
                        Feito por {item.professionalName}
                      </p>
                    </div>
                  </div>

                  {/* Likes pill always visible */}
                  <button
                    onClick={(e) => handleLike(item.id, e)}
                    className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md hover:bg-[#D64D6E] text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <Heart className="w-3 h-3 fill-current text-pink-300" />
                    <span>{currentLikes}</span>
                  </button>
                </div>

                <div className="p-3.5 bg-white">
                  <h4 className="text-xs font-black text-[#4A2C2C] truncate">{item.title}</h4>
                  <p className="text-[11px] text-[#D64D6E] font-bold uppercase tracking-wider truncate mt-0.5">Por {item.professionalName}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Lightbox */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-pink-100">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-72 md:h-[450px] bg-black">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold bg-pink-50 text-[#D64D6E] px-2.5 py-1 rounded-full border border-pink-200 uppercase tracking-wider">
                        {selectedItem.category}
                      </span>
                      <span className="text-xs text-[#6B4E4E]">
                        Profissional: <strong className="text-[#4A2C2C] font-bold">{selectedItem.professionalName}</strong>
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#4A2C2C] leading-snug">
                      {selectedItem.title}
                    </h3>

                    <p className="text-xs text-[#6B4E4E] mt-3 leading-relaxed font-medium">
                      {selectedItem.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {selectedItem.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold bg-pink-50 text-[#D64D6E] px-2.5 py-1 rounded-lg border border-pink-100">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-pink-100 mt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <button
                        onClick={() => handleLike(selectedItem.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 text-[#D64D6E] font-bold hover:bg-pink-100 transition-colors"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>{selectedItem.likes + (likesMap[selectedItem.id] || 0)} curtidas</span>
                      </button>
                      <span className="font-bold text-[#A67C7C] text-[11px] uppercase tracking-wider">Elydnara • Exclusivo</span>
                    </div>

                    <button
                      onClick={() => {
                        const styleTitle = selectedItem.title;
                        setSelectedItem(null);
                        onBookStyle(styleTitle);
                      }}
                      className="w-full py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <Calendar className="w-4 h-4" />
                      Agendar Este Modelo Agora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
