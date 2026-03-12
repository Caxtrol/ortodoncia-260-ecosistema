import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Stethoscope, Clock, FileText, AlertCircle, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function VistaClinicaLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Topbar Doctor */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <h1 className="text-lg md:text-xl font-serif font-bold text-teal-900">Ortodoncia 260</h1>
          <div className="hidden md:block h-6 w-px bg-slate-200"></div>
          <nav className="hidden md:flex items-center gap-1">
            <a href="/clinica/hoy" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${location.pathname.includes('/hoy') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Clock className="w-4 h-4" />
              Pacientes de Hoy
            </a>
            <a href="/clinica/expediente" className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${location.pathname.includes('/expediente') ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'}`}>
              <FileText className="w-4 h-4" />
              Expediente Activo
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden md:flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-amber-200">
            <AlertCircle className="w-4 h-4" />
            Siguiente paciente en sala (Hace 5m)
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-900 flex items-center justify-center text-white font-bold text-sm md:text-base">
            DR
          </div>
          <button 
            onClick={handleLogout}
            className="hidden md:block p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-2 flex flex-col gap-2 sticky top-[60px] z-40 shadow-md">
          <a href="/clinica/hoy" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${location.pathname.includes('/hoy') ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>
            <Clock className="w-5 h-5" />
            Pacientes de Hoy
          </a>
          <a href="/clinica/expediente" onClick={closeMenu} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${location.pathname.includes('/expediente') ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}>
            <FileText className="w-5 h-5" />
            Expediente Activo
          </a>
          <div className="h-px bg-slate-100 my-1"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-600 font-medium text-left"
          >
            <LogOut className="w-5 h-5" />
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
