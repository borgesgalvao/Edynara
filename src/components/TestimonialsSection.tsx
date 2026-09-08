import React, { useState } from 'react';
import { Star, MessageSquarePlus, Instagram, CheckCircle2, Heart, Send, X } from 'lucide-react';
import { Testimonial } from '../types';
import { OWNER_INFO } from '../data/mockData';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddTestimonial: (testimonial: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [service, setService] = useState('Alongamento em Fibra de Vidro');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newTestimonial: Testimonial = {
      id: `dep-${Date.now()}`,
      name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating,
      comment,
      service,
      date: 'Agora mesmo',
      verified: true,
    };

    onAddTestimonial(newTestimonial);
    setName('');
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>O que Dizem Nossas Clientes</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display tracking-tight">
              Depoimentos & Experiências Reais
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B4E4E] max-w-xl leading-relaxed">
              A satisfação de cada mulher que passa pelas mãos da Elydnara é nosso maior orgulho. Veja relatos de quem confia em nosso trabalho.
            </p>
          </div>

          <button
            id="btn-leave-testimonial"
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-pink-50 hover:bg-[#D64D6E] text-[#D64D6E] hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-pink-200 transition-all flex items-center justify-center gap-2 self-start md:self-auto shrink-0 shadow-xs active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Deixar Meu Depoimento
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((dep) => (
            <div
              key={dep.id}
              className="bg-[#FFF8F9] rounded-3xl p-6 border border-pink-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < dep.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-[#A67C7C] font-bold uppercase">{dep.date}</span>
                </div>

                <p className="text-xs text-[#6B4E4E] italic leading-relaxed mb-4 font-medium">
                  "{dep.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-pink-200/60 flex items-center gap-3">
                <img
                  src={dep.avatar}
                  alt={dep.name}
                  className="w-10 h-10 rounded-full object-cover border border-pink-200"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-black text-[#4A2C2C] truncate">{dep.name}</p>
                    {dep.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#D64D6E] font-bold uppercase tracking-wider truncate">{dep.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Integration Bar */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 via-white to-pink-50 rounded-3xl p-8 border border-pink-200 text-center shadow-xs">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex p-3 rounded-full bg-white text-[#D64D6E] shadow-sm border border-pink-100">
              <Instagram className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#4A2C2C] font-display">
              Siga Elydnara no Instagram
            </h3>
            
            <p className="text-xs sm:text-sm text-[#6B4E4E] leading-relaxed">
              Acompanhe os stories diários da Elydnara, vídeos do processo de alongamento, tendências de esmaltação e horários de encaixe de última hora!
            </p>

            <p className="font-black text-[#D64D6E] text-sm tracking-wide">
              {OWNER_INFO.instagram}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={OWNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all flex items-center gap-2 active:scale-95"
              >
                <Instagram className="w-4 h-4" />
                Seguir no Instagram
              </a>

              <a
                href={`https://wa.me/55${OWNER_INFO.phone}?text=Ol%C3%A1%20Elydnara!%20Vim%20pelo%20site%20e%20gostaria%20de%20conversar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Entrar no WhatsApp VIP ({OWNER_INFO.formattedPhone})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Deixar Depoimento */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-pink-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-black text-[#4A2C2C] mb-1">
                Deixe seu Depoimento para a Elydnara
              </h3>
              <p className="text-xs text-[#6B4E4E] mb-4">
                Sua opinião é fundamental para mantermos o padrão de excelência da Elydnara.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A2C2C] mb-1">Seu Nome *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Camila Duarte"
                    className="w-full bg-[#FFF8F9] border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2C2C] mb-1">Procedimento Realizado</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#FFF8F9] border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  >
                    <option>Alongamento em Fibra de Vidro</option>
                    <option>Alongamento em Gel Moldado</option>
                    <option>Esmaltação em Gel & Blindagem</option>
                    <option>Manicure Russa</option>
                    <option>Nail Art Personalizada</option>
                    <option>Spa dos Pés</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2C2C] mb-1">Sua Avaliação (Estrelas)</label>
                  <div className="flex gap-2 text-2xl text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="hover:scale-125 transition-transform"
                      >
                        {star <= rating ? '★' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#4A2C2C] mb-1">Seu Comentário *</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Conte como foi sua experiência com as unhas e o atendimento da Elydnara..."
                    className="w-full bg-[#FFF8F9] border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-900"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Publicar Depoimento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
