import React, { useState } from 'react';
import { 
  X, Calendar, Clock, User, Phone, CheckCircle2, 
  AlertCircle, Trash2, Search, Plus, Filter, MessageCircle, 
  DollarSign, Shield, Send, Check, Ban
} from 'lucide-react';
import { Appointment, Service, Professional } from '../types';
import { OWNER_INFO } from '../data/mockData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  services: Service[];
  professionals: Professional[];
  onUpdateAppointmentStatus: (id: string, newStatus: Appointment['status']) => void;
  onDeleteAppointment: (id: string) => void;
  onAddAppointment: (newAppointment: Appointment) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  appointments,
  services,
  professionals,
  onUpdateAppointmentStatus,
  onDeleteAppointment,
  onAddAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'lista' | 'novo' | 'bloqueio'>('lista');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [reminderNotification, setReminderNotification] = useState<string>('');

  // New manual appointment form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [selectedProfId, setSelectedProfId] = useState('elydnara');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('14:00');
  const [paymentStatus, setPaymentStatus] = useState<'pago_sinal' | 'pago_total' | 'pendente'>('pago_sinal');

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.clientPhone.includes(searchTerm) ||
      apt.serviceName.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'hoje') return apt.date === todayStr;
    if (filterStatus === 'proximos') return apt.date >= todayStr && apt.status !== 'cancelado';
    if (filterStatus === 'todos') return true;
    return apt.status === filterStatus;
  });

  // Calculate statistics
  const totalRevenue = appointments
    .filter((a) => a.status !== 'cancelado')
    .reduce((acc, curr) => acc + (curr.depositAmount || 0), 0);

  const todayAppointmentsCount = appointments.filter(
    (a) => a.date === todayStr && a.status !== 'cancelado'
  ).length;

  const handleCreateManualAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const svc = services.find((s) => s.id === selectedServiceId) || services[0];
    const prof = professionals.find((p) => p.id === selectedProfId) || professionals[0];

    const newApt: Appointment = {
      id: `apt-manual-${Date.now()}`,
      clientName,
      clientPhone: clientPhone.replace(/\D/g, ''),
      serviceId: svc.id,
      serviceName: svc.name,
      servicePrice: svc.price,
      depositAmount: svc.depositRequired,
      professionalId: prof.id,
      professionalName: prof.name,
      date,
      time,
      paymentStatus,
      paymentMethod: 'pix',
      status: 'confirmado',
      notes: 'Agendado manualmente via painel da Elydnara',
      createdAt: new Date().toISOString(),
      reminderSent: true,
    };

    onAddAppointment(newApt);
    setClientName('');
    setClientPhone('');
    setActiveTab('lista');
  };

  const handleSendWhatsAppReminder = (apt: Appointment) => {
    const msg = encodeURIComponent(
      `Olá ${apt.clientName}! 🌸 Aqui é a Elydnara!\n\n` +
      `Passando para lembrar do seu horário agendado:\n` +
      `📅 *Data:* ${apt.date} às ${apt.time}\n` +
      `💅 *Procedimento:* ${apt.serviceName}\n` +
      `📍 *Local:* ${OWNER_INFO.address}\n\n` +
      `Sua reserva está garantida. Estamos te esperando com um cafezinho especial! 💕`
    );

    window.open(`https://wa.me/55${apt.clientPhone}?text=${msg}`, '_blank');
    setReminderNotification(`Lembrete WhatsApp disparado para ${apt.clientName}!`);
    setTimeout(() => setReminderNotification(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        id="admin-panel-container"
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden my-6"
      >
        {/* Admin Header */}
        <div className="bg-[#4A2C2C] p-5 sm:p-6 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cursive text-3xl sm:text-4xl text-pink-200">Elydnara</span>
              <span className="bg-[#D64D6E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Painel da Elydnara
              </span>
            </div>
            <p className="text-xs text-pink-100/90 mt-1 font-medium">
              Gestão de horários, confirmações WhatsApp e controle de pagamentos antecipados.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-white uppercase tracking-wider">Elydnara (Responsável)</p>
              <p className="text-[11px] text-pink-200 font-mono">{OWNER_INFO.formattedPhone}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-pink-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              title="Fechar painel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="bg-pink-50/70 p-4 sm:p-5 border-b border-pink-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
            <span className="text-[#6B4E4E] block font-bold text-[11px] uppercase tracking-wider">Atendimentos Hoje</span>
            <span className="text-2xl font-black text-[#D64D6E]">{todayAppointmentsCount}</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
            <span className="text-[#6B4E4E] block font-bold text-[11px] uppercase tracking-wider">Total Agendados</span>
            <span className="text-2xl font-black text-[#4A2C2C]">{appointments.length}</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
            <span className="text-[#6B4E4E] block font-bold text-[11px] uppercase tracking-wider">Sinais Recebidos (PIX)</span>
            <span className="text-2xl font-black text-emerald-700">R$ {totalRevenue.toFixed(2)}</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
            <span className="text-[#6B4E4E] block font-bold text-[11px] uppercase tracking-wider">Status da Agenda</span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sincronizada em Tempo Real
            </span>
          </div>
        </div>

        {/* Reminder Alert Banner */}
        {reminderNotification && (
          <div className="bg-emerald-50 text-emerald-800 text-xs px-5 py-2.5 font-bold flex items-center justify-between border-b border-emerald-200">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {reminderNotification}
            </span>
            <button onClick={() => setReminderNotification('')} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex border-b border-pink-100 px-6 pt-3 bg-white gap-4 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <button
            onClick={() => setActiveTab('lista')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'lista'
                ? 'border-[#D64D6E] text-[#D64D6E]'
                : 'border-transparent text-[#6B4E4E] hover:text-[#4A2C2C]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Gerenciar Horários ({filteredAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('novo')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'novo'
                ? 'border-[#D64D6E] text-[#D64D6E]'
                : 'border-transparent text-[#6B4E4E] hover:text-[#4A2C2C]'
            }`}
          >
            <Plus className="w-4 h-4" />
            Adicionar Agendamento Manual
          </button>
          <button
            onClick={() => setActiveTab('bloqueio')}
            className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'bloqueio'
                ? 'border-[#D64D6E] text-[#D64D6E]'
                : 'border-transparent text-[#6B4E4E] hover:text-[#4A2C2C]'
            }`}
          >
            <Ban className="w-4 h-4" />
            Bloqueios & Horários Especiais
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[62vh] overflow-y-auto">
          
          {/* TAB 1: Appointments List */}
          {activeTab === 'lista' && (
            <div className="space-y-4">
              
              {/* Filter and Search controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, fone ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-pink-50/50 border border-pink-200 rounded-xl text-xs text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                  {['todos', 'hoje', 'proximos', 'confirmado', 'concluido', 'cancelado'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                        filterStatus === st
                          ? 'bg-[#D64D6E] text-white shadow-xs'
                          : 'bg-pink-50 text-[#6B4E4E] hover:bg-pink-100 hover:text-[#4A2C2C]'
                      }`}
                    >
                      {st === 'todos' ? 'Todos' : st === 'hoje' ? 'Hoje' : st === 'proximos' ? 'Próximos' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / Cards of Appointments */}
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 text-[#A67C7C] text-xs font-medium">
                  Nenhum agendamento encontrado para os filtros selecionados.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-white border border-pink-100 rounded-2xl p-4 shadow-xs hover:shadow-md hover:border-pink-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      {/* Left: Client & Service Details */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-[#4A2C2C] text-sm">{apt.clientName}</span>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                              apt.status === 'confirmado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : apt.status === 'em_atendimento'
                                ? 'bg-purple-100 text-purple-800'
                                : apt.status === 'concluido'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {apt.status}
                          </span>
                          <span className="text-[10px] font-bold bg-pink-100 text-[#D64D6E] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {apt.paymentStatus === 'pago_total' ? '100% Pago' : 'Sinal PIX Pago'}
                          </span>
                        </div>

                        <p className="text-xs font-black text-[#D64D6E]">{apt.serviceName}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#6B4E4E] font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#D64D6E]" />
                            {apt.date} às {apt.time}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {apt.professionalName}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono">
                            <Phone className="w-3.5 h-3.5" />
                            {apt.clientPhone}
                          </span>
                        </div>

                        {apt.notes && (
                          <p className="text-[11px] text-[#6B4E4E] bg-pink-50/50 px-2 py-1 rounded-md border border-pink-100 italic">
                            Obs: {apt.notes}
                          </p>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {/* 1-Click WhatsApp Reminder button */}
                        <button
                          onClick={() => handleSendWhatsAppReminder(apt)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
                          title="Enviar lembrete do horário no WhatsApp do cliente"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Lembrete WhatsApp
                        </button>

                        {/* Status dropdown */}
                        <select
                          value={apt.status}
                          onChange={(e) => onUpdateAppointmentStatus(apt.id, e.target.value as any)}
                          className="bg-pink-50/50 border border-pink-200 text-xs font-bold text-[#4A2C2C] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                        >
                          <option value="confirmado">Confirmado</option>
                          <option value="em_atendimento">Em Atendimento</option>
                          <option value="concluido">Concluído</option>
                          <option value="cancelado">Cancelado</option>
                        </select>

                        {/* Delete button */}
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente remover o agendamento de ${apt.clientName}?`)) {
                              onDeleteAppointment(apt.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remover agendamento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: Manual Booking */}
          {activeTab === 'novo' && (
            <form onSubmit={handleCreateManualAppointment} className="max-w-2xl mx-auto space-y-4">
              <h4 className="text-sm font-black text-[#4A2C2C] border-b border-pink-100 pb-2 font-display">
                Cadastrar Agendamento Balcão / Telefone
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Nome da Cliente *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ex: Vanessa Guimarães"
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="31999998888"
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Procedimento</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - R$ {s.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Profissional</label>
                  <select
                    value={selectedProfId}
                    onChange={(e) => setSelectedProfId(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  >
                    {professionals.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Horário</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  >
                    {['08:30', '10:00', '11:30', '13:30', '15:00', '16:30', '18:00'].map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-[#4A2C2C] uppercase tracking-wider mb-1">Status Pagamento</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-white border border-pink-200 rounded-xl px-3 py-2 text-xs text-[#4A2C2C] font-semibold focus:outline-none focus:ring-2 focus:ring-[#D64D6E]"
                  >
                    <option value="pago_sinal">Sinal Pago</option>
                    <option value="pago_total">Total Pago</option>
                    <option value="pendente">Pendente no Local</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D64D6E] hover:bg-[#BF3B5B] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95"
                >
                  Salvar Agendamento na Agenda
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Block slots */}
          {activeTab === 'bloqueio' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <h4 className="text-sm font-black text-[#4A2C2C] border-b border-pink-100 pb-2 font-display">
                Gerenciamento de Bloqueios & Folgas da Elydnara
              </h4>
              <p className="text-xs text-[#6B4E4E] font-medium">
                Bloqueie datas inteiras ou horários específicos para cursos, manutenção de estoque ou folgas.
              </p>

              <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 space-y-3">
                <p className="text-xs font-black text-[#D64D6E] uppercase tracking-wider">Próximas Folgas Cadastradas:</p>
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-pink-100 flex justify-between items-center">
                    <div>
                      <span className="font-black text-[#4A2C2C]">Segunda-feira (Fixo)</span>
                      <span className="block text-[#6B4E4E] text-[11px] font-medium">Dia reservado para descanso da equipe</span>
                    </div>
                    <span className="text-[10px] bg-pink-100 text-[#D64D6E] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Bloqueado
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-pink-100 flex justify-between items-center">
                    <div>
                      <span className="font-black text-[#4A2C2C]">Domingo (Fixo)</span>
                      <span className="block text-[#6B4E4E] text-[11px] font-medium">Salão fechado</span>
                    </div>
                    <span className="text-[10px] bg-pink-100 text-[#D64D6E] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Bloqueado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
