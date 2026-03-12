import { useState } from 'react';
import { Clock, PlayCircle, CheckCircle2, FileText, CreditCard, User, AlertTriangle, X } from 'lucide-react';
import { Database } from '../../types/database';

type Cita = Database['public']['Tables']['citas']['Row'] & {
  paciente_nombre: string;
  paciente_codigo: string;
  notas_especiales: string | null;
};

// Datos Mockeados para el Doctor (Solo sus citas de hoy)
const MOCK_CITAS_HOY: Cita[] = [
  {
    id: 'c2',
    paciente_id: 'p2',
    paciente_nombre: 'Don Roberto Sánchez',
    paciente_codigo: 'O260-00002',
    notas_especiales: 'Hipertenso controlado.',
    sucursal: 'torreon',
    doctor_id: 'd2',
    fecha_hora: '2026-03-12T10:00:00Z',
    duracion_minutos: 60,
    tipo_tratamiento: 'Consulta Inicial',
    estado: 'programada',
    confirmada_por: null,
    llegada_registrada_at: '2026-03-12T09:50:00Z', // EN SALA DE ESPERA
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
    id: 'c4',
    paciente_id: 'p4',
    paciente_nombre: 'Luis Fernando Gómez',
    paciente_codigo: 'O260-00004',
    notas_especiales: null,
    sucursal: 'torreon',
    doctor_id: 'd2',
    fecha_hora: '2026-03-12T12:00:00Z',
    duracion_minutos: 30,
    tipo_tratamiento: 'Ajuste Mensual',
    estado: 'confirmada',
    confirmada_por: 'paciente_whatsapp',
    llegada_registrada_at: null, // AÚN NO LLEGA
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
    id: 'c5',
    paciente_id: 'p5',
    paciente_nombre: 'Carmen Salinas',
    paciente_codigo: 'O260-00005',
    notas_especiales: 'Alergia a látex',
    sucursal: 'torreon',
    doctor_id: 'd2',
    fecha_hora: '2026-03-12T08:00:00Z',
    duracion_minutos: 45,
    tipo_tratamiento: 'Limpieza Dental',
    estado: 'completada', // YA ATENDIDO
    confirmada_por: 'auto',
    llegada_registrada_at: '2026-03-12T07:55:00Z',
    notificacion_doctor_at: '2026-03-12T07:55:00Z',
    instruccion_cobro: { tratamientos: ['Limpieza'], total: 800 },
    cobro_total: 800,
    metodo_pago: 'tarjeta',
    cuidados_post_enviados: true,
    resena_solicitada: true,
    notas_clinicas: 'Limpieza profunda sin complicaciones.',
    cancelacion_motivo: null,
    cancelacion_horas_anticipacion: null,
    created_at: '2026-03-02T10:00:00Z',
  }
];

const TRATAMIENTOS_CATALOGO = [
  { id: 't1', nombre: 'Ajuste de Brackets', precioBase: 800 },
  { id: 't2', nombre: 'Consulta Inicial', precioBase: 500 },
  { id: 't3', nombre: 'Limpieza Dental', precioBase: 800 },
  { id: 't4', nombre: 'Retenedores (Par)', precioBase: 3500 },
  { id: 't5', nombre: 'Resina Simple', precioBase: 900 },
];

