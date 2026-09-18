import React from 'react';
import { Calendar, Sparkles, ShieldCheck, Heart, Star, Phone, MessageCircle, ArrowDown } from 'lucide-react';
import { FloralBrand } from './FloralBrand';
import { OWNER_INFO } from '../data/mockData';
import elydnaraAvatar from '../assets/images/elydnara_profile.jpg';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-[#FFF8F9] via-[#FFF0F3]/60 to-[#FFF8F9]">
      {/* Subtle background ambient floral circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-200/40 to-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand & Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.15em] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D64D6E]" />
              <span>Espaço de Beleza & Estética de Unhas em João Monlevade - MG</span>
            </div>

            {/* The requested Cursive Name decorated with flowers */}
            <div className="py-2">
              <FloralBrand
                size="lg"
                subtitle="A unha é o resultade de uma boa conversa"
                align="center"
                className="lg:items-start lg:text-left"
                subtitleClassName="w-[421px] max-w-full text-center text-xs text-[#7ca685] block font-medium"
                subtitleStyle={{ width: '421px' }}
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#4A2C2C] leading-tight tracking-tight font-display">
              Unhas impecáveis com acabamento natural e durabilidade de até{' '}
              <span className="text-[#D64D6E] underline decoration-pink-300 decoration-4 underline-offset-4">
                30 dias
              </span>.
            </h1>

            <p className="text-base sm:text-lg text-[#6B4E4E] max-w-2xl leading-relaxed font-medium">
              Comandado por <strong className="text-[#D64D6E] font-bold">Elydnara</strong>, o espaço combina técnicas avançadas de fibra de vidro, manicure russa e biossegurança hospitalar para transformar suas mãos em uma verdadeira obra de arte.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs text-[#4A2C2C] font-bold">
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-pink-100 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Esterilizado em Autoclave</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-pink-100 shadow-xs">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Confirmação via WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-pink-100 shadow-xs">
                <Heart className="w-4 h-4 text-[#D64D6E]" />
                <span>Clube Fidelidade Exclusivo</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                id="btn-hero-agendar"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 active:scale-95 flex items-center justify-center gap-2.5 transition-all"
              >
                <Calendar className="w-5 h-5" />
                Agendar Horário Online
              </button>

              <a
                id="btn-hero-whatsapp"
                href={`https://wa.me/55${OWNER_INFO.phone}?text=Ol%C3%A1%20Elydnara!%20Vi%20o%20site%20da%20Elydnara%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-pink-50 text-[#D64D6E] border-2 border-pink-200 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp: {OWNER_INFO.formattedPhone}</span>
              </a>
            </div>

            {/* Micro rating */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Cliente Elydnara"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                  alt="Cliente Elydnara"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80"
                  alt="Cliente Elydnara"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80"
                  alt="Cliente Elydnara"
                />
              </div>
              <div className="text-left text-xs">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-[#6B4E4E] font-medium">
                  Mais de <strong className="text-[#4A2C2C] font-bold">850 clientes atendidas</strong> com excelência
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Elegant Framed Nail Showcase */}
            <div className="relative mx-auto max-w-md">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-pink-200 rounded-3xl blur-sm opacity-60 transform rotate-2" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85"
                  alt="Unhas impecáveis feitas por Elydnara"
                  className="w-full h-[440px] object-cover hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Owner Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-pink-100 flex items-center gap-2.5">
                  <img
                    src={elydnaraAvatar}
                    alt="Elydnara"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#D64D6E]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#4A2C2C] leading-tight">Elydnara</p>
                    <p className="text-[10px] text-[#D64D6E] font-bold uppercase tracking-wider">Master Nail Designer</p>
                  </div>
                </div>

                {/* Floating Bottom Card: Pre-payment & Guarantee */}
                <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4A2C2C]">Reserva com Sinal PIX</p>
                      <p className="text-[10px] text-[#A67C7C]">Garante seu horário exclusivo</p>
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="px-3.5 py-1.5 bg-[#D64D6E] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#BF3B5B] transition-all"
                  >
                    Agendar
                  </button>
                </div>

              </div>

              {/* Decorative side floral tag */}
              <div className="absolute -bottom-4 -left-4 bg-[#D64D6E] text-white py-1.5 px-4 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                <span>✿</span>
                <span>Elydnara • João Monlevade - MG</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
