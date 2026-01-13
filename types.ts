export enum UserRole {
  ADMIN = 'admin',
  TRAINER = 'trainer',
  STUDENT = 'student'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'Iniciante' | 'Intermédio' | 'Avançado';
  image: string;
  status: 'published' | 'draft' | 'archived';
  instructorId: string;
  syllabus?: string; // HTML content
  objectives?: string[];
  enrolledCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  progress: number;
  status: 'active' | 'completed';
}
