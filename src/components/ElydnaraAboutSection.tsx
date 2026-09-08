import React from 'react';
import { Award, Heart, Sparkles, CheckCircle2, Phone, MessageCircle, ShieldCheck, Instagram } from 'lucide-react';
import { OWNER_INFO } from '../data/mockData';
import elydnaraPhoto from '../assets/images/elydnara_profile.jpg';

interface ElydnaraAboutSectionProps {
  onOpenBooking: () => void;
}

export const ElydnaraAboutSection: React.FC<ElydnaraAboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="elydnara" className="py-20 bg-[#FFF8F9] relative overflow-hidden border-b border-pink-100/60">
      {/* Decorative floral background accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo & Badge Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 bg-gradient-to-tr from-pink-300 to-pink-200 rounded-3xl blur-md opacity-50 transform -rotate-1" />
              
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                <img
                  src={elydnaraPhoto}
                  alt="Elydnara - Dona e Fundadora"
                  className="w-full h-[450px] object-cover object-top"
                />

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white text-left">
                  <span className="font-cursive text-3xl sm:text-4xl text-pink-200 font-bold block">
                    Elydnara
                  </span>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-100">
                    Fundadora & Nail Artist Responsável
                  </p>
                  <p className="text-[11px] text-pink-100/80 mt-1 font-medium">
                    Dedicação exclusiva a cada cliente com carinho e precisão técnica.
                  </p>
                  <a
                    href={OWNER_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[11px] font-bold transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-300" />
                    <span>{OWNER_INFO.instagram}</span>
                  </a>
                </div>
              </div>

              {/* Floating Certification Badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-pink-100 flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center text-[#D64D6E]">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-[#4A2C2C]">+8 Anos</p>
                  <p className="text-[10px] text-[#A67C7C] font-semibold uppercase tracking-wider">de Excelência</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Story Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D64D6E]" />
              <span>Conheça a Especialista por Trás do Espaço</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display leading-tight tracking-tight">
              Olá, eu sou a Elydnara! Bem-vinda ao seu novo refúgio de beleza.
            </h2>

            <p className="text-sm sm:text-base text-[#6B4E4E] leading-relaxed">
              Criei a <strong className="font-bold text-[#D64D6E]">Elydnara</strong> com a missão de transformar o cuidado com as unhas em uma experiência sensorial de acolhimento, autoestima e sofisticação.
            </p>

            <p className="text-sm text-[#6B4E4E] leading-relaxed">
              Aqui, cada atendimento é personalizado: avaliamos a saúde da sua lâmina natural, escolhemos a técnica ideal (seja fibra de vidro com curvatura natural, gel moldado ou manicure russa sem cortes) e cuidamos de você em um ambiente tranquilo com café especial, espumante e boa música.
            </p>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A2C2C] font-bold">
                  Produtos premium importados com registro Anvisa
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A2C2C] font-bold">
                  Esterilização hospitalar em Autoclave biológica
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A2C2C] font-bold">
                  Agendamento pontual sem filas ou atrasos
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A2C2C] font-bold">
                  Atendimento direto comigo e com minha equipe treinada
                </span>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 transition-all flex items-center gap-2 active:scale-95"
              >
                Agendar com a Elydnara
              </button>

              <a
                href={`https://wa.me/55${OWNER_INFO.phone}?text=Ol%C3%A1%20Elydnara!%20Adorei%20seu%20espa%C3%A7o%20e%20gostaria%20de%20conversar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white hover:bg-pink-50 text-[#D64D6E] border border-pink-200 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Conversar no WhatsApp</span>
              </a>

              <a
                href={OWNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-white hover:bg-pink-50 text-[#D64D6E] border border-pink-200 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 active:scale-95"
              >
                <Instagram className="w-4 h-4 text-[#D64D6E]" />
                <span>{OWNER_INFO.instagram}</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
