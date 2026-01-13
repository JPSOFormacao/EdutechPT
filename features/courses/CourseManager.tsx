import React, { useState } from 'react';
import { Course } from '../../types';
import { Sparkles, Save, X } from 'lucide-react';
import { generateCourseDetails } from '../../services/geminiService';

interface CourseManagerProps {
  course?: Course | null;
  onSave: (course: Course) => void;
  onCancel: () => void;
  currentUserId: string;
}

export const CourseManager: React.FC<CourseManagerProps> = ({ course, onSave, onCancel, currentUserId }) => {
  const [formData, setFormData] = useState<Partial<Course>>(course || {
    title: '',
    category: 'Geral',
    level: 'Iniciante',
    duration: '25 Horas',
    description: '',
    objectives: [],
    syllabus: '',
    status: 'draft',
    instructorId: currentUserId
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiGeneration = async () => {
    if (!formData.title) return alert('Insira um título primeiro!');
    
    setIsGenerating(true);
    const result = await generateCourseDetails(formData.title);
    
    if (result) {
      setFormData(prev => ({
        ...prev,
        description: result.description,
        objectives: result.objectives,
        syllabus: result.syllabus
      }));
    } else {
      alert('Erro ao gerar conteúdo. Verifique a API Key.');
    }
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">{course ? 'Editar Curso' : 'Novo Curso'}</h2>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-1">Título do Curso</label>
               <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: Introdução à Robótica"
               />
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Categoria</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option>Competências Digitais</option>
                    <option>Inteligência Artificial</option>
                    <option>Ferramentas Colaborativas</option>
                    <option>Programação</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Nível</label>
                  <select 
                    value={formData.level}
                    onChange={e => setFormData({...formData, level: e.target.value as any})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option>Iniciante</option>
                    <option>Intermédio</option>
                    <option>Avançado</option>
                  </select>
               </div>
             </div>

             <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                <div className="flex items-center space-x-4 mt-2">
                   <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={formData.status === 'published'} 
                        onChange={() => setFormData({...formData, status: 'published'})}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">Publicado</span>
                   </label>
                   <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="status" 
                        checked={formData.status === 'draft'} 
                        onChange={() => setFormData({...formData, status: 'draft'})}
                        className="text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-slate-700">Rascunho</span>
                   </label>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 relative">
               <div className="absolute top-4 right-4">
                  <button 
                    onClick={handleAiGeneration}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-sm"
                  >
                    {isGenerating ? <span className="animate-spin">⌛</span> : <Sparkles size={16} />}
                    Preencher com IA
                  </button>
               </div>
               <h3 className="text-indigo-900 font-bold mb-2 text-sm">Assistente de Conteúdo (Gemini)</h3>
               <p className="text-xs text-indigo-700 mb-4 pr-32">
                 Escreva o título e clique no botão para gerar automaticamente a descrição, objetivos e programa do curso.
               </p>
             </div>

             <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Descrição</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 text-sm"
                  placeholder="Descrição do curso..."
                ></textarea>
             </div>
          </div>
        </div>
        
        {/* Full width editors */}
        <div>
           <label className="block text-sm font-bold text-slate-700 mb-1">Programa (HTML Suportado)</label>
           <textarea 
              value={formData.syllabus}
              onChange={e => setFormData({...formData, syllabus: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 font-mono text-xs text-slate-600 bg-slate-50"
              placeholder="<p>Módulo 1...</p>"
           ></textarea>
        </div>
      </div>

      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
        <button onClick={onCancel} className="px-5 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
        <button 
          onClick={() => onSave(formData as Course)}
          className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Save size={18} /> Guardar Curso
        </button>
      </div>
    </div>
  );
};
