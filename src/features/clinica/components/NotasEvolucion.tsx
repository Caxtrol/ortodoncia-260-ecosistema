import { useState } from 'react';
import { Mic, Send, Clock, User, FileText, CheckCircle2 } from 'lucide-react';

// Mock Data para las notas
const MOCK_NOTAS = [
  {
    id: 'n1',
    fecha: '2026-03-12T10:30:00Z',
    doctor: 'Dr. Alejandro Ruiz',
    texto: 'Paciente acude a consulta inicial. Se observa apiñamiento severo en arcada inferior y leve en superior. Clase II molar bilateral. Se toman modelos de estudio y fotografías iniciales. Se solicita radiografía panorámica y lateral de cráneo para plan de tratamiento definitivo.',
    tipo: 'Consulta Inicial',
  },
  {
    id: 'n2',
    fecha: '2026-02-15T11:00:00Z',
    doctor: 'Dra. Cinthia Castro',
    texto: 'Valoración de urgencia por dolor en OD 46. Se detecta caries profunda. Se remite a endodoncia antes de iniciar tratamiento de ortodoncia.',
    tipo: 'Urgencia',
  }
];

export default function NotasEvolucion() {
  const [notas, setNotas] = useState(MOCK_NOTAS);
  const [nuevaNota, setNuevaNota] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    
    const newNotaObj = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      doctor: 'Dr. Alejandro Ruiz', // Asumiendo el doctor actual
      texto: nuevaNota,
      tipo: 'Nota de Evolución',
    };

    setNotas([newNotaObj, ...notas]);
    setNuevaNota('');
  };

  const formatFecha = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('es-MX', { 
      day: '2-digit', month: 'short', year: 'numeric', 
      hour: '2-digit', minute: '2-digit', hour12: true 
    }).format(date);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      
      {/* Columna Izquierda: Redacción de Nueva Nota */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Nueva Nota Clínica
          </h3>
          
          <div className="flex-1 relative flex flex-col">
            <textarea
              value={nuevaNota}
              onChange={(e) => setNuevaNota(e.target.value)}
              placeholder="Escribe la evolución del paciente aquí..."
              className="w-full flex-1 min-h-[200px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none text-slate-700 leading-relaxed"
            />
            
            {/* Botón de Dictado por Voz (Cero Fricción) */}
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`absolute bottom-4 right-4 p-3 rounded-full shadow-md transition-all ${
                isRecording 
                  ? 'bg-rose-500 text-white animate-pulse hover:bg-rose-600' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
              title="Dictado por voz (IA)"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {isRecording && (
            <div className="mt-3 text-sm text-rose-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              Escuchando... (La IA transcribirá y estructurará la nota)
            </div>
          )}

          <button 
            onClick={handleAgregarNota}
            disabled={!nuevaNota.trim()}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
            Guardar Nota
          </button>
        </div>
      </div>

      {/* Columna Derecha: Historial (Timeline) */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-y-auto">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-400" />
          Historial de Evolución
        </h3>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {notas.map((nota, index) => (
            <div key={nota.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icono del Timeline */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-teal-100 text-teal-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              
              {/* Tarjeta de la Nota */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-100/50 px-2 py-1 rounded-md">
                    {nota.tipo}
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    {formatFecha(nota.fecha)}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  {nota.texto}
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 border-t border-slate-200 pt-3">
                  <User className="w-4 h-4" />
                  {nota.doctor}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
