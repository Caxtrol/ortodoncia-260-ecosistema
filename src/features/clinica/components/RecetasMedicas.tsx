import { useState } from 'react';
import { Pill, Plus, Printer, Send, FileText, Search } from 'lucide-react';

const RECETAS_PREVIAS = [
  { id: 'r1', fecha: '15 Feb 2026', doctor: 'Dra. Cinthia Castro', diagnostico: 'Extracción OD 46' },
  { id: 'r2', fecha: '10 Ene 2026', doctor: 'Dr. Alejandro Ruiz', diagnostico: 'Infección Periapical OD 21' },
];

export default function RecetasMedicas() {
  const [medicamentos, setMedicamentos] = useState([
    { id: 1, nombre: 'Ketorolaco 10mg', dosis: '1 tableta cada 8 horas', duracion: '3 días', notas: 'En caso de dolor' }
  ]);

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-hidden">
      
      {/* Columna Izquierda: Nueva Receta */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Pill className="w-5 h-5 text-teal-600" />
            Nueva Receta Médica
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            
            {/* Diagnóstico */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Diagnóstico / Motivo de Prescripción</label>
              <input type="text" placeholder="Ej. Post-operatorio extracción tercer molar" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>

            {/* Buscador de Medicamentos */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input type="text" placeholder="Buscar medicamento en el vademécum..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none shadow-sm" />
            </div>

            {/* Lista de Medicamentos Agregados */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">Medicamentos Prescritos</h4>
              
              {medicamentos.map((med) => (
                <div key={med.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 relative group">
                  <button className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Eliminar
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Medicamento</label>
                      <input type="text" defaultValue={med.nombre} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none font-bold text-slate-800" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Dosis y Frecuencia</label>
                      <input type="text" defaultValue={med.dosis} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Duración</label>
                      <input type="text" defaultValue={med.duracion} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Indicaciones Adicionales</label>
                      <input type="text" defaultValue={med.notas} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-50 hover:border-teal-300 hover:text-teal-600 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Agregar otro medicamento
              </button>
            </div>

          </div>
        </div>

        {/* Acciones */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Printer className="w-4 h-4" /> Imprimir
          </button>
          <button className="px-6 py-2.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors flex items-center gap-2 shadow-sm">
            <Send className="w-4 h-4" /> Enviar por WhatsApp
          </button>
        </div>
      </div>

      {/* Columna Derecha: Historial de Recetas */}
      <div className="lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Recetas Anteriores</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-3">
            {RECETAS_PREVIAS.map((receta) => (
              <div key={receta.id} className="p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:bg-teal-50/30 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-slate-400">{receta.fecha}</span>
                  <Printer className="w-4 h-4 text-slate-300 group-hover:text-teal-600" />
                </div>
                <h4 className="font-bold text-slate-700 text-sm mb-1">{receta.diagnostico}</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> {receta.doctor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
