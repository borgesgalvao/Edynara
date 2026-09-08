import React, { useState, useEffect } from 'react';
import { Bell, X, CheckCircle2, Sparkles } from 'lucide-react';
import { OWNER_INFO } from '../data/mockData';

export const PushNotificationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [permission, setPermission] = useState<string>('default');
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => setIsVisible(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleEnablePush = async () => {
    if (!('Notification' in window)) {
      setToastMessage('Seu navegador não suporta notificações push.');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        setToastMessage('Notificações ativadas! Você receberá lembretes de suas consultas.');
        setIsVisible(false);

        // Show immediate welcome notification
        new Notification('🌸 Elydnara - Lembretes Ativados!', {
          body: `Elydnara: Notificações configuradas. Você será avisada 24 horas antes de qualquer agendamento!`,
          icon: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=128&q=80',
        });
      } else {
        setToastMessage('Permissão não concedida. Você receberá seus lembretes via WhatsApp.');
        setIsVisible(false);
      }
    } catch {
      setIsVisible(false);
    }
  };

  const handleTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🌸 Lembrete Elydnara', {
        body: 'Sua consulta de Alongamento em Fibra de Vidro está agendada para amanhã às 10:00!',
        icon: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=128&q=80',
      });
      setToastMessage('Notificação de teste enviada para sua tela!');
      setTimeout(() => setToastMessage(''), 4000);
    } else {
      handleEnablePush();
    }
  };

  return (
    <>
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-700 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="ml-2 text-white/80 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Permission Bar if not granted yet */}
      {isVisible && permission === 'default' && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-2xl border-2 border-pink-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#D64D6E] flex items-center justify-center shrink-0 border border-pink-100">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-[#4A2C2C]">
                Deseja receber lembrete das suas consultas?
              </p>
              <p className="text-[11px] text-[#6B4E4E] font-medium">
                Avisamos 24h antes do seu horário na Elydnara.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleEnablePush}
              className="px-3.5 py-1.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-[11px] font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all active:scale-95"
            >
              Ativar
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg"
              title="Dispensar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
