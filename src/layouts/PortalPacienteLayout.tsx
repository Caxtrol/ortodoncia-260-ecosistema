import { Outlet } from 'react-router-dom';
import { Home, Calendar, Award, User } from 'lucide-react';

export default function PortalPacienteLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto shadow-2xl relative">
      {/* Mobile Header */}
      <header className="bg-white px-6 py-5 rounded-b-3xl shadow-sm z-10 relative">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-slate-500 font-medium">Hola, María</p>
            <h1 className="text-2xl font-serif font-bold text-teal-900">Mi Sonrisa</h1>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg border-2 border-white shadow-sm">
            M
          </div>
        </div>
      </header>

      {/* Main Content Area (Scrollable) */}
      <main className="flex-1 overflow-y-auto pb-24 px-6 pt-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-t border-slate-100 absolute bottom-0 w-full px-6 py-4 flex justify-between items-center rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        <a href="/portal/inicio" className="flex flex-col items-center gap-1 text-teal-600">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </a>
        <a href="/portal/citas" className="flex flex-col items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors">
          <Calendar className="w-6 h-6" />
          <span className="text-[10px] font-bold">Citas</span>
        </a>
        <a href="/portal/logros" className="flex flex-col items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors">
          <Award className="w-6 h-6" />
          <span className="text-[10px] font-bold">Puntos</span>
        </a>
        <a href="/portal/perfil" className="flex flex-col items-center gap-1 text-slate-400 hover:text-teal-600 transition-colors">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </a>
      </nav>
    </div>
  );
}
