import React from 'react';
import { Baby, Info, AlertCircle } from 'lucide-react';

export default function OdontopediatriaForm() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4 items-start">
        <Info className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-indigo-900">Resumen Clínico de Menores</h4>
          <p className="text-sm text-indigo-700 mt-1">
            Este formato deberá ser llenado completamente por el Padre, Madre o Tutor. Conforme a la normativa para pacientes pediátricos.
          </p>
        </div>
      </div>

      {/* Antecedentes del Desarrollo */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Baby className="w-5 h-5 text-teal-600" /> Antecedentes del Desarrollo y Alimentación
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tipo de Parto</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">Seleccionar...</option>
                <option value="natural">Natural</option>
                <option value="cesarea">Cesárea</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Complicaciones al nacer</label>
              <input type="text" placeholder="Prematuro, hipoxia, etc..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Alimentación (Lactancia)</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">Seleccionar...</option>
                <option value="materna">Materna exclusiva</option>
                <option value="formula">Fórmula (Biberón)</option>
                <option value="mixta">Mixta</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tiempo de lactancia / biberón</label>
              <input type="text" placeholder="Ej. Hasta los 2 años" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Hábitos Orales */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <AlertCircle className="w-5 h-5 text-teal-600" /> Hábitos Orales (Pediátricos)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            'Succión del pulgar', 
            'Succión de chupón', 
            'Respirador bucal', 
            'Morderse las uñas (Onicofagia)', 
            'Morder objetos / labios',
            'Bruxismo (rechina dientes)'
          ].map((habito) => (
            <label key={habito} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 mt-0.5" />
              <span className="text-sm font-medium text-slate-700">{habito}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Esquema de Vacunación */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          Esquema de Vacunación
        </h4>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <input type="checkbox" className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
            <div>
              <span className="text-sm font-bold text-slate-800 block">Cuenta con Cartilla de Vacunación Completa</span>
              <span className="text-xs text-slate-500">De acuerdo a su edad.</span>
            </div>
          </label>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">En caso negativo, especifique cuáles faltan:</label>
            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </section>

    </div>
  );
}
