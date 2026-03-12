import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Calendar, Users, MessageSquare, Bell, CheckCircle2, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function DirectoraOperativaLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-serif font-bold tracking-tight text-teal-400">Ortodoncia 260</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Norma */}
      <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-slate-900 text-white flex-col fixed md:sticky top-[68px] md:top-0 h-[calc(100vh-68px)] md:h-screen z-40`}>
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-teal-400">Ortodoncia 260</h1>
          <p className="text-slate-400 text-sm mt-1">Operación Diaria</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0 overflow-y-auto">
          <a href="/operacion/agenda" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-colors">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">Agenda Unificada</span>
          </a>
          <a href="/operacion/pacientes" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 bg-slate-800 rounded-xl text-white transition-colors">
            <Users className="w-5 h-5 text-teal-400" />
            <span className="font-medium">Pacientes y QR</span>
          </a>
          <a href="/operacion/leads" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-colors flex-1 justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span className="font-medium">Leads IA</span>
            </div>
            <span className="bg-teal-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
          </a>
          <a href="/operacion/llegadas" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800/50 rounded-xl transition-colors">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Llegadas y Cobros</span>
          </a>
        </nav>
        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col w-full">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center hidden md:flex">
          <h2 className="text-xl font-semibold text-slate-800">Recepción San Pedro</h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
              NC
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
