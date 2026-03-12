import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  CalendarPlus, 
  ChevronRight,
  AlertCircle
} from 'lucide-react';

// Mock Data
const CITAS_FUTURAS = [
  {
    id: 'c1',
    fecha: '15 de Abril, 2026',
    dia: '15',
    mes: 'Abr',
    hora: '10:30 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Revisión Ortodoncia (Mes 4)',
    estado: 'confirmada' // confirmada, pendiente
  },
  {
    id: 'c2',
    fecha: '12 de Mayo, 2026',
    dia: '12',
    mes: 'May',
    hora: '11:00 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Revisión Ortodoncia (Mes 5)',
    estado: 'pendiente'
  }
];

const CITAS_PASADAS = [
  {
    id: 'h1',
    fecha: '10 de Marzo, 2026',
    dia: '10',
    mes: 'Mar',
    hora: '09:00 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Revisión Ortodoncia (Mes 3)',
    estado: 'completada'
  },
  {
    id: 'h2',
    fecha: '15 de Febrero, 2026',
    dia: '15',
    mes: 'Feb',
    hora: '16:30 PM',
    doctor: 'Dra. Elena Torres',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Limpieza Dental Profunda',
    estado: 'completada'
  },
  {
    id: 'h3',
    fecha: '20 de Enero, 2026',
    dia: '20',
    mes: 'Ene',
    hora: '10:00 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Instalación de Alineadores',
    estado: 'completada'
  },
  {
    id: 'h4',
    fecha: '15 de Enero, 2026',
    dia: '15',
    mes: 'Ene',
    hora: '11:00 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
    tratamiento: 'Escaneo 3D Inicial',
    estado: 'cancelada'
  }
];

type TabType = 'proximas' | 'historial';

export default function MisCitas() {
  const [activeTab, setActiveTab] = useState<TabType>('proximas');

  return (
    <div className="max-w-md mx-auto h-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis Citas</h1>
        <p className="text-slate-500 text-sm mt-1">Gestiona tus visitas a la clínica</p>
      </div>

      {/* TABS */}
      <div className="bg-slate-100 p-1 rounded-2xl flex">
        <button 
          onClick={() => setActiveTab('proximas')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'proximas' 
              ? 'bg-white text-teal-700 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Próximas
        </button>
        <button 
          onClick={() => setActiveTab('historial')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'historial' 
              ? 'bg-white text-teal-700 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Historial
        </button>
      </div>

      {/* CONTENIDO: PRÓXIMAS CITAS */}
      {activeTab === 'proximas' && (
        <div className="flex flex-col gap-4">
          
          {/* Botón Nueva Cita */}
          <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-teal-900/10 active:scale-[0.98]">
            <CalendarPlus className="w-5 h-5" />
            Agendar Nueva Cita
          </button>

          {CITAS_FUTURAS.map((cita, index) => (
            <div key={cita.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative overflow-hidden">
              {/* Indicador visual de la primera cita (la más próxima) */}
              {index === 0 && (
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                  cita.estado === 'confirmada' ? 'bg-teal-50 text-teal-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {cita.estado === 'confirmada' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {cita.estado === 'confirmada' ? 'Confirmada' : 'Por Confirmar'}
                </span>
                
                {/* Botón Agregar a Calendario */}
                <button className="text-slate-400 hover:text-teal-600 transition-colors bg-slate-50 p-2 rounded-full">
                  <CalendarPlus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center border shrink-0 ${
                  index === 0 ? 'bg-teal-50 border-teal-100 text-teal-700' : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}>
                  <span className="text-xs font-bold uppercase">{cita.mes}</span>
                  <span className="text-xl font-black leading-none mt-0.5">{cita.dia}</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{cita.tratamiento}</h3>
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {cita.hora}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {cita.sucursal}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex gap-3">
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-sm">
                  Reprogramar
                </button>
                <button className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2.5 rounded-xl transition-colors text-sm">
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENIDO: HISTORIAL */}
      {activeTab === 'historial' && (
        <div className="flex flex-col gap-3">
          {CITAS_PASADAS.map((cita) => (
            <div key={cita.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
              
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 shrink-0 text-slate-500">
                <span className="text-[10px] font-bold uppercase">{cita.mes}</span>
                <span className="text-lg font-black leading-none">{cita.dia}</span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm truncate">{cita.tratamiento}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{cita.doctor}</p>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-1">
                {cita.estado === 'completada' ? (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3" /> Completada
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md uppercase tracking-wider">
                    <XCircle className="w-3 h-3" /> Cancelada
                  </span>
                )}
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {cita.hora}
                </span>
              </div>
              
            </div>
          ))}

          <div className="mt-4 text-center">
            <button className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center justify-center gap-1 mx-auto">
              Cargar más historial <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
