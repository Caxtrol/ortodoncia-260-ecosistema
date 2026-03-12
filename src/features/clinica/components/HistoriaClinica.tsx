import React, { useState } from 'react';
import { FileText, Save, User, Activity, FileSignature, Baby, FilePlus } from 'lucide-react';

import AnamnesisForm from './historia_clinica/AnamnesisForm';
import ExploracionFisicaForm from './historia_clinica/ExploracionFisicaForm';
import ConsentimientosForm from './historia_clinica/ConsentimientosForm';
import OdontopediatriaForm from './historia_clinica/OdontopediatriaForm';
import FichasEspecialidadForm from './historia_clinica/FichasEspecialidadForm';

type SeccionHistoria = 'anamnesis' | 'exploracion' | 'fichas' | 'consentimientos' | 'menores';

export default function HistoriaClinica() {
  const [seccionActiva, setSeccionActiva] = useState<SeccionHistoria>('anamnesis');

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      
      {/* Header Fijo */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 shrink-0">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600 shrink-0" />
            <span className="truncate">Historia Clínica (NOM-004-SSA3-2012)</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Expediente Clínico Estomatológico Oficial</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm w-full sm:w-auto">
          <Save className="w-4 h-4 shrink-0" /> Guardar Expediente
        </button>
      </div>

      {/* Sub-Navegación */}
      <div className="flex border-b border-slate-200 bg-white shrink-0 overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setSeccionActiva('anamnesis')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            seccionActiva === 'anamnesis' ? 'border-teal-600 text-teal-700 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <User className="w-4 h-4" /> Anamnesis (Interrogatorio)
        </button>
        <button 
          onClick={() => setSeccionActiva('exploracion')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            seccionActiva === 'exploracion' ? 'border-teal-600 text-teal-700 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" /> Exploración Física
        </button>
        <button 
          onClick={() => setSeccionActiva('fichas')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            seccionActiva === 'fichas' ? 'border-teal-600 text-teal-700 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FilePlus className="w-4 h-4" /> Fichas de Especialidad
        </button>
        <button 
          onClick={() => setSeccionActiva('consentimientos')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            seccionActiva === 'consentimientos' ? 'border-teal-600 text-teal-700 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileSignature className="w-4 h-4" /> Consentimientos Informados
        </button>
        <button 
          onClick={() => setSeccionActiva('menores')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            seccionActiva === 'menores' ? 'border-teal-600 text-teal-700 bg-teal-50/30' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Baby className="w-4 h-4" /> Resumen Clínico Menores
        </button>
      </div>

      {/* Contenido Scrolleable */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
        <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          {seccionActiva === 'anamnesis' && <AnamnesisForm />}
          {seccionActiva === 'exploracion' && <ExploracionFisicaForm />}
          {seccionActiva === 'fichas' && <FichasEspecialidadForm />}
          {seccionActiva === 'consentimientos' && <ConsentimientosForm />}
          {seccionActiva === 'menores' && <OdontopediatriaForm />}
        </div>
      </div>
      
    </div>
  );
}
