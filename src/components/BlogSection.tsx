import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles, Check, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onOpenBooking }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section id="blog" className="py-20 bg-white border-b border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
            <BookOpen className="w-4 h-4 text-[#D64D6E]" />
            <span>Dicas & Tendências</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display tracking-tight">
            Blog da Elydnara
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B4E4E] leading-relaxed">
            Dicas práticas de cuidados diários, segredos para fazer seu alongamento durar muito mais e as principais novidades em nail art do momento.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#D64D6E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#A67C7C] font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#4A2C2C] group-hover:text-[#D64D6E] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#6B4E4E] mt-2 line-clamp-3 leading-relaxed font-medium">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <span className="text-xs font-bold text-[#D64D6E] group-hover:text-[#BF3B5B] flex items-center gap-1.5 uppercase tracking-wider">
                  Ler Artigo Completo
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-pink-100 my-6">
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-72 bg-gray-900">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-bold bg-[#D64D6E] text-white px-3 py-1 rounded-full uppercase tracking-wider self-start mb-2">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-display leading-snug">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-pink-200 mt-2 font-medium">
                    <span>Publicado em {selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
                <p className="text-sm font-bold text-[#4A2C2C] leading-relaxed bg-pink-50 p-4 rounded-2xl border border-pink-200">
                  {selectedPost.summary}
                </p>

                <div className="space-y-4 text-sm text-[#4A2C2C] leading-relaxed font-normal">
                  {selectedPost.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Practical Tips Box */}
                {selectedPost.tips && selectedPost.tips.length > 0 && (
                  <div className="bg-[#FFF8F9] border-2 border-pink-200 rounded-2xl p-5 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#D64D6E] flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D64D6E]" />
                      Dicas Práticas da Elydnara:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#6B4E4E] font-medium">
                      {selectedPost.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags and Share */}
                <div className="pt-4 border-t border-pink-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPost.tags.map((t) => (
                      <span key={t} className="text-[10px] font-bold bg-pink-50 text-[#D64D6E] px-2.5 py-1 rounded-lg border border-pink-100">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 text-xs text-[#6B4E4E] hover:text-[#D64D6E] font-bold"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedShare ? 'Link copiado!' : 'Compartilhar'}</span>
                  </button>
                </div>

                {/* CTA inside article */}
                <div className="p-5 rounded-2xl bg-pink-50 border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-[#4A2C2C] uppercase tracking-wider">
                      Quer unhas perfeitas como as deste artigo?
                    </p>
                    <p className="text-[11px] text-[#6B4E4E] font-medium">
                      Garanta seu horário com a Elydnara.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onOpenBooking();
                    }}
                    className="px-5 py-2.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shrink-0 transition-all active:scale-95"
                  >
                    Agendar Meu Procedimento
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
