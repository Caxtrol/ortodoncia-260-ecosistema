import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, CheckCircle2, CreditCard, User, AlertCircle } from 'lucide-react';
import { Database } from '../../types/database';

type Cita = Database['public']['Tables']['citas']['Row'] & {
  paciente_nombre: string;
  paciente_telefono: string;
  doctor_nombre: string;
};

// Datos Mockeados basados en el esquema
const MOCK_CITAS: Cita[] = [
  {
    id: 'c1',
    paciente_id: 'p1',
    paciente_nombre: 'María González Pérez',
    paciente_telefono: '8711234567',
    sucursal: 'san_pedro',
    doctor_id: 'd1',
    doctor_nombre: 'Dra. Cinthia Castro',
    fecha_hora: '2026-03-12T09:00:00Z',
    duracion_minutos: 45,
    tipo_tratamiento: 'Ajuste Brackets',
    estado: 'confirmada',
    confirmada_por: 'paciente_whatsapp',
    llegada_registrada_at: null,
    notificacion_doctor_at: null,
    instruccion_cobro: null,
    cobro_total: null,
    metodo_pago: null,
    cuidados_post_enviados: false,
    resena_solicitada: false,
    notas_clinicas: null,
    cancelacion_motivo: null,
    cancelacion_horas_anticipacion: null,
    created_at: '2026-03-01T10:00:00Z',
  },
  {
    id: 'c2',
    paciente_id: 'p2',
    paciente_nombre: 'Don Roberto Sánchez',
    paciente_telefono: '8719876543',
    sucursal: 'torreon',
    doctor_id: 'd2',
    doctor_nombre: 'Dr. Alejandro Ruiz',
    fecha_hora: '2026-03-12T10:00:00Z',
    duracion_minutos: 60,
    tipo_tratamiento: 'Consulta Inicial',
    estado: 'programada',
    confirmada_por: null,
    llegada_registrada_at: '2026-03-12T09:50:00Z', // Ya llegó
    notificacion_doctor_at: '2026-03-12T09:50:05Z',
    instruccion_cobro: null,
    cobro_total: null,
    metodo_pago: null,
    cuidados_post_enviados: false,
    resena_solicitada: false,
    notas_clinicas: null,
    cancelacion_motivo: null,
    cancelacion_horas_anticipacion: null,
    created_at: '2026-03-05T10:00:00Z',
  },
  {
    id: 'c3',
    paciente_id: 'p3',
    paciente_nombre: 'Ana Sofía Ruiz',
    paciente_telefono: '8713332211',
    sucursal: 'san_pedro',
    doctor_id: 'd1',
    doctor_nombre: 'Dra. Cinthia Castro',
    fecha_hora: '2026-03-12T11:30:00Z',
    duracion_minutos: 30,
    tipo_tratamiento: 'Retiro de Brackets',
    estado: 'en_curso',
    confirmada_por: 'norma_llamada',
    llegada_registrada_at: '2026-03-12T11:20:00Z',
    notificacion_doctor_at: '2026-03-12T11:20:00Z',
    instruccion_cobro: { tratamientos: ['Retiro Brackets', 'Retenedores'], total: 3500 }, // Doctor ya mandó cobrar
    cobro_total: null,
    metodo_pago: null,
    cuidados_post_enviados: false,
    resena_solicitada: false,
    notas_clinicas: null,
    cancelacion_motivo: null,
    cancelacion_horas_anticipacion: null,
    created_at: '2026-03-08T10:00:00Z',
  }
];

