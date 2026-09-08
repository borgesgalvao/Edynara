import React, { useState } from 'react';
import { Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServicesSectionProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Serviços' },
    { id: 'alongamento', label: 'Alongamentos (Fibra & Gel)' },
    { id: 'natural', label: 'Esmaltação em Gel & Naturais' },
    { id: 'nailart', label: 'Nail Art & Decorações' },
    { id: 'spa', label: 'Spa & Cuidados' },
    { id: 'manutencao', label: 'Manutenções' },
  ];

  const filteredServices = selectedCategory === 'todos'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="servicos" className="py-20 bg-white border-y border-pink-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#D64D6E] text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D64D6E]" />
            <span>Menu de Procedimentos</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-black text-[#4A2C2C] font-display tracking-tight">
            Técnicas Exclusivas de Alta Precisão
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B4E4E] leading-relaxed">
            Cada procedimento com a Elydnara é realizado com produtos importados hipoalergênicos e acabamento ultrafino, garantindo unhas elegantes e saudáveis.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D64D6E] text-white shadow-lg shadow-pink-200 scale-102'
                  : 'bg-pink-50 text-[#4A2C2C] hover:bg-pink-100 border border-pink-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Service Image */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  
                  {service.isPopular && (
                    <span className="absolute top-3 left-3 bg-[#D64D6E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Mais Procurado
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <span className="text-xl font-black drop-shadow tracking-tight">
                      R$ {service.price.toFixed(2)}
                    </span>
                    <span className="text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {service.durationMinutes} min
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-[#4A2C2C] group-hover:text-[#D64D6E] transition-colors leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-[#6B4E4E] mt-2 line-clamp-3 leading-relaxed font-medium">
                    {service.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-[11px] text-gray-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Sinal de reserva: R$ {service.depositRequired.toFixed(2)}
                    </span>
                    <span className="text-[#A67C7C] font-medium">Garante horário</span>
                  </div>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="px-6 pb-6 pt-0">
                <button
                  id={`btn-agendar-${service.id}`}
                  onClick={() => onSelectService(service.id)}
                  className="w-full py-3 bg-pink-50 hover:bg-[#D64D6E] text-[#D64D6E] hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-pink-100 active:scale-95 border border-pink-100"
                >
                  <span>Agendar Este Procedimento</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
