import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BarChart3, Users, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function DirectoraGeneralLayout() {
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
      <div className="md:hidden bg-teal-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-serif font-bold tracking-tight">Ortodoncia 260</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Dra. Cinthia */}
      <aside className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-teal-900 text-white flex-col fixed md:sticky top-[68px] md:top-0 h-[calc(100vh-68px)] md:h-screen z-40`}>
        <div className="p-6 hidden md:block">
          <h1 className="text-2xl font-serif font-bold tracking-tight">Ortodoncia 260</h1>
          <p className="text-teal-200 text-sm mt-1">Dirección General</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 md:mt-0">
          <a href="/directora/dashboard" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 bg-teal-800 rounded-xl text-white transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">KPIs y Finanzas</span>
          </a>
          <a href="/directora/equipo" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-teal-100 hover:bg-teal-800/50 rounded-xl transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Logros del Equipo</span>
          </a>
          <a href="/directora/configuracion" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-teal-100 hover:bg-teal-800/50 rounded-xl transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configuración</span>
          </a>
        </nav>
        <div className="p-4 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-teal-100 hover:bg-teal-800/50 rounded-xl transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex justify-between items-center hidden md:flex">
          <h2 className="text-xl font-semibold text-slate-800">Panel Ejecutivo</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold">
              DC
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
