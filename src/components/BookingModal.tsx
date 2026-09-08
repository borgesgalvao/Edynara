import React, { useState, useMemo } from 'react';
import { 
  X, Calendar as CalendarIcon, Clock, User, CheckCircle2, 
  Sparkles, CreditCard, QrCode, Copy, Check, MessageCircle, 
  Bell, AlertCircle, ArrowRight, ArrowLeft, ShieldCheck, Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Service, Professional, Appointment } from '../types';
import { OWNER_INFO } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  professionals: Professional[];
  existingAppointments: Appointment[];
  onAppointmentCreated: (appointment: Appointment) => void;
  initialServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  services,
  professionals,
  existingAppointments,
  onAppointmentCreated,
  initialServiceId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || (services[0]?.id || '')
  );
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string>('elydnara');
  
  // Date selection (default to tomorrow or nearest valid weekday)
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());
  const [selectedTime, setSelectedTime] = useState<string>('10:00');

  // Client info
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Payment method
  const [paymentOption, setPaymentOption] = useState<'sinal' | 'total'>('sinal');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao'>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [pushStatus, setPushStatus] = useState<string>('');

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedProfessional = professionals.find((p) => p.id === selectedProfessionalId) || professionals[0];

  const depositValue = selectedService?.depositRequired || 35;
  const paymentAmount = paymentOption === 'sinal' ? depositValue : selectedService?.price || 150;

  // Available slots
  const allTimeSlots = ['08:30', '10:00', '11:30', '13:30', '15:00', '16:30', '18:00'];

  const bookedSlots = useMemo(() => {
    return existingAppointments
      .filter(
        (apt) =>
          apt.date === selectedDate &&
          apt.professionalId === selectedProfessionalId &&
          apt.status !== 'cancelado'
      )
      .map((apt) => apt.time);
  }, [existingAppointments, selectedDate, selectedProfessionalId]);

  if (!isOpen) return null;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Por favor, informe seu nome e telefone WhatsApp.');
      return;
    }
    setStep(4);
  };

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        clientName,
        clientPhone: clientPhone.replace(/\D/g, ''),
        clientEmail: clientEmail || undefined,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        depositAmount: paymentAmount,
        professionalId: selectedProfessional.id,
        professionalName: selectedProfessional.name,
        date: selectedDate,
        time: selectedTime,
        paymentStatus: paymentOption === 'sinal' ? 'pago_sinal' : 'pago_total',
        paymentMethod,
        status: 'confirmado',
        notes: clientNotes || undefined,
        createdAt: new Date().toISOString(),
        reminderSent: true,
      };

      setCreatedAppointment(newApt);
      onAppointmentCreated(newApt);
      setStep(5);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E86A82', '#FAD2DC', '#C93B5C', '#D4AF37'],
      });
    }, 1200);
  };

  const handleCopyPix = () => {
    const pixPayload = `00020126580014br.gov.bcb.pix0136${OWNER_INFO.pixKey}520400005303986540${paymentAmount.toFixed(2)}5802BR5912ELYDNARA6014JOAO MONLEVADE62070503***6304`;
    navigator.clipboard.writeText(pixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const requestPushNotification = async () => {
    if (!('Notification' in window)) {
      setPushStatus('Notificações push não suportadas neste navegador.');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushStatus('Notificações ativadas com sucesso! Você receberá o lembrete.');
        new Notification('🌸 Elydnara - Agendamento Confirmado!', {
          body: `Olá ${clientName}! Seu horário para ${selectedService.name} está confirmado para ${selectedDate} às ${selectedTime}.`,
          icon: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=120&q=80',
        });
      } else {
        setPushStatus('Permissão não concedida. Você receberá o lembrete via WhatsApp.');
      }
    } catch {
      setPushStatus('Lembrete registrado no sistema.');
    }
  };

  // Format WhatsApp message
  const whatsappConfirmationText = encodeURIComponent(
    `Olá Elydnara! 🌸 Acabei de agendar meu horário pelo site da Elydnara!\n\n` +
    `📋 *Serviço:* ${selectedService?.name}\n` +
    `👤 *Cliente:* ${clientName}\n` +
    `💅 *Profissional:* ${selectedProfessional?.name}\n` +
    `📅 *Data:* ${selectedDate} às ${selectedTime}\n` +
    `💰 *Reserva Paga:* R$ ${paymentAmount.toFixed(2)} (${paymentMethod.toUpperCase()})\n` +
    (clientNotes ? `📝 *Obs:* ${clientNotes}\n\n` : '\n') +
    `Aguardo a confirmação na Elydnara! 💕`
  );

  const whatsappUrl = `https://wa.me/55${OWNER_INFO.phone}?text=${whatsappConfirmationText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        id="booking-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-6 transition-all"
      >
        {/* Modal Header */}
        <div className="bg-pink-50/70 p-5 sm:p-6 border-b border-pink-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cursive text-3xl sm:text-4xl text-[#D64D6E]">Elydnara</span>
              <span className="text-[10px] bg-[#D64D6E] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Agendamento VIP
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#6B4E4E] mt-1 font-medium">
              Reserve seu momento com Elydnara e equipe especializada
            </p>
          </div>
          <button
            id="btn-close-booking-modal"
            onClick={onClose}
            className="p-2 text-[#4A2C2C] hover:bg-pink-100 rounded-full transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4 pb-2 bg-white flex items-center justify-between border-b border-pink-100 text-xs font-semibold text-gray-500">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#D64D6E] font-black' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#D64D6E] text-white' : 'bg-gray-100 text-gray-500'}`}>1</span>
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Serviço</span>
          </div>
          <div className="h-0.5 w-6 sm:w-12 bg-pink-100" />
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#D64D6E] font-black' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#D64D6E] text-white' : 'bg-gray-100 text-gray-500'}`}>2</span>
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Data/Hora</span>
          </div>
          <div className="h-0.5 w-6 sm:w-12 bg-pink-100" />
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#D64D6E] font-black' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#D64D6E] text-white' : 'bg-gray-100 text-gray-500'}`}>3</span>
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Seus Dados</span>
          </div>
          <div className="h-0.5 w-6 sm:w-12 bg-pink-100" />
          <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#D64D6E] font-black' : ''}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 4 ? 'bg-[#D64D6E] text-white' : 'bg-gray-100 text-gray-500'}`}>4</span>
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Reserva PIX</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 max-h-[72vh] overflow-y-auto">
          {/* STEP 1: Select Service & Professional */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#4A2C2C] mb-1 flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-[#D64D6E]" />
                  1. Escolha o Procedimento Desejado
                </h3>
                <p className="text-xs text-[#6B4E4E] mb-4 font-medium">
                  Todos os procedimentos incluem cutilagem especializada e produtos dermatológicos.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {services.map((svc) => (
                    <div
                      key={svc.id}
                      id={`select-service-${svc.id}`}
                      onClick={() => setSelectedServiceId(svc.id)}
                      className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        selectedServiceId === svc.id
                          ? 'border-[#D64D6E] bg-pink-50/70 shadow-md ring-2 ring-pink-200'
                          : 'border-pink-100 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-black text-[#4A2C2C] leading-tight">{svc.name}</h4>
                          {svc.isPopular && (
                            <span className="text-[10px] bg-[#D64D6E] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 shadow-xs">
                              Favorito
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#6B4E4E] mt-1 line-clamp-2 font-medium">{svc.description}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-pink-100 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-[#A67C7C] font-semibold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{svc.durationMinutes} min</span>
                        </div>
                        <div className="text-right">
                          <span className="font-black text-[#D64D6E] text-sm">
                            R$ {svc.price.toFixed(2)}
                          </span>
                          <span className="block text-[10px] text-[#A67C7C] font-semibold">
                            Sinal: R$ {svc.depositRequired.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional selection */}
              <div>
                <h4 className="text-sm font-black text-[#4A2C2C] mb-2 flex items-center gap-1.5 font-display">
                  <User className="w-4 h-4 text-[#D64D6E]" />
                  Com quem você prefere ser atendida?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {professionals.map((prof) => (
                    <div
                      key={prof.id}
                      id={`select-prof-${prof.id}`}
                      onClick={() => setSelectedProfessionalId(prof.id)}
                      className={`p-3 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition-all ${
                        selectedProfessionalId === prof.id
                          ? 'border-[#D64D6E] bg-pink-50/70 ring-1 ring-pink-200'
                          : 'border-pink-100 hover:border-pink-200 bg-white'
                      }`}
                    >
                      <img
                        src={prof.avatar}
                        alt={prof.name}
                        className="w-12 h-12 rounded-full object-cover border border-pink-200"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-xs font-black text-[#4A2C2C] truncate">{prof.name}</p>
                          {prof.isOwner && (
                            <span className="text-[9px] bg-pink-100 text-[#D64D6E] font-bold px-1.5 py-0.5 rounded">
                              Dona
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#D64D6E] truncate font-semibold">{prof.role}</p>
                        <p className="text-[10px] text-[#A67C7C] font-bold">⭐ {prof.rating.toFixed(1)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  id="btn-step1-next"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 flex items-center gap-2 transition-all active:scale-95"
                >
                  Continuar para Horários
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-black text-[#4A2C2C] mb-1 flex items-center gap-2 font-display">
                  <CalendarIcon className="w-5 h-5 text-[#D64D6E]" />
                  2. Escolha o Dia e Horário
                </h3>
                <p className="text-xs text-[#6B4E4E] mb-4 font-medium">
                  Atendimento com {selectedProfessional?.name} para {selectedService?.name}.
                </p>

                {/* Date Input */}
                <div className="mb-5 bg-pink-50/70 p-4 rounded-2xl border border-pink-200">
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-2">
                    Selecione a Data do Agendamento
                  </label>
                  <input
                    type="date"
                    id="input-booking-date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                  <p className="text-[11px] text-[#A67C7C] font-medium mt-2">
                    * Funcionamento de terça a sábado, das 08:30 às 19:30.
                  </p>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-2">
                    Horários Disponíveis em {selectedDate}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {allTimeSlots.map((slot) => {
                      const isBooked = bookedSlots.includes(slot);
                      const isSelected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          id={`time-slot-${slot.replace(':', '-')}`}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold text-center transition-all border ${
                            isBooked
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#D64D6E] text-white border-[#D64D6E] shadow-md ring-2 ring-pink-200'
                              : 'bg-white hover:bg-pink-50 text-[#4A2C2C] border-pink-100 hover:border-pink-200'
                          }`}
                        >
                          {slot}
                          {isBooked ? (
                            <span className="block text-[9px] font-normal text-gray-400">Ocupado</span>
                          ) : (
                            <span className="block text-[9px] font-normal opacity-90">Livre</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-pink-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#6B4E4E] hover:text-[#4A2C2C] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  type="button"
                  id="btn-step2-next"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 flex items-center gap-2 transition-all active:scale-95"
                >
                  Preencher Meus Dados
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div>
                <h3 className="text-lg font-black text-[#4A2C2C] mb-1 flex items-center gap-2 font-display">
                  <User className="w-5 h-5 text-[#D64D6E]" />
                  3. Dados para Confirmação e Lembrete
                </h3>
                <p className="text-xs text-[#6B4E4E] mb-4 font-medium">
                  Enviaremos a confirmação instantânea no seu WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  id="input-client-name"
                  placeholder="Ex: Mariana Silveira"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-[#4A2C2C] font-medium focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    id="input-client-phone"
                    placeholder="(31) 99999-9999"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-[#4A2C2C] font-medium focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">
                    E-mail (opcional)
                  </label>
                  <input
                    type="email"
                    id="input-client-email"
                    placeholder="mariana@exemplo.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2.5 text-sm text-[#4A2C2C] font-medium focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">
                  Preferências / Alergias ou Observações (opcional)
                </label>
                <textarea
                  rows={2}
                  id="input-client-notes"
                  placeholder="Ex: Prefiro formato amendoado; tenho alergia a perfume forte; quero fazer nail art específica."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full bg-white border border-pink-200 rounded-xl px-4 py-2 text-sm text-[#4A2C2C] font-medium focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                />
              </div>

              {/* Summary Card */}
              <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 space-y-1.5 text-xs text-[#4A2C2C]">
                <div className="flex justify-between font-black text-[#D64D6E] text-sm">
                  <span>{selectedService.name}</span>
                  <span>R$ {selectedService.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#6B4E4E]">
                  <span>Profissional:</span>
                  <span className="font-bold text-[#4A2C2C]">{selectedProfessional.name}</span>
                </div>
                <div className="flex justify-between text-[#6B4E4E]">
                  <span>Data e Horário:</span>
                  <span className="font-bold text-[#4A2C2C]">{selectedDate} às {selectedTime}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#6B4E4E] hover:text-[#4A2C2C] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  type="submit"
                  id="btn-step3-next"
                  className="px-6 py-3 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 flex items-center gap-2 transition-all active:scale-95"
                >
                  Ir para Reserva & Pagamento
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Pre-payment (Pagamento Antecipado de Reserva) */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-black text-[#4A2C2C] mb-1 flex items-center gap-2 font-display">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  4. Pagamento Antecipado para Garantir sua Vaga
                </h3>
                <p className="text-xs text-[#6B4E4E] font-medium">
                  Para evitar horários ociosos e garantir o atendimento exclusivo da Elydnara, solicitamos o pagamento do sinal de reserva (que é 100% abatido do valor final no salão).
                </p>
              </div>

              {/* Choose Deposit vs Total */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  id="opt-pay-deposit"
                  onClick={() => setPaymentOption('sinal')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentOption === 'sinal'
                      ? 'border-[#D64D6E] bg-pink-50/70 shadow-sm ring-1 ring-pink-200'
                      : 'border-pink-100 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#4A2C2C]">Pagar Apenas o Sinal</span>
                    <span className="text-xs font-black text-[#D64D6E]">
                      R$ {depositValue.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B4E4E] font-medium mt-1">
                    Restante de R$ {(selectedService.price - depositValue).toFixed(2)} pago no espaço.
                  </p>
                </div>

                <div
                  id="opt-pay-total"
                  onClick={() => setPaymentOption('total')}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentOption === 'total'
                      ? 'border-[#D64D6E] bg-pink-50/70 shadow-sm ring-1 ring-pink-200'
                      : 'border-pink-100 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#4A2C2C]">Pagar Valor Total</span>
                    <span className="text-xs font-black text-[#D64D6E]">
                      R$ {selectedService.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6B4E4E] font-medium mt-1">
                    Tudo quitado! Chegue apenas para relaxar e ser atendida.
                  </p>
                </div>
              </div>

              {/* Payment Methods tabs: PIX or Credit Card */}
              <div className="flex rounded-xl bg-pink-50 p-1 border border-pink-100">
                <button
                  type="button"
                  id="btn-tab-pix"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'pix'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-[#6B4E4E] hover:text-[#4A2C2C]'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  PIX Instantâneo
                </button>
                <button
                  type="button"
                  id="btn-tab-card"
                  onClick={() => setPaymentMethod('cartao')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cartao'
                      ? 'bg-white text-[#D64D6E] shadow-sm'
                      : 'text-[#6B4E4E] hover:text-[#4A2C2C]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Cartão de Crédito
                </button>
              </div>

              {/* PIX Details */}
              {paymentMethod === 'pix' && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-center space-y-3">
                  <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-emerald-100">
                    {/* Visual QR Code Representation */}
                    <div className="w-36 h-36 bg-white p-2 rounded-lg flex flex-col items-center justify-center relative border border-gray-200">
                      <div className="grid grid-cols-6 gap-1 w-full h-full opacity-90">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-xs ${
                              (i % 2 === 0 && i % 3 !== 1) || i < 7 || i > 28
                                ? 'bg-emerald-900'
                                : 'bg-emerald-100'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 shadow">
                          PIX ELYDNARA
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-emerald-900">
                      Chave PIX (Celular da Elydnara): <span className="font-mono">{OWNER_INFO.formattedPhone}</span>
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium">
                      Titular: Elydnara (Banco Inter/Nubank)
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      id="btn-copy-pix"
                      onClick={handleCopyPix}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      {copiedPix ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copiedPix ? 'Chave Copiada com Sucesso!' : 'Copiar Chave PIX'}
                    </button>
                  </div>
                </div>
              )}

              {/* Card Details */}
              {paymentMethod === 'cartao' && (
                <div className="bg-pink-50/40 border border-pink-100 rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4A2C2C] mb-1 uppercase tracking-wider">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8841"
                      defaultValue="4532 9981 2234 8841"
                      className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs font-mono text-[#4A2C2C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A2C2C] mb-1 uppercase tracking-wider">Validade</label>
                      <input
                        type="text"
                        placeholder="11/29"
                        defaultValue="08/29"
                        className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs font-mono text-[#4A2C2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-[#4A2C2C] mb-1 uppercase tracking-wider">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        defaultValue="892"
                        className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs font-mono text-[#4A2C2C]"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#6B4E4E] text-center flex items-center justify-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Ambiente seguro e criptografado com certificação SSL.
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-pink-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#6B4E4E] hover:text-[#4A2C2C] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                <button
                  type="button"
                  id="btn-confirm-payment"
                  disabled={isProcessingPayment}
                  onClick={handleConfirmBooking}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-75 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all active:scale-95"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Validando Pagamento...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirmar Reserva (R$ {paymentAmount.toFixed(2)})
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Success & Instant Confirmation */}
          {step === 5 && (
            <div className="text-center py-4 space-y-6">
              <div className="inline-flex p-4 bg-emerald-100 rounded-full text-emerald-600 mb-1 ring-8 ring-emerald-50">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="font-cursive text-3xl sm:text-4xl text-[#D64D6E] block mb-1">
                  Elydnara
                </span>
                <h3 className="text-xl font-black text-[#4A2C2C] font-display">
                  Agendamento Confirmado com Sucesso! 🌸
                </h3>
                <p className="text-xs text-[#6B4E4E] max-w-md mx-auto mt-1 font-medium">
                  Muito obrigado, <span className="font-bold text-[#4A2C2C]">{clientName}</span>! Seu horário foi reservado na agenda da Elydnara.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-pink-50/40 border border-pink-100 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2 text-[#4A2C2C]">
                <div className="flex justify-between border-b border-pink-100 pb-2 font-black text-[#D64D6E]">
                  <span>Serviço:</span>
                  <span>{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4E4E]">Profissional:</span>
                  <span className="font-bold text-[#4A2C2C]">{selectedProfessional.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4E4E]">Data e Horário:</span>
                  <span className="font-bold text-[#4A2C2C]">{selectedDate} às {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B4E4E]">Reserva Paga:</span>
                  <span className="font-black text-emerald-700">R$ {paymentAmount.toFixed(2)} ({paymentMethod.toUpperCase()})</span>
                </div>
                <div className="flex justify-between text-[#6B4E4E] pt-1 border-t border-dashed border-pink-200">
                  <span>Local:</span>
                  <span className="text-right text-[#4A2C2C] font-medium">{OWNER_INFO.address}</span>
                </div>
              </div>

              {/* WhatsApp Notification Direct Trigger */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto text-left">
                <div className="flex items-center gap-2 text-emerald-900 font-black text-xs mb-1">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Notificação Automática no WhatsApp
                </div>
                <p className="text-[11px] text-emerald-700 mb-3 font-medium">
                  Clique abaixo para abrir a mensagem de confirmação diretamente com a Elydnara no WhatsApp {OWNER_INFO.formattedPhone}:
                </p>
                <a
                  id="btn-whatsapp-confirm"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl shadow transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar Comprovante via WhatsApp
                </a>
              </div>

              {/* Push Notifications Opt-In */}
              <div className="bg-pink-50/70 border border-pink-200 rounded-2xl p-4 max-w-md mx-auto text-left">
                <div className="flex items-center gap-2 text-[#D64D6E] font-black text-xs mb-1 font-display">
                  <Bell className="w-4 h-4 text-[#D64D6E]" />
                  Lembrete de Consulta Próxima (Push Notification)
                </div>
                <p className="text-[11px] text-[#6B4E4E] mb-2 font-medium">
                  Ative as notificações push do navegador para ser avisada 24 horas antes do seu horário!
                </p>
                <button
                  type="button"
                  id="btn-enable-push"
                  onClick={requestPushNotification}
                  className="px-3.5 py-1.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-95"
                >
                  Ativar Lembrete Push
                </button>
                {pushStatus && (
                  <p className="text-[11px] font-bold text-emerald-700 mt-2">{pushStatus}</p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id="btn-finish-booking"
                  onClick={onClose}
                  className="px-8 py-3 bg-[#4A2C2C] hover:bg-[#341F1F] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow transition-all active:scale-95"
                >
                  Concluir e Voltar ao Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
