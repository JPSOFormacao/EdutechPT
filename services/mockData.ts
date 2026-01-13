import { User, UserRole, Course, Testimonial } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Administrador EduTech',
    email: 'edutechpt@hotmail.com', // Requested Admin
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/200',
    bio: 'Gestor da Plataforma EduTech PT.'
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.formador@edutech.pt',
    role: UserRole.TRAINER,
    avatar: 'https://picsum.photos/201',
    bio: 'Especialista em ferramentas Google e IA.'
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria.aluna@email.com',
    role: UserRole.STUDENT,
    avatar: 'https://picsum.photos/202',
    bio: 'Professora do 1º Ciclo interessada em tecnologia.'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Literacia Digital Avançada',
    description: 'Domine as ferramentas essenciais para o século XXI. Desde a segurança online até à gestão eficiente de ficheiros na nuvem.',
    category: 'Competências Digitais',
    duration: '25 Horas',
    level: 'Iniciante',
    image: 'https://picsum.photos/800/600?random=1',
    status: 'published',
    instructorId: '2',
    enrolledCount: 15,
    objectives: ['Compreender segurança online', 'Gerir identidade digital', 'Navegação eficiente'],
    syllabus: '<p><strong>Módulo 1:</strong> Introdução à Segurança.<br><strong>Módulo 2:</strong> Gestão de Identidade.</p>'
  },
  {
    id: 'c2',
    title: 'IA para Docentes',
    description: 'Aprenda a criar planos de aula, avaliações e recursos didáticos utilizando Inteligência Artificial Generativa.',
    category: 'Inteligência Artificial',
    duration: '50 Horas',
    level: 'Intermédio',
    image: 'https://picsum.photos/800/600?random=2',
    status: 'published',
    instructorId: '2',
    enrolledCount: 42,
    objectives: ['Prompt Engineering', 'Criação de Recursos', 'Ética na IA'],
    syllabus: '<p><strong>Módulo 1:</strong> O que é a IA Generativa.<br><strong>Módulo 2:</strong> Prompts Eficazes.</p>'
  },
  {
    id: 'c3',
    title: 'Ferramentas Google na Sala de Aula',
    description: 'Maximize a produtividade e a colaboração com o Google Workspace for Education.',
    category: 'Ferramentas Colaborativas',
    duration: '15 Horas',
    level: 'Iniciante',
    image: 'https://picsum.photos/800/600?random=3',
    status: 'published',
    instructorId: '2',
    enrolledCount: 30,
    objectives: ['Google Docs', 'Google Sheets', 'Google Classroom'],
    syllabus: '<p><strong>Módulo 1:</strong> Google Drive e Partilha.</p>'
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Ana Ferreira',
    role: 'Professora de História',
    content: 'A formação de IA mudou completamente a forma como preparo as minhas aulas. Poupo horas de trabalho!',
    avatar: 'https://picsum.photos/100?random=10'
  },
  {
    id: 't2',
    name: 'Carlos Bento',
    role: 'Formando Sénior',
    content: 'Pensava que já não tinha idade para aprender estas coisas, mas a plataforma é muito intuitiva.',
    avatar: 'https://picsum.photos/100?random=11'
  }
];
