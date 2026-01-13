import React, { useEffect, useState } from 'react';
import { User, UserRole, Course } from '../../types';
import { Users, BookOpen, Download, Calendar, Bell, Plus, Trash2, BrainCircuit } from 'lucide-react';
import { generateClassroomTip } from '../../services/geminiService';

interface DashboardProps {
  user: User;
  courses: Course[];
  onNavigate: (view: string) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ user, courses, onNavigate }) => {
  const [tip, setTip] = useState<string>("A carregar dica de IA...");
  
  useEffect(() => {
    // Simulate fetching daily tip on mount
    generateClassroomTip().then(setTip);
  }, []);

  const isAdmin = user.role === UserRole.ADMIN;
  const isTrainer = user.role === UserRole.TRAINER || isAdmin;
  
  // Dashboard Metrics Logic
  const myCourses = isTrainer 
    ? courses.filter(c => isAdmin || c.instructorId === user.id)
    : courses.slice(0, 2); // Student sees enrolled (mocked slice)
    
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Olá, {user.name.split(' ')[0]}! 👋</h1>
           <p className="text-slate-500 mt-1">
             {isAdmin ? 'Painel de Administração Global' : isTrainer ? 'Gestão Pedagógica - Formador' : 'Área do Aluno - O meu progresso'}
           </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
          <Calendar className="text-blue-500" size={20} />
          <span className="text-slate-700 font-medium">{new Date().toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
      </div>

      {/* AI Daily Tip */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
           <BrainCircuit size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <BrainCircuit size={20} className="text-yellow-300" />
             <span className="text-indigo-200 font-bold uppercase text-xs tracking-wider">Dica EduTech AI</span>
          </div>
          <p className="text-lg md:text-xl font-medium leading-relaxed">"{tip}"</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Cursos Ativos</p>
              <h3 className="text-2xl font-bold text-slate-900">{courses.length}</h3>
            </div>
         </div>
         
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{isTrainer ? 'Meus Alunos' : 'Colegas'}</p>
              <h3 className="text-2xl font-bold text-slate-900">{isTrainer ? 87 : 24}</h3>
            </div>
         </div>

         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Download size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Recursos</p>
              <h3 className="text-2xl font-bold text-slate-900">128</h3>
            </div>
         </div>

         {isAdmin && (
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 border-l-4 border-l-amber-500">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                <Bell size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Alertas Sistema</p>
                <h3 className="text-2xl font-bold text-slate-900">3</h3>
              </div>
           </div>
         )}
      </div>

      {/* Main Content Area Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left Column: Quick Courses Access */}
         <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-slate-900">
                 {isTrainer ? 'As Minhas Turmas' : 'Meus Cursos'}
               </h2>
               {isTrainer && (
                 <button onClick={() => onNavigate('courses')} className="text-sm text-blue-600 font-bold hover:bg-blue-50 px-3 py-1 rounded transition-colors">
                   Gerir Tudo
                 </button>
               )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-slate-600">
                   <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-xs">
                     <tr>
                       <th className="px-6 py-4">Curso</th>
                       <th className="px-6 py-4">Categoria</th>
                       <th className="px-6 py-4">Estado</th>
                       <th className="px-6 py-4 text-right">Ação</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                     {myCourses.map(course => (
                       <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                         <td className="px-6 py-4">
                           <span className="px-2 py-1 rounded bg-slate-100 text-xs font-bold text-slate-600">
                             {course.category}
                           </span>
                         </td>
                         <td className="px-6 py-4">
                           <span className={`flex items-center gap-1.5 text-xs font-bold ${course.status === 'published' ? 'text-emerald-600' : 'text-amber-600'}`}>
                             <span className={`w-2 h-2 rounded-full ${course.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                             {course.status === 'published' ? 'ONLINE' : 'RASCUNHO'}
                           </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                           <button className="text-blue-600 font-bold hover:text-blue-800 text-xs">ACEDER</button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>

         {/* Right Column: Notices & Quick Actions */}
         <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="font-bold text-slate-900">Quadro de Avisos</h3>
                 {isAdmin && <button className="text-slate-400 hover:text-blue-600"><Plus size={18} /></button>}
               </div>
               <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-blue-800 text-sm mb-1">Manutenção Programada</h4>
                      {isAdmin && <button className="text-blue-300 hover:text-red-500"><Trash2 size={14} /></button>}
                    </div>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      A plataforma estará indisponível dia 25 entre as 02:00 e as 04:00 para updates.
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <h4 className="font-bold text-amber-800 text-sm mb-1">Prazo de Entrega</h4>
                    <p className="text-xs text-amber-700 leading-relaxed">
                      Alunos de "Literacia Digital": submissão do portefólio até sexta-feira.
                    </p>
                  </div>
               </div>
            </div>

            {isTrainer && (
              <div className="bg-slate-800 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <BrainCircuit size={18} className="text-purple-400" /> Ferramentas Professor
                </h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm transition-colors flex items-center justify-between group">
                    <span>Gerar Plano de Aula (IA)</span>
                    <span className="opacity-0 group-hover:opacity-100 text-purple-300">→</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded hover:bg-white/10 text-sm transition-colors flex items-center justify-between group">
                    <span>Grelha de Avaliação</span>
                    <span className="opacity-0 group-hover:opacity-100 text-purple-300">→</span>
                  </button>
                </div>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
