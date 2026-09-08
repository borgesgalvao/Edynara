import React, { useState } from 'react';
import { 
  Calendar, Phone, Instagram, Menu, X, Shield, Sparkles, 
  Heart, MapPin, BookOpen, Image as ImageIcon
} from 'lucide-react';
import { FloralBrand } from './FloralBrand';
import { OWNER_INFO } from '../data/mockData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      {/* Top micro-bar for phone & quick notice */}
      <div className="bg-[#D64D6E] text-white text-[11px] py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="font-bold tracking-wide">Agenda Aberta com Elydnara em João Monlevade - MG</span>
            <span className="hidden md:inline text-pink-200">|</span>
            <span className="hidden md:inline text-pink-100 font-medium">Atendimento com hora marcada e biossegurança</span>
          </div>

          <div className="flex items-center gap-4 text-white font-semibold">
            <a
              href={`tel:+55${OWNER_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-pink-200 transition-colors font-mono font-bold tracking-wider"
            >
              <Phone className="w-3 h-3 text-pink-200" />
              <span>{OWNER_INFO.formattedPhone}</span>
            </a>
            <a
              href={`https://wa.me/55${OWNER_INFO.phone}?text=Ol%C3%A1%20Elydnara!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Elydnara`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 hover:text-pink-200 transition-colors font-bold uppercase tracking-widest text-[10px]"
            >
              WhatsApp
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
              title="Acesso exclusivo da Elydnara"
            >
              <Shield className="w-3 h-3" />
              Painel Elydnara
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with cursive Elydnara and floral frame */}
          <a href="#" className="flex items-center py-1">
            <FloralBrand
              size="sm"
              subtitle="Desde 2013 cuidando da sua autoestima"
              align="left"
              titleClassName="text-[36px]"
              subtitleClassName="border border-[#d5691b] text-center text-[9px] text-[#aa2618] px-1.5 py-0.5 rounded-sm"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-bold uppercase tracking-[0.15em] text-[#4A2C2C]">
            <a href="#servicos" className="hover:text-[#D64D6E] transition-colors">
              Serviços
            </a>
            <a href="#galeria" className="hover:text-[#D64D6E] transition-colors">
              Galeria
            </a>
            <a href="#elydnara" className="hover:text-[#D64D6E] transition-colors">
              A Elydnara
            </a>
            <a href="#depoimentos" className="hover:text-[#D64D6E] transition-colors">
              Depoimentos
            </a>
            <a href="#blog" className="hover:text-[#D64D6E] transition-colors">
              Blog & Dicas
            </a>
            <a href="#localizacao" className="hover:text-[#D64D6E] transition-colors">
              Localização
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/55${OWNER_INFO.phone}?text=Ol%C3%A1%20Elydnara!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20a%20Elydnara`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-[#D64D6E] bg-pink-50 hover:bg-pink-100 rounded-xl transition-all border border-pink-100"
              title="Fale no WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              id="btn-navbar-agendar"
              onClick={onOpenBooking}
              className="px-5 py-2.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 active:scale-95 flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Agendar Horário
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 bg-[#D64D6E] text-white text-xs font-bold rounded-xl shadow-md active:scale-95"
            >
              Agendar
            </button>
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#4A2C2C] hover:text-[#D64D6E] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-pink-200 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#servicos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            💅 Nossos Serviços
          </a>
          <a
            href="#galeria"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            📸 Galeria de Trabalhos
          </a>
          <a
            href="#elydnara"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            👑 Conheça a Elydnara
          </a>
          <a
            href="#depoimentos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            ⭐ Depoimentos de Clientes
          </a>
          <a
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            📖 Blog & Dicas de Esmaltação
          </a>
          <a
            href="#localizacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-bold text-[#4A2C2C] hover:text-[#D64D6E]"
          >
            📍 Localização no Google Maps
          </a>

          <div className="pt-3 border-t border-pink-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#D64D6E] text-white text-center font-bold text-sm rounded-xl shadow-lg shadow-pink-200 active:scale-95"
            >
              Agendar Horário Online
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 bg-pink-50 text-[#4A2C2C] text-center font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-pink-100"
            >
              <Shield className="w-3.5 h-3.5" />
              Painel Administrativo da Elydnara
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
