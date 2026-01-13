import React, { useState } from 'react';
import { Course, Testimonial } from '../../types';
import { BookOpen, Clock, Star, ArrowRight, X, GraduationCap } from 'lucide-react';

interface LandingViewProps {
  courses: Course[];
  testimonials: Testimonial[];
  onCourseClick: (course: Course) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ courses, testimonials, onCourseClick }) => {
  const publishedCourses = courses.filter(c => c.status === 'published');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
            Formação Certificada 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Capacitação Digital para o <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Futuro da Educação</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed">
            Plataforma dedicada à formação de adultos e docentes em Novas Tecnologias. 
            Aprenda a integrar a IA, ferramentas Google e muito mais na sua prática profissional.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-600 rounded-lg text-lg font-bold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
              Explorar Formações <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-slate-700 rounded-lg text-lg font-semibold hover:bg-slate-600 transition-all border border-slate-600">
              Saber Mais
            </button>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section id="courses" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Catálogo de Formações</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Cursos práticos, desenhados para o contexto real e alinhados com o referencial DigCompEdu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedCourses.map(course => (
              <div key={course.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                      {course.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Clock size={16} /> {course.duration}</span>
                    <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                    {course.description}
                  </p>
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full mt-auto py-3 px-4 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Ver Detalhes <BookOpen size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">O que dizem os nossos formandos</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map(t => (
                <div key={t.id} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <p className="text-blue-600 text-sm">{t.role}</p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-8 text-slate-200">
                    <Star size={40} fill="#cbd5e1" stroke="none" className="opacity-20" />
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="text-blue-500" /> EduTech PT
            </h3>
            <p className="text-sm leading-relaxed">
              Capacitação digital para Portugal. <br/>
              © 2026 EduTech PT. Todos os direitos reservados.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade (RGPD)</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Termos e Condições</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Livro de Reclamações</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-white font-semibold mb-4">Contactos</h4>
             <p className="text-sm">edutechpt@hotmail.com</p>
             <p className="text-sm mt-2">Lisboa, Portugal</p>
          </div>
        </div>
      </footer>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedCourse(null)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 animate-in fade-in zoom-in duration-300">
            <div className="relative h-64">
              <img src={selectedCourse.image} className="w-full h-full object-cover" alt={selectedCourse.title} />
              <button 
                onClick={() => setSelectedCourse(null)} 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                 <span className="text-blue-300 text-sm font-bold uppercase tracking-wider mb-1 block">{selectedCourse.category}</span>
                 <h2 className="text-3xl font-bold text-white">{selectedCourse.title}</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex gap-4 mb-8 border-b border-slate-100 pb-6">
                <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="block text-slate-500 text-xs uppercase font-bold">Duração</span>
                  <span className="block text-slate-900 font-bold">{selectedCourse.duration}</span>
                </div>
                <div className="text-center px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                   <span className="block text-slate-500 text-xs uppercase font-bold">Nível</span>
                   <span className="block text-slate-900 font-bold">{selectedCourse.level}</span>
                </div>
              </div>

              <div className="space-y-6 text-slate-700">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Sobre o Curso</h3>
                  <p className="leading-relaxed">{selectedCourse.description}</p>
                </div>

                {selectedCourse.objectives && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Objetivos</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedCourse.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCourse.syllabus && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Programa</h3>
                    <div className="prose prose-slate prose-sm max-w-none bg-slate-50 p-4 rounded-lg border border-slate-100" dangerouslySetInnerHTML={{ __html: selectedCourse.syllabus }} />
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                 <p className="text-sm text-slate-500">Para se inscrever, faça login na plataforma.</p>
                 <button 
                  onClick={() => { setSelectedCourse(null); onCourseClick(selectedCourse); }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                 >
                   Fazer Login para Inscrever
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};