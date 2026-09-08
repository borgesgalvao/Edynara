import { Service, Professional, GalleryItem, Testimonial, BlogPost, Appointment } from '../types';
import galleryImgCuzvGPorxP5 from '../assets/images/gallery_cuzvgporxp5.jpg';
import galleryImgDo1W4v0EeDB from '../assets/images/gallery_do1w4v0eedb.jpg';
import galleryImgDEhmu1lJd4e from '../assets/images/gallery_dehmu1ljd4e.jpg';
import galleryImgDGQ7vsUSrQp from '../assets/images/gallery_dgq7vsusrqp.jpg';
import galleryImgDAZ8lavt_Hy from '../assets/images/gallery_daz8lavt_hy.jpg';
import galleryImgDAi94juptYy from '../assets/images/gallery_dai94juptyy.jpg';
import galleryImgCsjLvzJ7xO from '../assets/images/gallery_csjlvzj7xo.jpg';
import blogImgCpM_xyzMIm0 from '../assets/images/blog_cpm_xyzmim0.jpg';
import blogImgCmL2_6lMXpl from '../assets/images/blog_cml2_6lmxpl.jpg';
import serviceImgDxneVh4DaWN from '../assets/images/service_dxnevh4dawn.jpg';

export const OWNER_INFO = {
  name: 'Elydnara',
  salonName: 'Elydnara',
  phone: '31995582718',
  formattedPhone: '(31) 99558-2718',
  instagram: '@elydnararodrigues_nails',
  instagramUrl: 'https://www.instagram.com/elydnararodrigues_nails',
  address: 'João Monlevade - MG',
  cep: '35930-000',
  hours: 'Terça a Sábado: 08:30 às 19:30',
  pixKey: '31995582718',
};

export const SERVICES_DATA: Service[] = [
  {
    id: 'alongamento-fibra',
    name: 'Alongamento em Fibra de Vidro',
    category: 'alongamento',
    price: 160,
    depositRequired: 40,
    durationMinutes: 120,
    description: 'Alongamento ultrafino com aspecto 100% natural, resistência máxima e acabamento com curvatura C perfeita.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'alongamento-gel',
    name: 'Alongamento em Gel Moldado',
    category: 'alongamento',
    price: 150,
    depositRequired: 35,
    durationMinutes: 110,
    description: 'Gel estruturado e moldado sem tips, permitindo formatos almond, bailarina, quadrado ou stiletto.',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'esmaltacao-gel',
    name: 'Esmaltação em Gel & Blindagem',
    category: 'natural',
    price: 85,
    depositRequired: 25,
    durationMinutes: 60,
    description: 'Unhas impecáveis por até 21 dias sem lascar, secagem instantânea na cabine UV/LED e brilho espelhado.',
    image: 'https://images.unsplash.com/photo-1519014816548-bf785179c24e?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'manicure-russa',
    name: 'Manicure Russa (Cuticulagem a Seco)',
    category: 'natural',
    price: 70,
    depositRequired: 20,
    durationMinutes: 50,
    description: 'Técnica com micromotor e brocas diamantadas para acabamento profundo, limpo e sem cortes ou alicates agressivos.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'nail-art-luxo',
    name: 'Nail Art Personalizada & Francesinha Reversa',
    category: 'nailart',
    price: 65,
    depositRequired: 20,
    durationMinutes: 45,
    description: 'Decorações exclusivas, encapsulados com folha de ouro, efeito mármore, pedrarias Swarovski e traços à mão livre.',
    image: serviceImgDxneVh4DaWN,
    isPopular: true,
  },
  {
    id: 'spa-dos-pes',
    name: 'Spa dos Pés Relaxante com Parafina',
    category: 'spa',
    price: 95,
    depositRequired: 30,
    durationMinutes: 70,
    description: 'Higienização profunda, esfoliação com sais aromáticos, hidratação oclusiva com parafina morna e massagem relaxante.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'manutencao-perfeita',
    name: 'Manutenção de Alongamento (Gel / Fibra)',
    category: 'manutencao',
    price: 110,
    depositRequired: 30,
    durationMinutes: 90,
    description: 'Reposição de produto no crescimento, nivelamento, ajuste de ponto de tensão e nova esmaltação completa.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'banho-de-gel',
    name: 'Banho de Gel Fortalecedor',
    category: 'natural',
    price: 90,
    depositRequired: 25,
    durationMinutes: 60,
    description: 'Camada de gel sobre a própria unha natural para evitar quebras, permitindo o crescimento saudável com proteção rígida.',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
  }
];

