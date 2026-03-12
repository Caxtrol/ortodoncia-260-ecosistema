import { useState } from 'react';
import { 
  Users, 
  Stethoscope, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  DollarSign,
  X
} from 'lucide-react';

type EstadoFlujo = 'espera' | 'consultorio' | 'cobro' | 'finalizado';

interface PacienteFlujo {
  id: string;
  nombre: string;
  horaCita: string;
  doctor: string;
  estado: EstadoFlujo;
  minutosEspera?: number;
  tratamiento: string;
  montoCobrar?: number;
}

const MOCK_FLUJO: PacienteFlujo[] = [
  {
    id: '1',
    nombre: 'Ana Silva',
    horaCita: '10:00 AM',
    doctor: 'Dr. Alejandro Ruiz',
    estado: 'espera',
    minutosEspera: 15,
    tratamiento: 'Revisión Ortodoncia',
  },
  {
    id: '2',
    nombre: 'Carlos Mendoza',
    horaCita: '10:30 AM',
    doctor: 'Dra. Elena Torres',
    estado: 'espera',
    minutosEspera: 5,
    tratamiento: 'Limpieza Dental',
  },
  {
    id: '3',
    nombre: 'María González',
    horaCita: '09:30 AM',
    doctor: 'Dr. Alejandro Ruiz',
    estado: 'consultorio',
    tratamiento: 'Implante (Fase 2)',
  },
  {
    id: '4',
    nombre: 'Roberto Sánchez',
    horaCita: '09:00 AM',
    doctor: 'Dra. Elena Torres',
    estado: 'cobro',
    tratamiento: 'Resina Simple',
    montoCobrar: 1200,
  }
];

export default function LlegadasCobros() {
  const [pacientes, setPacientes] = useState<PacienteFlujo[]>(MOCK_FLUJO);
  const [pacienteCobro, setPacienteCobro] = useState<PacienteFlujo | null>(null);
  const [metodoPago, setMetodoPago] = useState<'tarjeta' | 'efectivo' | 'transferencia'>('tarjeta');

  const moverPaciente = (id: string, nuevoEstado: EstadoFlujo) => {
    setPacientes(prev => prev.map(p => {
      if (p.id === id) {
        // Si pasa a cobro, le asignamos un monto mock si no lo tiene
        const monto = nuevoEstado === 'cobro' && !p.montoCobrar ? 800 : p.montoCobrar;
        return { ...p, estado: nuevoEstado, montoCobrar: monto };
      }
      return p;
    }));
  };

  const abrirModalCobro = (paciente: PacienteFlujo) => {
    setPacienteCobro(paciente);
  };

  const procesarPago = () => {
    if (pacienteCobro) {
      moverPaciente(pacienteCobro.id, 'finalizado');
      setPacienteCobro(null);
    }
  };

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);

  // Filtrar por columnas
  const enEspera = pacientes.filter(p => p.estado === 'espera');
  const enConsultorio = pacientes.filter(p => p.estado === 'consultorio');
  const porCobrar = pacientes.filter(p => p.estado === 'cobro');

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Llegadas y Cobros</h1>
          <p className="text-slate-500 text-sm mt-1">Control de flujo de pacientes en clínica</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-bold text-slate-700">{enEspera.length} en espera</span>
          </div>
          <div className="bg-teal-50 px-4 py-2 rounded-xl border border-teal-100 shadow-sm flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-bold text-teal-700">{porCobrar.length} por cobrar</span>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto lg:overflow-hidden pb-4">
        
        {/* COLUMNA 1: Sala de Espera */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
          <div className="p-4 border-b border-slate-200 bg-white flex justify-between items-center shrink-0">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              Sala de Espera
            </h3>
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
              {enEspera.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
            {enEspera.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:border-amber-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{p.nombre}</h4>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 ${
                    (p.minutosEspera || 0) > 10 ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <Clock className="w-3 h-3" /> {p.minutosEspera} min
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{p.tratamiento}</p>
                <p className="text-xs text-slate-400 mb-4">Cita: {p.horaCita} • {p.doctor}</p>
                <button 
                  onClick={() => moverPaciente(p.id, 'consultorio')}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Pasar a Consultorio <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            {enEspera.length === 0 && (
              <div className="text-center text-slate-400 py-8 text-sm">No hay pacientes en espera</div>
            )}
          </div>
        </div>

        {/* COLUMNA 2: En Consultorio */}
        <div className="bg-blue-50/30 rounded-2xl border border-blue-100 flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
          <div className="p-4 border-b border-blue-100 bg-white flex justify-between items-center shrink-0">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-blue-500" />
              En Consultorio
            </h3>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
              {enConsultorio.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
            {enConsultorio.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{p.nombre}</h4>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mt-1.5"></span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{p.tratamiento}</p>
                <p className="text-xs text-slate-400 mb-4">Atendiendo: {p.doctor}</p>
                <button 
                  onClick={() => moverPaciente(p.id, 'cobro')}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Finalizar Consulta <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
            {enConsultorio.length === 0 && (
              <div className="text-center text-slate-400 py-8 text-sm">Consultorios libres</div>
            )}
          </div>
        </div>

        {/* COLUMNA 3: Por Cobrar */}
        <div className="bg-teal-50/30 rounded-2xl border border-teal-100 flex flex-col overflow-hidden min-h-[400px] lg:min-h-0">
          <div className="p-4 border-b border-teal-100 bg-white flex justify-between items-center shrink-0">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-600" />
              Por Cobrar
            </h3>
            <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full">
              {porCobrar.length}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
            {porCobrar.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow-sm border border-teal-200 hover:border-teal-400 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{p.nombre}</h4>
                </div>
                <p className="text-sm text-slate-600 mb-3">{p.tratamiento}</p>
                <div className="bg-slate-50 p-3 rounded-lg mb-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase">Total a pagar</span>
                  <span className="text-lg font-black text-teal-700">{formatCurrency(p.montoCobrar || 0)}</span>
                </div>
                <button 
                  onClick={() => abrirModalCobro(p)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Procesar Pago
                </button>
              </div>
            ))}
            {porCobrar.length === 0 && (
              <div className="text-center text-slate-400 py-8 text-sm">No hay cobros pendientes</div>
            )}
          </div>
        </div>

      </div>

      {/* MODAL DE COBRO */}
      {pacienteCobro && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Procesar Pago</h3>
              <button 
                onClick={() => setPacienteCobro(null)}
                className="w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-slate-500 mb-1">Paciente</p>
                <p className="text-lg font-bold text-slate-800">{pacienteCobro.nombre}</p>
                <p className="text-sm text-slate-500 mt-1">{pacienteCobro.tratamiento}</p>
              </div>

              <div className="bg-teal-50 rounded-2xl p-6 text-center mb-6 border border-teal-100">
                <p className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">Total a Cobrar</p>
                <p className="text-4xl font-black text-teal-700">{formatCurrency(pacienteCobro.montoCobrar || 0)}</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm font-bold text-slate-700">Método de Pago</p>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setMetodoPago('tarjeta')}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      metodoPago === 'tarjeta' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Tarjeta
                  </button>
                  <button 
                    onClick={() => setMetodoPago('efectivo')}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      metodoPago === 'efectivo' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Efectivo
                  </button>
                  <button 
                    onClick={() => setMetodoPago('transferencia')}
                    className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                      metodoPago === 'transferencia' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    Transf.
                  </button>
                </div>
              </div>

              <button 
                onClick={procesarPago}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg shadow-md"
              >
                <CheckCircle2 className="w-5 h-5" />
                Confirmar Pago
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
