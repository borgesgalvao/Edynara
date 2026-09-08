export interface Service {
  id: string;
  name: string;
  category: 'alongamento' | 'natural' | 'nailart' | 'spa' | 'manutencao';
  price: number;
  durationMinutes: number;
  description: string;
  image: string;
  isPopular?: boolean;
  depositRequired: number; // Pagamento antecipado (sinal de reserva)
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  specialty: string;
  rating: number;
  isOwner?: boolean;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  depositAmount: number;
  professionalId: string;
  professionalName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  paymentStatus: 'pago_sinal' | 'pago_total' | 'pendente';
  paymentMethod: 'pix' | 'cartao';
  status: 'confirmado' | 'em_atendimento' | 'concluido' | 'cancelado';
  notes?: string;
  createdAt: string;
  reminderSent?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  professionalName: string;
  image: string;
  likes: number;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  summary: string;
  content: string[];
  tips: string[];
  tags: string[];
}