export const PROFESSIONALS_DATA: Professional[] = [
  {
    id: 'elydnara',
    name: 'Elydnara',
    role: 'Fundadora & Master Nail Designer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Especialista com mais de 8 anos em alongamentos de alta precisão, formadora de manicures e apaixonada pela arte das unhas perfeitas.',
    specialty: 'Fibra de Vidro, Francesa Reversa e Curvatura C',
    rating: 5.0,
    isOwner: true,
  },
  {
    id: 'camila',
    name: 'Camila Santos',
    role: 'Nail Designer Sênior',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Especializada em Gel Moldado e Blindagem com foco em saúde e preservação da lâmina ungueal.',
    specialty: 'Gel na Tip e Manicure Russa',
    rating: 4.9,
  },
  {
    id: 'bruna',
    name: 'Bruna Lima',
    role: 'Artista de Nail Art & Spa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Criatividade sem limites para nail arts minimalistas, encapsuladas e cuidados de relaxamento para mãos e pés.',
    specialty: 'Nail Art Artística e Spa dos Pés',
    rating: 4.9,
  }
];

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Fibra de Vidro Almond com Efeito Babyboomer',
    category: 'Fibra de Vidro',
    professionalName: 'Elydnara',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    likes: 142,
    description: 'Transição suave do rosa leitoso para a ponta branca fosca. Elegância atemporal.',
    tags: ['Fibra', 'Almond', 'Babyboomer', 'Natural']
  },
  {
    id: 'gal-2',
    title: 'Francesinha Sorriso com Traço Dourado',
    category: 'Nail Art',
    professionalName: 'Elydnara',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80',
    likes: 189,
    description: 'Francesinha moderna e fina com acabamento metálico em folha de ouro 24k.',
    tags: ['Francesinha', 'Ouro', 'Luxo', 'Nail Art']
  },
  {
    id: 'gal-3',
    title: 'Vermelho Clássico com Brilho Espelhado',
    category: 'Esmaltação em Gel',
    professionalName: 'Camila Santos',
    image: galleryImgDAZ8lavt_Hy,
    likes: 115,
    description: 'Tom bordô intenso com top coat selante que não desbota por 25 dias.',
    tags: ['Vermelho', 'Esmaltação Gel', 'Clássico']
  },
  {
    id: 'gal-4',
    title: 'Alongamento Encapsulado com Glitters Rosê',
    category: 'Nail Art',
    professionalName: 'Bruna Lima',
    image: galleryImgDo1W4v0EeDB,
    likes: 230,
    description: 'Camadas transparentes de gel com pedrarias e flocos holográficos em tons rosados.',
    tags: ['Encapsulada', 'Glitter', 'Rosê', 'Bailarina']
  },
  {
    id: 'gal-5',
    title: 'Manicure Russa Perfeita com Nude Leitoso',
    category: 'Manicure Russa',
    professionalName: 'Elydnara',
    image: galleryImgDAi94juptYy,
    likes: 167,
    description: 'Cutículas 100% limpas sem agressão, esmaltação sob a dobra proximal para durabilidade extrema.',
    tags: ['Russa', 'Nude', 'Clean Girl', 'Elegante']
  },
  {
    id: 'gal-6',
    title: 'Unhas Quadradas Curtas com Nail Art Floral Minimalista',
    category: 'Nail Art',
    professionalName: 'Bruna Lima',
    image: galleryImgCsjLvzJ7xO,
    likes: 98,
    description: 'Pequenas flores em tons pastéis pintadas delicadamente à mão sobre base translúcida.',
    tags: ['Floral', 'Minimalista', 'Unhas Curtas']
  },
  {
    id: 'gal-7',
    title: 'Gel Moldado Formato Stiletto Preto Glossy',
    category: 'Gel Moldado',
    professionalName: 'Camila Santos',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80',
    likes: 156,
    description: 'Ponta afilada imponente com acabamento ultra brilhante e resistente a impactos.',
    tags: ['Stiletto', 'Preto', 'Gel', 'Marcante']
  },
  {
    id: 'gal-8',
    title: 'Esmaltação Lavanda Pastel com Glazed Donut',
    category: 'Esmaltação em Gel',
    professionalName: 'Elydnara',
    image: galleryImgCuzvGPorxP5,
    likes: 210,
    description: 'Pigmento perolado cromo sobre base lavanda, criando reflexos de concha do mar.',
    tags: ['Glazed Donut', 'Chrome', 'Lavanda', 'Tendência']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Mariana Silveira',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'A Elydnara é simplesmente mágica! Faço fibra de vidro há 2 anos com ela e minhas unhas naturais nunca ficaram fracas. O ambiente da Elydnara é impecável, com cafezinho e música calma!',
    service: 'Alongamento em Fibra de Vidro',
    date: 'Há 3 dias',
    verified: true,
  },
  {
    id: 'dep-2',
    name: 'Juliana Costa e Silva',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Agendei pelo site e paguei o sinal pelo PIX em menos de 2 minutos. Recebi confirmação automática no WhatsApp e lembrete push no dia anterior. Atendimento nota 1000!',
    service: 'Esmaltação em Gel & Blindagem',
    date: 'Semana passada',
    verified: true,
  },
  {
    id: 'dep-3',
    name: 'Fernanda Rodrigues',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'A manicure russa da Elydnara salvou minhas cutículas que viviam inflamando com alicates tradicionais. A curvatura C fica perfeita e dura quase um mês intacta.',
    service: 'Manicure Russa & Manutenção',
    date: 'Há 2 semanas',
    verified: true,
  },
  {
    id: 'dep-4',
    name: 'Patrícia Mendes',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Já completei meu cartão fidelidade do Clube Rosa e ganhei minha manutenção grátis! Muito legal ver o respeito e o carinho com que as clientes são tratadas.',
    service: 'Clube Rosa Fidelidade',
    date: 'Há 1 mês',
    verified: true,
  }
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Como Fazer seu Alongamento em Gel Durar Mais de 25 Dias Sem Infiltração',
    slug: 'durabilidade-alongamento-gel',
    category: 'Cuidados Essenciais',
    date: '18 de Agosto, 2026',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80',
    summary: 'Dicas práticas de rotina para preservar a saúde das unhas, evitar descolamentos e manter o brilho vitrificado até a próxima manutenção.',
    content: [
      'O alongamento de unhas em gel ou fibra de vidro é um investimento no seu bem-estar e autoestima. No entanto, sua durabilidade depende 50% da técnica profissional e 50% dos seus cuidados diários em casa.',
      'A principal causa de quebras precoces ou descolamento é usar as unhas como ferramentas: abrir latinhas, raspar etiquetas ou digitar pressionando as pontas em vez das gemas dos dedos.',
      'Outro ponto crucial é a hidratação das cutículas. O óleo nutritivo diário previne o ressecamento da borda lateral, impedindo que o ar penetre na camada do produto.'
    ],
    tips: [
      'Use luvas de borracha ao manusear produtos químicos e água sanitária.',
      'Aplique óleo de cutícula (com vitamina E e jojoba) toda noite antes de dormir.',
      'Nunca arranque uma ponta solta com os dentes — isso retira camadas da sua unha natural.',
      'Respeite o prazo de manutenção indicado pela Elydnara (de 21 a 28 dias).'
    ],
    tags: ['Alongamento', 'Dicas Elydnara', 'Durabilidade', 'Manutenção']
  },
  {
    id: 'post-2',
    title: 'Tendências de Esmaltação 2026: Do Glazed Donut ao Estilo Minimal Nails',
    slug: 'tendencias-esmaltacao-2026',
    category: 'Tendências & Moda',
    date: '25 de Agosto, 2026',
    readTime: '5 min de leitura',
    image: blogImgCpM_xyzMIm0,
    summary: 'Descubra os acabamentos cromados, as micro-francesinhas e os tons pastel que dominarão as estações deste ano.',
    content: [
      'O minimalismo sofisticado continua sendo a grande estrela das passarelas e dos salões internacionais. As unhas no estilo "Clean Girl" ganharam um toque moderno com os pós cromados perolados.',
      'A clássica francesinha agora surge em traços finíssimos (micro-french) em tons pastéis como pêssego, menta e lilás, além do sofisticado acabamento metálico em dourado e prata.',
      'Para quem adora nail art expressiva, o efeito mármore e as pedrarias delicadas aplicadas em unhas únicas ("filha única") são apostas certeiras com Elydnara.'
    ],
    tips: [
      'Invista no acabamento perolado (Glazed) sobre tons nudes para uma aparência rica e clean.',
      'O formato Amendoado (Almond) alonga visualmente os dedos e oferece maior resistência.',
      'Combine nail art em apenas um ou dois dedos para manter o equilíbrio sofisticado.'
    ],
    tags: ['Tendências', 'Cores 2026', 'Nail Art', 'Glazed Donut']
  },
  {
    id: 'post-3',
    title: 'Manicure Russa vs Tradicional: Por que a Cuticulagem a Seco é Mais Segura?',
    slug: 'manicure-russa-beneficios',
    category: 'Saúde da Unha',
    date: '01 de Setembro, 2026',
    readTime: '3 min de leitura',
    image: blogImgCmL2_6lMXpl,
    summary: 'Entenda como o método com brocas diamantadas limpa a região proximal sem cortes, acelerando a renovação e prevenindo fungos.',
    content: [
      'Diferente da manicure convencional que amolece a cutícula com água ou cremes e retira pele com alicate, a Manicure Russa é realizada totalmente a seco com micromotor e brocas esterilizadas em autoclave.',
      'Como a pele não é picotada, ela não cresce com aquele aspecto esgarçado ou com pontinhas soltas nos dias seguintes. O crescimento torna-se muito mais uniforme e suave.',
      'Além disso, o esmalte pode ser aplicado milímetros mais próximo da raiz sob a dobra ungueal, o que garante 7 a 10 dias a mais de visual recém-feito.'
    ],
    tips: [
      'Exija sempre materiais esterilizados em autoclave e brocas desinfetadas.',
      'A técnica é indolor e recomendada para quem tem cutículas finas ou ressecadas.',
      'O resultado dura em média de 3 a 4 semanas sem necessidade de retoques.'
    ],
    tags: ['Manicure Russa', 'Biossegurança', 'Cutículas', 'Técnica']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    clientName: 'Carla Beatriz Neves',
    clientPhone: '31988223344',
    clientEmail: 'carla.neves@gmail.com',
    serviceId: 'alongamento-fibra',
    serviceName: 'Alongamento em Fibra de Vidro',
    servicePrice: 160,
    depositAmount: 40,
    professionalId: 'elydnara',
    professionalName: 'Elydnara',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    paymentStatus: 'pago_sinal',
    paymentMethod: 'pix',
    status: 'confirmado',
    notes: 'Primeira vez com Elydnara. Deseja formato Almond.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    reminderSent: true,
  },
  {
    id: 'apt-102',
    clientName: 'Renata Albuquerque',
    clientPhone: '31997112233',
    clientEmail: 'renata.alb@hotmail.com',
    serviceId: 'esmaltacao-gel',
    serviceName: 'Esmaltação em Gel & Blindagem',
    servicePrice: 85,
    depositAmount: 25,
    professionalId: 'elydnara',
    professionalName: 'Elydnara',
    date: new Date().toISOString().split('T')[0],
    time: '11:30',
    paymentStatus: 'pago_total',
    paymentMethod: 'cartao',
    status: 'em_atendimento',
    notes: 'Cor preferida: Nude rosado com acabamento cromo.',
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    reminderSent: true,
  },
  {
    id: 'apt-103',
    clientName: 'Débora Guimarães',
    clientPhone: '31993445566',
    clientEmail: 'debora.gui@gmail.com',
    serviceId: 'manutencao-perfeita',
    serviceName: 'Manutenção de Alongamento (Gel / Fibra)',
    servicePrice: 110,
    depositAmount: 30,
    professionalId: 'camila',
    professionalName: 'Camila Santos',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    paymentStatus: 'pago_sinal',
    paymentMethod: 'pix',
    status: 'confirmado',
    notes: 'Manutenção periódica de 25 dias.',
    createdAt: new Date(Date.now() - 20000000).toISOString(),
    reminderSent: false,
  },
  {
    id: 'apt-104',
    clientName: 'Aline Vasconcelos',
    clientPhone: '31984556677',
    clientEmail: 'aline.vasc@gmail.com',
    serviceId: 'spa-dos-pes',
    serviceName: 'Spa dos Pés Relaxante com Parafina',
    servicePrice: 95,
    depositAmount: 30,
    professionalId: 'bruna',
    professionalName: 'Bruna Lima',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    paymentStatus: 'pago_sinal',
    paymentMethod: 'pix',
    status: 'confirmado',
    notes: 'Presente de aniversário de si mesma.',
    createdAt: new Date().toISOString(),
    reminderSent: false,
  }
];
