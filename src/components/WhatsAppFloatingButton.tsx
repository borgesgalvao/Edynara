import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { OWNER_INFO } from '../data/mockData';
import elydnaraAvatar from '../assets/images/elydnara_profile.jpg';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userMsg.trim() || 'Olá Elydnara! Gostaria de informações sobre os horários na Elydnara.';
    const url = `https://wa.me/55${OWNER_INFO.phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-pink-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#D64D6E] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={elydnaraAvatar}
                  alt="Elydnara"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <p className="text-xs font-black leading-tight tracking-wide">Elydnara</p>
                <p className="text-[10px] text-pink-100 font-medium">Online • Responde em minutos</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-pink-100 hover:text-white p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body chat bubble */}
          <div className="p-4 bg-[#FFF8F9] space-y-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-xs border border-pink-100 text-gray-800 space-y-1">
              <p className="font-black text-[#D64D6E]">Olá! 🌸 Seja bem-vinda à Elydnara!</p>
              <p className="text-[#6B4E4E] font-medium leading-relaxed">
                Sou a Elydnara. Em que posso te ajudar hoje? Você pode tirar dúvidas ou pedir ajuda para agendar seu procedimento.
              </p>
              <span className="text-[9px] text-gray-400 block text-right font-medium">Agora</span>
            </div>

            {/* Quick buttons */}
            <div className="space-y-1.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://wa.me/55${OWNER_INFO.phone}?text=${encodeURIComponent(
                      'Olá Elydnara! Gostaria de saber os valores para Alongamento em Fibra de Vidro.'
                    )}`,
                    '_blank'
                  );
                }}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-pink-50 border border-pink-100 hover:border-pink-200 text-[11px] text-[#4A2C2C] font-semibold transition-colors"
              >
                💅 Valores de Alongamento em Fibra
              </button>
              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://wa.me/55${OWNER_INFO.phone}?text=${encodeURIComponent(
                      'Olá Elydnara! Tem algum horário disponível para esta semana?'
                    )}`,
                    '_blank'
                  );
                }}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-pink-50 border border-pink-100 hover:border-pink-200 text-[11px] text-[#4A2C2C] font-semibold transition-colors"
              >
                📅 Horários livres para esta semana
              </button>
            </div>
          </div>

          {/* Footer input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-pink-100 flex items-center gap-2">
            <input
              type="text"
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-[#FFF8F9] border border-pink-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#D64D6E]"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shrink-0 shadow-xs"
              title="Enviar para WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        id="btn-floating-whatsapp"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
        title="Falar com Elydnara no WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-black text-xs uppercase tracking-wider">
          WhatsApp Elydnara
        </span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D64D6E] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold">
          1
        </span>
      </button>
    </div>
  );
};
