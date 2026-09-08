import React from 'react';
import { MapPin, Phone, Clock, Navigation, Car, Shield, ExternalLink } from 'lucide-react';
import { OWNER_INFO } from '../data/mockData';

export const LocationSection: React.FC = () => {
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Elydnara Unhas ' + OWNER_INFO.address
  )}`;

  return (
    <section id="localizacao" className="py-20 bg-[#FFF8F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
            <MapPin className="w-4 h-4 text-[#D64D6E]" />
            <span>Localização & Acesso</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display tracking-tight">
            Venha Conhecer a Elydnara
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B4E4E] leading-relaxed">
            Localizado em {OWNER_INFO.address}, com ambiente acolhedor, climatizado, estacionamento e total segurança para o seu momento de autocuidado.
          </p>
        </div>

        {/* Map & Information Grid */}
        <div className="bg-white rounded-3xl border border-pink-100 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Info Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              {/* Address card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-[#D64D6E] shrink-0 border border-pink-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4A2C2C]">Endereço</h4>
                  <p className="text-xs text-[#6B4E4E] mt-0.5 leading-relaxed font-semibold">
                    {OWNER_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#A67C7C] font-bold">Minas Gerais</p>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-[#D64D6E] shrink-0 border border-pink-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4A2C2C]">Horário de Funcionamento</h4>
                  <p className="text-xs text-[#6B4E4E] mt-0.5 font-semibold">{OWNER_INFO.hours}</p>
                  <p className="text-[11px] text-emerald-700 font-bold">Atendimento exclusivo com hora marcada</p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-[#D64D6E] shrink-0 border border-pink-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-[#4A2C2C]">Telefone & WhatsApp</h4>
                  <a
                    href={`https://wa.me/55${OWNER_INFO.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D64D6E] font-black hover:underline block mt-0.5 tracking-wide"
                  >
                    {OWNER_INFO.formattedPhone} (Elydnara)
                  </a>
                  <p className="text-[11px] text-[#A67C7C] font-medium">Atendimento rápido para dúvidas e agendamentos</p>
                </div>
              </div>

              {/* Perks */}
              <div className="pt-2 border-t border-pink-100 grid grid-cols-2 gap-3 text-xs text-[#6B4E4E] font-medium">
                <div className="flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-[#D64D6E]" />
                  <span>Fácil estacionamento</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#D64D6E]" />
                  <span>Segurança e conforto</span>
                </div>
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 space-y-2.5">
              <a
                id="btn-open-google-maps"
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                Abrir Rota no Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(OWNER_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-pink-50 hover:bg-pink-100 text-[#4A2C2C] text-xs font-bold uppercase tracking-wider rounded-xl border border-pink-100 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Navegar via Waze</span>
              </a>
            </div>

          </div>

          {/* Interactive Google Maps Embed Column */}
          <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[380px] relative bg-pink-50">
            {/* Embedded Google Maps with centered pin in João Monlevade - MG */}
            <iframe
              title="Localização da Elydnara no Google Maps"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Jo%C3%A3o%20Monlevade%20-%20MG&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full"
            />

            {/* Studio Badge on top of Map */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-lg border border-pink-200 max-w-xs pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <div>
                  <p className="text-xs font-bold text-[#D64D6E] font-cursive text-xl leading-none">
                    Elydnara
                  </p>
                  <p className="text-[10px] text-[#6B4E4E] font-bold tracking-wider mt-0.5">Elydnara • Estética de Unhas</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