export default function AgendaUnificada() {
  const [sucursalFiltro, setSucursalFiltro] = useState<'ambas' | 'san_pedro' | 'torreon'>('ambas');
  const [citas, setCitas] = useState<Cita[]>(MOCK_CITAS);

  // Filtrar citas por sucursal
  const citasFiltradas = citas.filter(c => 
    sucursalFiltro === 'ambas' ? true : c.sucursal === sucursalFiltro
  ).sort((a, b) => new Date(a.fecha_hora).getTime() - new Date(b.fecha_hora).getTime());

  // Acción: Registrar Llegada (1 Toque)
  const registrarLlegada = (id: string) => {
    setCitas(citas.map(c => 
      c.id === id 
        ? { ...c, llegada_registrada_at: new Date().toISOString(), notificacion_doctor_at: new Date().toISOString() } 
        : c
    ));
    // Aquí iría la llamada a Supabase y la notificación Push al Doctor
  };

  // Helper para formatear hora
  const formatHora = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header & Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Agenda Unificada</h1>
          <div className="flex items-center gap-2 text-slate-500 mt-1">
            <CalendarIcon className="w-4 h-4" />
            <span className="font-medium">Jueves, 12 de Marzo 2026</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Selector de Sucursal */}
          <div className="bg-slate-200/50 p-1 rounded-xl flex items-center overflow-x-auto hide-scrollbar max-w-full">
            <button 
              onClick={() => setSucursalFiltro('ambas')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${sucursalFiltro === 'ambas' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Ambas
            </button>
            <button 
              onClick={() => setSucursalFiltro('san_pedro')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${sucursalFiltro === 'san_pedro' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              San Pedro
            </button>
            <button 
              onClick={() => setSucursalFiltro('torreon')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${sucursalFiltro === 'torreon' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Torreón
            </button>
          </div>

          {/* Navegación de Días */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 shadow-sm shrink-0">
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-2 font-medium text-slate-700 text-sm">Hoy</span>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline de Citas */}
      <div className="flex-1 overflow-y-auto pr-2 md:pr-4 space-y-4 pb-10">
        {citasFiltradas.map((cita) => {
          // Determinar el estado visual
          const isCobroPendiente = cita.instruccion_cobro !== null && cita.estado !== 'completada';
          const isEnSala = cita.llegada_registrada_at !== null && cita.estado !== 'en_curso' && cita.estado !== 'completada';
          const isEnSillon = cita.estado === 'en_curso' && !isCobroPendiente;
          
          return (
            <div 
              key={cita.id} 
              className={`bg-white rounded-2xl p-4 md:p-5 shadow-sm border-l-4 transition-all hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6 ${
                isCobroPendiente ? 'border-l-purple-500' :
                isEnSillon ? 'border-l-emerald-500' :
                isEnSala ? 'border-l-amber-500' :
                cita.estado === 'confirmada' ? 'border-l-blue-500' :
                'border-l-slate-300'
              }`}
            >
              {/* Info Principal */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full md:flex-1">
                {/* Hora */}
                <div className="text-left sm:text-center min-w-[80px] flex sm:block items-center gap-2">
                  <p className="text-xl font-bold text-slate-800">{formatHora(cita.fecha_hora)}</p>
                  <p className="text-xs font-medium text-slate-400 sm:mt-0.5">{cita.duracion_minutos} min</p>
                </div>

                {/* Separador */}
                <div className="hidden sm:block w-px h-12 bg-slate-100"></div>

                {/* Detalles Paciente y Tratamiento */}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-800">{cita.paciente_nombre}</h3>
                    {cita.estado === 'confirmada' && (
                      <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-100">
                        Confirmada
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-none">{cita.tipo_tratamiento}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[150px] sm:max-w-none">{cita.doctor_nombre}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="capitalize truncate">{cita.sucursal.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Acciones (Cero Fricción) */}
              <div className="flex items-center gap-3 w-full md:w-auto md:min-w-[200px] justify-end mt-2 md:mt-0">
                
                {/* Caso 1: Paciente no ha llegado */}
                {!cita.llegada_registrada_at && (
                  <button 
                    onClick={() => registrarLlegada(cita.id)}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-sm w-full justify-center"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Registrar Llegada
                  </button>
                )}

                {/* Caso 2: Paciente en Sala de Espera */}
                {isEnSala && (
                  <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-3 rounded-xl font-medium border border-amber-200 w-full justify-center">
                    <Clock className="w-5 h-5" />
                    En Sala de Espera
                  </div>
                )}

                {/* Caso 3: Paciente en Sillón */}
                {isEnSillon && (
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-3 rounded-xl font-medium border border-emerald-200 w-full justify-center">
                    <User className="w-5 h-5" />
                    En Sillón
                  </div>
                )}

                {/* Caso 4: Doctor mandó a cobrar */}
                {isCobroPendiente && (
                  <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-medium transition-colors shadow-sm w-full justify-center animate-pulse">
                    <CreditCard className="w-5 h-5" />
                    Cobrar ${(cita.instruccion_cobro as any).total}
                  </button>
                )}

              </div>
            </div>
          );
        })}

        {citasFiltradas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <CalendarIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-700">No hay citas programadas</h3>
            <p className="text-slate-500 mt-1">Selecciona otra fecha o sucursal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