export default function PacientesDelDia() {
  const [citas, setCitas] = useState<Cita[]>(MOCK_CITAS_HOY);
  const [citaEnCobro, setCitaEnCobro] = useState<Cita | null>(null);
  
  // Estado para el modal de cobro
  const [tratamientosSeleccionados, setTratamientosSeleccionados] = useState<{nombre: string, precio: number}[]>([]);
  const [precioPersonalizado, setPrecioPersonalizado] = useState<string>('');

  const formatHora = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Acciones
  const pasarAlSillon = (id: string) => {
    setCitas(citas.map(c => c.id === id ? { ...c, estado: 'en_curso' } : c));
  };

  const abrirModalCobro = (cita: Cita) => {
    setCitaEnCobro(cita);
    // Pre-seleccionar el tratamiento de la cita si existe en el catálogo
    const tratBase = TRATAMIENTOS_CATALOGO.find(t => t.nombre === cita.tipo_tratamiento);
    if (tratBase) {
      setTratamientosSeleccionados([{ nombre: tratBase.nombre, precio: tratBase.precioBase }]);
    } else {
      setTratamientosSeleccionados([]);
    }
    setPrecioPersonalizado('');
  };

  const enviarARecepcion = () => {
    if (!citaEnCobro) return;
    
    const total = tratamientosSeleccionados.reduce((sum, t) => sum + t.precio, 0);
    
    setCitas(citas.map(c => 
      c.id === citaEnCobro.id 
        ? { 
            ...c, 
            estado: 'completada', // Para el doctor ya terminó
            instruccion_cobro: { 
              tratamientos: tratamientosSeleccionados.map(t => t.nombre), 
              total 
            } 
          } 
        : c
    ));
    
    setCitaEnCobro(null);
    // Aquí iría la notificación a Norma
  };

  const toggleTratamiento = (trat: {nombre: string, precioBase: number}) => {
    const existe = tratamientosSeleccionados.find(t => t.nombre === trat.nombre);
    if (existe) {
      setTratamientosSeleccionados(tratamientosSeleccionados.filter(t => t.nombre !== trat.nombre));
    } else {
      setTratamientosSeleccionados([...tratamientosSeleccionados, { nombre: trat.nombre, precio: trat.precioBase }]);
    }
  };

  // Agrupaciones
  const enSala = citas.filter(c => c.llegada_registrada_at && c.estado !== 'en_curso' && c.estado !== 'completada');
  const enSillon = citas.find(c => c.estado === 'en_curso');
  const proximos = citas.filter(c => !c.llegada_registrada_at && c.estado !== 'completada');
  const completados = citas.filter(c => c.estado === 'completada');

  return (
    <div className="h-full flex flex-col relative">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Pacientes de Hoy</h1>
        <p className="text-slate-500 mt-1">Gestiona tu flujo de atención y envía instrucciones a recepción.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 items-start">
        
        {/* Columna Izquierda: Flujo Activo */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* 1. EN SILLÓN (Prioridad Máxima) */}
          {enSillon && (
            <div className="bg-emerald-900 rounded-3xl p-1 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              
              <div className="bg-emerald-800/50 backdrop-blur-md rounded-[22px] p-6 relative z-10 border border-emerald-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                  <h2 className="text-emerald-100 font-bold tracking-wide uppercase text-sm">Atendiendo en Sillón</h2>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">{enSillon.paciente_nombre}</h3>
                    <div className="flex items-center gap-4 text-emerald-200 text-sm">
                      <span className="font-mono bg-emerald-950/50 px-2 py-1 rounded-md">{enSillon.paciente_codigo}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {enSillon.tipo_tratamiento}</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shadow-inner">
                    {enSillon.paciente_nombre.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                </div>

                {enSillon.notas_especiales && (
                  <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 mb-8 flex gap-3 text-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-sm">{enSillon.notas_especiales}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-medium transition-colors border border-white/10">
                    <FileText className="w-5 h-5" />
                    Abrir Expediente
                  </button>
                  <button 
                    onClick={() => abrirModalCobro(enSillon)}
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 py-4 rounded-xl font-bold transition-colors shadow-lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    Terminar y Enviar a Cobro
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. EN SALA DE ESPERA */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              En Sala de Espera ({enSala.length})
            </h2>
            
            <div className="space-y-3">
              {enSala.map(cita => (
                <div key={cita.id} className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
                      {formatHora(cita.fecha_hora).split(':')[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{cita.paciente_nombre}</h3>
                      <p className="text-sm text-slate-500">{cita.tipo_tratamiento} • Llevan esperando {Math.floor((new Date().getTime() - new Date(cita.llegada_registrada_at!).getTime()) / 60000)} min</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => pasarAlSillon(cita.id)}
                    disabled={!!enSillon} // Deshabilitar si ya hay alguien en sillón
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl font-medium transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Pasar al Sillón
                  </button>
                </div>
              ))}
              {enSala.length === 0 && (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No hay pacientes en sala de espera.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Columna Derecha: Próximos y Completados */}
        <div className="space-y-8">
          
          {/* PRÓXIMAS CITAS */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              Próximos ({proximos.length})
            </h2>
            <div className="space-y-3">
              {proximos.map(cita => (
                <div key={cita.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 opacity-75">
                  <div className="text-center min-w-[60px]">
                    <p className="font-bold text-slate-700">{formatHora(cita.fecha_hora)}</p>
                  </div>
                  <div className="w-px h-10 bg-slate-100"></div>
                  <div>
                    <h3 className="font-medium text-slate-800">{cita.paciente_nombre}</h3>
                    <p className="text-xs text-slate-500">{cita.tipo_tratamiento}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLETADOS */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Atendidos Hoy ({completados.length})
            </h2>
            <div className="space-y-3">
              {completados.map(cita => (
                <div key={cita.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-slate-700 line-through decoration-slate-300">{cita.paciente_nombre}</h3>
                    <p className="text-xs text-slate-500">Enviado a cobro: ${cita.instruccion_cobro?.total}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE COBRO (Slide-over o Modal Centrado) */}
      {citaEnCobro && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="font-bold text-slate-800 text-lg">Instrucción de Cobro</h2>
                <p className="text-sm text-slate-500">{citaEnCobro.paciente_nombre}</p>
              </div>
              <button onClick={() => setCitaEnCobro(null)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Tratamientos Realizados</h3>
              
              <div className="space-y-2 mb-6">
                {TRATAMIENTOS_CATALOGO.map(trat => {
                  const isSelected = tratamientosSeleccionados.some(t => t.nombre === trat.nombre);
                  return (
                    <label 
                      key={trat.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected ? 'border-teal-500 bg-teal-50' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-teal-500 border-teal-500 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                        <span className={`font-medium ${isSelected ? 'text-teal-900' : 'text-slate-700'}`}>{trat.nombre}</span>
                      </div>
                      <span className="font-mono text-slate-600">${trat.precioBase}</span>
                    </label>
                  );
                })}
              </div>

              {/* Ajuste manual de precio si es necesario */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">Ajuste o Tratamiento Extra (Opcional)</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Concepto..." 
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  <input 
                    type="number" 
                    placeholder="$ 0.00" 
                    className="w-32 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium">Añadir</button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">Total a cobrar:</span>
                <span className="text-3xl font-bold text-slate-800">
                  ${tratamientosSeleccionados.reduce((sum, t) => sum + t.precio, 0).toLocaleString()}
                </span>
              </div>
              <button 
                onClick={enviarARecepcion}
                disabled={tratamientosSeleccionados.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition-colors shadow-sm text-lg"
              >
                <CreditCard className="w-6 h-6" />
                Enviar a Recepción
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">
                Norma recibirá la notificación inmediatamente.
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
