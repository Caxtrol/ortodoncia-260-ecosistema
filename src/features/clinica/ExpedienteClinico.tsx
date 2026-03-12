import { useState } from 'react';
import { AlertTriangle, Activity, Camera, FileText, Calendar as CalendarIcon, Phone, MapPin, Pill, ClipboardList } from 'lucide-react';
import NotasEvolucion from './components/NotasEvolucion';
import Odontograma from './components/Odontograma';
import GaleriaClinica from './components/GaleriaClinica';
import PlanPagos from './components/PlanPagos';
import HistoriaClinica from './components/HistoriaClinica';
import RecetasMedicas from './components/RecetasMedicas';

// Mock del Paciente Activo
const PACIENTE_ACTIVO = {
  id: 'p2',
  nombre: 'Don Roberto Sánchez',
  codigo: 'O260-00002',
  edad: 45,
  telefono: '871 987 6543',
  sucursal: 'Torreón',
  alertasMedicas: ['Hipertenso controlado', 'Alergia a Penicilina'],
  tratamientoActual: 'Ortodoncia Invisible (Alineadores)',
  fase: 'Mes 3 de 12',
};

type TabType = 'historia' | 'historial' | 'odontograma' | 'galeria' | 'plan' | 'recetas';

export default function ExpedienteClinico() {
  const [activeTab, setActiveTab] = useState<TabType>('historial');

  return (
    <div className="h-full flex flex-col gap-6">
      
      {/* HEADER DEL PACIENTE (Sticky/Fijo) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 sm:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6 shrink-0">
        
        {/* Info Principal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 w-full lg:w-auto">
          <div className="w-16 h-16 rounded-2xl bg-teal-900 text-white flex items-center justify-center text-2xl font-bold shadow-inner shrink-0">
            RS
          </div>
          <div className="w-full">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{PACIENTE_ACTIVO.nombre}</h1>
              <span className="font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs sm:text-sm font-medium border border-slate-200">
                {PACIENTE_ACTIVO.codigo}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-500 font-medium">
              <span>{PACIENTE_ACTIVO.edad} años</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 sm:w-4 sm:h-4" /> {PACIENTE_ACTIVO.telefono}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 sm:w-4 sm:h-4" /> {PACIENTE_ACTIVO.sucursal}</span>
            </div>
          </div>
        </div>

        {/* Alertas y Estado */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 w-full lg:w-auto justify-between lg:justify-start">
          {PACIENTE_ACTIVO.alertasMedicas.length > 0 && (
            <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold w-full sm:w-auto justify-center">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="truncate">{PACIENTE_ACTIVO.alertasMedicas.join(' • ')}</span>
            </div>
          )}
          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="text-sm font-bold text-teal-700">{PACIENTE_ACTIVO.tratamientoActual}</p>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{PACIENTE_ACTIVO.fase}</p>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN DE PESTAÑAS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex overflow-x-auto hide-scrollbar shrink-0">
        <button 
          onClick={() => setActiveTab('historia')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'historia' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          Historia Clínica
        </button>
        <button 
          onClick={() => setActiveTab('historial')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'historial' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <FileText className="w-4 h-4" />
          Notas de Evolución
        </button>
        <button 
          onClick={() => setActiveTab('odontograma')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'odontograma' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4" />
          Odontograma 3D
        </button>
        <button 
          onClick={() => setActiveTab('galeria')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'galeria' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <Camera className="w-4 h-4" />
          Galería Clínica
        </button>
        <button 
          onClick={() => setActiveTab('recetas')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'recetas' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <Pill className="w-4 h-4" />
          Recetas
        </button>
        <button 
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            activeTab === 'plan' ? 'bg-teal-50 text-teal-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          <CalendarIcon className="w-4 h-4" />
          Plan y Pagos
        </button>
      </div>

      {/* ÁREA DE CONTENIDO (Renderiza la pestaña activa) */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'historia' && <HistoriaClinica />}
        {activeTab === 'historial' && <NotasEvolucion />}
        {activeTab === 'odontograma' && <Odontograma />}
        {activeTab === 'galeria' && <GaleriaClinica />}
        {activeTab === 'recetas' && <RecetasMedicas />}
        {activeTab === 'plan' && <PlanPagos />}
      </div>

    </div>
  );
}
