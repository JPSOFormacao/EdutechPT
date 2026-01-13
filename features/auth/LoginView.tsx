import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { GraduationCap, Mail, Lock, AlertCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { MOCK_USERS } from '../../services/mockData';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onBack: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate Supabase/Network delay
    setTimeout(() => {
      const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        if (password === 'password') { // Mock password check
          onLoginSuccess(user);
        } else {
          setError('Credenciais inválidas. Tente novamente.');
        }
      } else {
        setError('Utilizador não encontrado. Contacte o administrador.');
      }
      setIsLoading(false);
    }, 1000);
  };

  if (showContactForm) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
           <button onClick={() => setShowContactForm(false)} className="text-slate-400 hover:text-blue-600 mb-6 flex items-center gap-2 text-sm font-medium">
             <ArrowLeft size={16} /> Voltar ao Login
           </button>
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Suporte de Acesso</h2>
           <p className="text-slate-600 mb-6 text-sm">Preencha o formulário. O administrador receberá um email via EmailJS.</p>
           
           <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Pedido enviado!'); setShowContactForm(false); }}>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
               <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Email de Contacto</label>
               <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
             </div>
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
               <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24" placeholder="Descreva o problema..."></textarea>
             </div>
             <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700">Enviar Pedido</button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2">
         <ArrowLeft size={20} /> Voltar à Landing Page
      </button>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-600/30">
            <GraduationCap size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo de volta</h2>
          <p className="text-slate-500 mt-2">EduTech PT - Gestão de Formação</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 bg-slate-50 focus:bg-white"
                placeholder="nome@exemplo.pt"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Palavra-passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 bg-slate-50 focus:bg-white"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-end mt-2">
               <span className="text-xs text-slate-400">(Hint: use "password")</span>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg hover:shadow-blue-600/30 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Entrar'}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100">
          <button onClick={() => setShowContactForm(true)} className="text-slate-500 hover:text-blue-600 text-sm font-medium flex items-center justify-center gap-1 mx-auto transition-colors">
            <HelpCircle size={16} /> Problemas no acesso?
          </button>
          <p className="mt-4 text-xs text-slate-400">
            Acesso restrito a utilizadores registados.
            <br/>Protegido por reCAPTCHA e sujeito à Política de Privacidade.
          </p>
        </div>
      </div>
      
      {/* Test Credentials Helper */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-slate-200 text-xs opacity-80 hover:opacity-100 transition-opacity">
        <p className="font-bold mb-1">Contas de Teste (Pass: password):</p>
        <p>Admin: edutechpt@hotmail.com</p>
        <p>Formador: joao.formador@edutech.pt</p>
        <p>Aluno: maria.aluna@email.com</p>
      </div>
    </div>
  );
};
