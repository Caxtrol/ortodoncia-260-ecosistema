import React from 'react';
import { User, Eye, Smile, Activity } from 'lucide-react';

export default function ExploracionFisicaForm() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Signos Vitales */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Activity className="w-5 h-5 text-teal-600" /> Signos Vitales y Somatometría
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Peso (kg)</label>
            <input type="number" step="0.1" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Talla (m)</label>
            <input type="number" step="0.01" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Tensión Arterial</label>
            <input type="text" placeholder="120/80" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Frecuencia Cardiaca</label>
            <input type="number" placeholder="lpm" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Frecuencia Respiratoria</label>
            <input type="number" placeholder="rpm" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Temperatura (°C)</label>
            <input type="number" step="0.1" placeholder="36.5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </section>

      {/* Exploración de Cabeza y Cuello */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <User className="w-5 h-5 text-teal-600" /> Exploración de Cabeza y Cuello
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Cráneo</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="normocefalo">Normocéfalo</option>
                <option value="dolicocefalo">Dolicocéfalo</option>
                <option value="braquicefalo">Braquicéfalo</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Perfil Facial</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="recto">Recto</option>
                <option value="concavo">Cóncavo</option>
                <option value="convexo">Convexo</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Cuello (Ganglios)</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="ganglios" value="normal" className="text-teal-600 focus:ring-teal-500" defaultChecked />
                  <span className="text-sm text-slate-700">Normal (No palpables)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="ganglios" value="inflamados" className="text-teal-600 focus:ring-teal-500" />
                  <span className="text-sm text-slate-700">Palpables / Inflamados</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Asimetrías Faciales</label>
              <input type="text" placeholder="Describir si existen asimetrías..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Exploración del Aparato Estomatognático */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Smile className="w-5 h-5 text-teal-600" /> Exploración del Aparato Estomatognático
        </h4>
        
        <div className="space-y-6">
          {/* ATM */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h5 className="font-bold text-slate-700 mb-3">Articulación Temporomandibular (ATM)</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                <span className="text-sm text-slate-700">Ruidos / Chasquidos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                <span className="text-sm text-slate-700">Crepitación</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                <span className="text-sm text-slate-700">Dolor a la apertura</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                <span className="text-sm text-slate-700">Desviación al abrir</span>
              </label>
            </div>
          </div>

          {/* Tejidos Blandos */}
          <div className="space-y-3">
            <h5 className="font-bold text-slate-700">Tejidos Blandos</h5>
            <p className="text-xs text-slate-500">Marque si existe alguna alteración y descríbala (lesión elemental, tamaño, color, etc.)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Labios', 'Carrillos', 'Paladar Duro', 'Paladar Blando', 
                'Lengua', 'Piso de la boca', 'Encía', 'Frenillos'
              ].map((tejido) => (
                <div key={tejido} className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-600">{tejido}</label>
                  <input type="text" placeholder="Sin alteraciones aparentes" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
