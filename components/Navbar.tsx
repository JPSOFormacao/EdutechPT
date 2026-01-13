import React from 'react';
import { GraduationCap, LogIn, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLoginClick, onLogoutClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow-lg">
              <GraduationCap size={24} />
            </div>
            <span className="ml-3 text-xl font-bold text-slate-900 tracking-tight">EduTech <span className="text-blue-600">PT</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('landing')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Início</button>
            <button onClick={() => onNavigate('landing')} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Formações</button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                 <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center space-x-2 text-slate-700 font-semibold bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors"
                >
                  <UserIcon size={18} />
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                <button 
                  onClick={onLogoutClick}
                  className="text-slate-500 hover:text-red-500 transition-colors"
                  title="Sair"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <LogIn size={18} />
                <span>Entrar na Plataforma</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">Início</button>
            <button onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">Catálogo</button>
            {user ? (
               <>
                <button onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-blue-600 bg-blue-50 font-bold">
                  Aceder ao Dashboard
                </button>
                <button onClick={() => { onLogoutClick(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50">
                  Terminar Sessão
                </button>
               </>
            ) : (
              <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="block w-full mt-4 text-center px-5 py-3 rounded-lg text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md">
                Aceder à Área Reservada
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
