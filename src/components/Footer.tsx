import React from 'react';
import { Phone, MapPin, Instagram, Shield, Clock, Calendar } from 'lucide-react';
import { FloralBrand } from './FloralBrand';
import { OWNER_INFO } from '../data/mockData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin }) => {
  return (
    <footer className="bg-[#2B131B] text-pink-100 pt-16 pb-12 border-t border-[#4A1D2B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Cursive Logo Column */}
          <div className="lg:col-span-4 space-y-4 text-center md:text-left">
            <FloralBrand
              size="md"
              subtitle="Estética de Unhas por Elydnara"
              align="left"
              className="items-center md:items-start"
            />
            <p className="text-xs text-pink-200/80 leading-relaxed max-w-sm font-medium">
              Espaço especializado em alongamentos de alta precisão, manicure russa e nail art. O seu refúgio de beleza e bem-estar sob os cuidados da Elydnara.
            </p>

            <div className="pt-2 flex items-center justify-center md:justify-start gap-3">
              <a
                href={OWNER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#D64D6E] text-white flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/55${OWNER_INFO.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">
              Navegação Rápida
            </h4>
            <ul className="space-y-2 text-pink-200/80 font-semibold">
              <li><a href="#servicos" className="hover:text-white transition-colors">Menu de Serviços</a></li>
              <li><a href="#galeria" className="hover:text-white transition-colors">Galeria de Trabalhos</a></li>
              <li><a href="#elydnara" className="hover:text-white transition-colors">Conheça a Elydnara</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos de Clientes</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Blog & Dicas</a></li>
              <li><a href="#localizacao" className="hover:text-white transition-colors">Localização no Mapa</a></li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">
              Atendimento
            </h4>
            <div className="space-y-3 text-pink-200/80">
              <p className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                <span>
                  WhatsApp: <strong className="text-white tracking-wide">{OWNER_INFO.formattedPhone}</strong>
                  <span className="block text-[11px] text-pink-300 font-medium">Responsável: Elydnara</span>
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                <span>{OWNER_INFO.address}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-pink-300 shrink-0 mt-0.5" />
                <span>{OWNER_INFO.hours}</span>
              </p>
            </div>
          </div>

          {/* Booking CTA Column */}
          <div className="lg:col-span-2 space-y-3 text-center md:text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">
              Agendamento
            </h4>
            <p className="text-xs text-pink-200/80 font-medium">
              Garanta seu horário com facilidade e segurança.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95"
            >
              Agendar Online
            </button>
            <button
              onClick={onOpenAdmin}
              className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-pink-100 text-[11px] font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-pink-300" />
              Painel Elydnara
            </button>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center text-xs text-pink-300/70 gap-3 font-medium text-center">
          <p>
            Produzido e mantido por{' '}
            <a
              href="https://borgesgalvao.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-200 hover:text-white underline underline-offset-2 transition-colors"
            >
              borgesgalvao.site
            </a>{' '}
            -{' '}
            <a
              href="https://wa.me/5531992141182"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-200 hover:text-white underline underline-offset-2 transition-colors"
            >
              (31) 99214-1182
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};
