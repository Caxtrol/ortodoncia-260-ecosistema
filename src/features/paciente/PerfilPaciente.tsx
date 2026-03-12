import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  FileText, 
  LogOut, 
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PerfilPaciente() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto h-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mi Perfil</h1>
      </div>

      {/* TARJETA DE PERFIL PRINCIPAL */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
        <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-inner border-4 border-teal-50">
          RS
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">Roberto Sánchez</h2>
          <p className="text-sm text-slate-500 mt-1">+52 871 000 0004</p>
          <p className="text-sm text-slate-500">roberto.s@email.com</p>
        </div>
        <button className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-600 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* MENÚ DE OPCIONES */}
      <div className="flex flex-col gap-3">
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Datos Personales</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Historial Médico</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Métodos de Pago</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-2">
          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Notificaciones</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-700">Privacidad y Seguridad</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

      </div>

      {/* BOTÓN CERRAR SESIÓN */}
      <div className="mt-auto pt-6">
        <button 
          onClick={handleLogout}
          className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
        <p className="text-center text-xs text-slate-400 mt-4">
          DentaFlow App v1.0.0
        </p>
      </div>

    </div>
  );
}
