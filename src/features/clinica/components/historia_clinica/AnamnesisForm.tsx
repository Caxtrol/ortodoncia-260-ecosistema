import React from 'react';
import { Activity, Heart, AlertTriangle, Users, Stethoscope } from 'lucide-react';

export default function AnamnesisForm() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Alertas Médicas (Siempre visible arriba) */}
      <section className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
        <h4 className="flex items-center gap-2 font-bold text-rose-700 mb-4">
          <AlertTriangle className="w-5 h-5" /> Alertas Médicas y Alergias
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-rose-800">Alergias a Medicamentos / Anestésicos</label>
            <input type="text" placeholder="Ej. Penicilina, Látex..." className="w-full bg-white border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none text-rose-700 font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-rose-800">Condiciones de Alto Riesgo</label>
            <input type="text" placeholder="Ej. Hipertensión no controlada, Cardiopatía..." className="w-full bg-white border border-rose-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none text-rose-700 font-medium" />
          </div>
        </div>
      </section>

      {/* Antecedentes Heredofamiliares */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Users className="w-5 h-5 text-teal-600" /> Antecedentes Patológicos Hereditarios
        </h4>
        <p className="text-sm text-slate-500 mb-4">Padecimientos de familiares en línea directa (Madre, Padre, Hermanos, Abuelos).</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Diabetes', 'Hipertensión', 'Cáncer', 'Cardiopatías', 'Malformaciones', 'Enf. Renales'].map((item) => (
            <label key={item} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500 mt-0.5" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <label className="text-sm font-bold text-slate-700">Especificar parentesco y detalles:</label>
          <textarea placeholder="Ej. Madre con Diabetes Tipo 2..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none h-20" />
        </div>
      </section>

      {/* Antecedentes Personales Patológicos */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Activity className="w-5 h-5 text-teal-600" /> Antecedentes Personales Patológicos
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[
            'Diabetes', 'Hipertensión', 'Cardiopatías', 'Asma', 
            'Epilepsia', 'Hepatitis', 'VIH/SIDA', 'Tiroides',
            'Enf. Renales', 'Hemorragias', 'Tuberculosis', 'Artritis'
          ].map((item) => (
            <label key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </label>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Medicamentos Actuales</label>
            <textarea placeholder="¿Qué medicamentos toma actualmente y dosis?" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none h-24" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Hospitalizaciones / Cirugías Previas</label>
            <textarea placeholder="Motivo y fecha aproximada..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none h-24" />
          </div>
        </div>
      </section>

      {/* Antecedentes Personales No Patológicos */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Heart className="w-5 h-5 text-teal-600" /> Antecedentes Personales No Patológicos (Hábitos)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Tabaquismo</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Seleccionar...</option>
              <option value="no">No fuma</option>
              <option value="ocasional">Ocasional</option>
              <option value="frecuente">Frecuente (Diario)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Alcoholismo</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Seleccionar...</option>
              <option value="no">No consume</option>
              <option value="ocasional">Ocasional (Social)</option>
              <option value="frecuente">Frecuente</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Higiene Bucal</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Cepillado al día...</option>
              <option value="1">1 vez al día</option>
              <option value="2">2 veces al día</option>
              <option value="3">3+ veces al día</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Uso de Hilo Dental</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Seleccionar...</option>
              <option value="no">No usa</option>
              <option value="ocasional">Ocasional</option>
              <option value="diario">Diario</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Enjuague Bucal</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="">Seleccionar...</option>
              <option value="no">No usa</option>
              <option value="ocasional">Ocasional</option>
              <option value="diario">Diario</option>
            </select>
          </div>
        </div>
      </section>

      {/* Interrogatorio por Aparatos y Sistemas */}
      <section>
        <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
          <Stethoscope className="w-5 h-5 text-teal-600" /> Interrogatorio por Aparatos y Sistemas
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Aparato Digestivo</label>
              <input type="text" placeholder="Disfagia, náusea, pirosis..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Aparato Respiratorio</label>
              <input type="text" placeholder="Obstrucción nasal, disnea, tos..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Aparato Cardiovascular</label>
              <input type="text" placeholder="Dolor precordial, taquicardia, mareos..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Sistema Nervioso</label>
              <input type="text" placeholder="Cefalea, parestesia, convulsiones..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
