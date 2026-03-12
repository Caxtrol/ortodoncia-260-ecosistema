import { useState } from 'react';
import { Shield, AlertCircle, X, Plus, CheckCircle2, Activity } from 'lucide-react';

// Tipos de condiciones dentales
type CondicionDental = 'sano' | 'caries' | 'extraccion' | 'implante' | 'corona' | 'endodoncia';

interface DienteEstado {
  id: number;
  condicion: CondicionDental;
  notas?: string;
}

// Numeración FDI (Federación Dental Internacional)
const CUADRANTE_1 = [18, 17, 16, 15, 14, 13, 12, 11]; // Superior Derecho
const CUADRANTE_2 = [21, 22, 23, 24, 25, 26, 27, 28]; // Superior Izquierdo
const CUADRANTE_4 = [48, 47, 46, 45, 44, 43, 42, 41]; // Inferior Derecho
const CUADRANTE_3 = [31, 32, 33, 34, 35, 36, 37, 38]; // Inferior Izquierdo

// Mock inicial de estado de los dientes
const ESTADO_INICIAL: Record<number, DienteEstado> = {
  18: { id: 18, condicion: 'extraccion' },
  28: { id: 28, condicion: 'extraccion' },
  38: { id: 38, condicion: 'extraccion' },
  48: { id: 48, condicion: 'extraccion' },
  14: { id: 14, condicion: 'caries' },
  21: { id: 21, condicion: 'corona' },
  46: { id: 46, condicion: 'implante' },
};

const CONDICIONES_CONFIG: Record<CondicionDental, { label: string, color: string, bg: string, border: string }> = {
  sano: { label: 'Sano', color: 'text-slate-400', bg: 'bg-white', border: 'border-slate-200' },
  caries: { label: 'Caries', color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-300' },
  extraccion: { label: 'Extracción', color: 'text-slate-400', bg: 'bg-slate-100', border: 'border-slate-300' },
  implante: { label: 'Implante', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-300' },
  corona: { label: 'Corona', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-300' },
  endodoncia: { label: 'Endodoncia', color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-300' },
};

export default function Odontograma() {
  const [dientes, setDientes] = useState<Record<number, DienteEstado>>(ESTADO_INICIAL);
  const [dienteSeleccionado, setDienteSeleccionado] = useState<number | null>(null);

  const handleSeleccionarDiente = (id: number) => {
    setDienteSeleccionado(id);
  };

  const handleCambiarCondicion = (condicion: CondicionDental) => {
    if (!dienteSeleccionado) return;
    
    setDientes(prev => ({
      ...prev,
      [dienteSeleccionado]: { id: dienteSeleccionado, condicion }
    }));
    setDienteSeleccionado(null);
  };

  // Componente visual para un solo diente
  const DienteUI = ({ id }: { id: number }) => {
    const estado = dientes[id] || { id, condicion: 'sano' };
    const config = CONDICIONES_CONFIG[estado.condicion];
    const isSelected = dienteSeleccionado === id;

    return (
      <div className="flex flex-col items-center gap-2">
        <span className={`text-xs font-bold ${isSelected ? 'text-teal-600' : 'text-slate-500'}`}>{id}</span>
        <button
          onClick={() => handleSeleccionarDiente(id)}
          className={`relative w-10 h-14 rounded-t-md rounded-b-2xl border-2 transition-all duration-200 flex items-center justify-center
            ${config.bg} ${isSelected ? 'border-teal-500 shadow-[0_0_0_4px_rgba(20,184,166,0.2)] scale-110 z-10' : config.border}
            hover:border-teal-400 hover:shadow-md
          `}
          title={`Diente ${id} - ${config.label}`}
        >
          {/* Representación visual según condición */}
          {estado.condicion === 'extraccion' && <X className="w-6 h-6 text-slate-400 absolute" strokeWidth={3} />}
          {estado.condicion === 'caries' && <div className="w-3 h-3 rounded-full bg-rose-500 absolute top-3"></div>}
          {estado.condicion === 'implante' && <div className="w-2 h-8 bg-teal-400 absolute rounded-sm"></div>}
          {estado.condicion === 'corona' && <div className="w-full h-1/2 bg-amber-200 absolute top-0 rounded-t-sm opacity-50"></div>}
          {estado.condicion === 'endodoncia' && <div className="w-1 h-8 bg-purple-400 absolute rounded-full"></div>}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      
      {/* Columna Izquierda: El Odontograma Visual */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center overflow-x-auto">
        
        <div className="mb-6 w-full flex justify-between items-center max-w-3xl">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-600" />
            Odontograma Interactivo
          </h3>
          <div className="flex gap-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div> Caries</span>
            <span className="flex items-center gap-1"><X className="w-4 h-4 text-slate-400" /> Extracción</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded-sm bg-teal-400"></div> Implante</span>
          </div>
        </div>

        <div className="flex flex-col gap-12 min-w-[600px] p-4">
          {/* Maxilar Superior */}
          <div className="flex justify-center gap-8 relative">
            {/* Línea divisoria central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>
            
            {/* Cuadrante 1 (18-11) */}
            <div className="flex gap-2">
              {CUADRANTE_1.map(id => <div key={id}><DienteUI id={id} /></div>)}
            </div>
            {/* Cuadrante 2 (21-28) */}
            <div className="flex gap-2">
              {CUADRANTE_2.map(id => <div key={id}><DienteUI id={id} /></div>)}
            </div>
          </div>

          {/* Maxilar Inferior */}
          <div className="flex justify-center gap-8 relative">
            {/* Línea divisoria central */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>
            
            {/* Cuadrante 4 (48-41) */}
            <div className="flex gap-2">
              {CUADRANTE_4.map(id => <div key={id}><DienteUI id={id} /></div>)}
            </div>
            {/* Cuadrante 3 (31-38) */}
            <div className="flex gap-2">
              {CUADRANTE_3.map(id => <div key={id}><DienteUI id={id} /></div>)}
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha: Panel de Edición */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-1">
          
          {dienteSeleccionado ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">
                  Pieza Dental <span className="text-teal-600">#{dienteSeleccionado}</span>
                </h3>
                <button 
                  onClick={() => setDienteSeleccionado(null)}
                  className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Actualizar Diagnóstico</p>
              
              <div className="grid grid-cols-2 gap-3">
                {(Object.entries(CONDICIONES_CONFIG) as [CondicionDental, any][]).map(([key, config]) => {
                  const isActive = (dientes[dienteSeleccionado]?.condicion || 'sano') === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleCambiarCondicion(key)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        isActive 
                          ? `border-teal-500 bg-teal-50 shadow-sm` 
                          : `border-slate-100 hover:border-slate-300 bg-white`
                      }`}
                    >
                      <span className={`font-bold ${isActive ? 'text-teal-700' : 'text-slate-600'}`}>
                        {config.label}
                      </span>
                      {isActive && <CheckCircle2 className="w-5 h-5 text-teal-500" />}
                    </button>
                  );
                })}
              </div>

              <div className="mt-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Notas específicas de la pieza</label>
                <textarea 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none resize-none h-24 text-sm"
                  placeholder="Ej. Sensibilidad al frío, requiere resina en cara oclusal..."
                ></textarea>
                <button className="mt-3 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-colors">
                  Guardar Notas
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 p-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                <Shield className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-700">Selecciona una pieza</h3>
              <p className="text-sm mt-2">Haz clic en cualquier diente del odontograma para actualizar su diagnóstico o agregar notas clínicas.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
