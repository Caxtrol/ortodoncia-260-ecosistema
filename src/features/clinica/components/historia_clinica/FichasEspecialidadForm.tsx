import React, { useState } from 'react';
import { Stethoscope, Syringe, Activity, Scissors, Layers, FilePlus } from 'lucide-react';

type TipoFicha = 'endodoncia' | 'ortodoncia' | 'periodoncia' | 'cirugia' | 'protesis';

export default function FichasEspecialidadForm() {
  const [fichaActiva, setFichaActiva] = useState<TipoFicha>('endodoncia');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Selector de Ficha */}
      <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200 flex overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setFichaActiva('endodoncia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            fichaActiva === 'endodoncia' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4" /> Endodoncia
        </button>
        <button 
          onClick={() => setFichaActiva('ortodoncia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            fichaActiva === 'ortodoncia' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" /> Ortodoncia
        </button>
        <button 
          onClick={() => setFichaActiva('periodoncia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            fichaActiva === 'periodoncia' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Stethoscope className="w-4 h-4" /> Periodoncia
        </button>
        <button 
          onClick={() => setFichaActiva('cirugia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            fichaActiva === 'cirugia' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Scissors className="w-4 h-4" /> Cirugía Bucal
        </button>
        <button 
          onClick={() => setFichaActiva('protesis')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap text-sm ${
            fichaActiva === 'protesis' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Syringe className="w-4 h-4" /> Prótesis
        </button>
      </div>

      {/* Contenido de la Ficha Seleccionada */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        
        {/* ================= ENDODONCIA ================= */}
        {fichaActiva === 'endodoncia' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ficha Clínica de Endodoncia (Formato 9)</h3>
              <p className="text-sm text-slate-500">Pruebas de sensibilidad, diagnóstico pulpar y conductometría.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Dolor y Estímulo */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Características del Dolor</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Localizado', 'Irradiado', 'Espontáneo', 'Provocado'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mt-6">Estímulo</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Frío', 'Calor', 'Masticación', 'Dulce'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Diagnóstico Pulpar */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Diagnóstico Pulpar</h4>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Seleccionar diagnóstico...</option>
                  <option>Pulpa sana</option>
                  <option>Pulpitis reversible</option>
                  <option>Pulpitis irreversible sintomática</option>
                  <option>Pulpitis irreversible asintomática</option>
                  <option>Necrosis pulpar</option>
                  <option>Diente previamente tratado</option>
                </select>

                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mt-6">Diagnóstico Periapical</h4>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Seleccionar diagnóstico...</option>
                  <option>Tejidos apicales sanos</option>
                  <option>Periodontitis apical sintomática</option>
                  <option>Periodontitis apical asintomática</option>
                  <option>Absceso apical agudo</option>
                  <option>Absceso apical crónico</option>
                </select>
              </div>
            </div>

            {/* Conductometría */}
            <div className="mt-8">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mb-4">Conductometría</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-xs uppercase">
                      <th className="px-4 py-2 font-bold">Conducto</th>
                      <th className="px-4 py-2 font-bold">Longitud Aparente</th>
                      <th className="px-4 py-2 font-bold">Longitud Real</th>
                      <th className="px-4 py-2 font-bold">Referencia</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {['Mesio-Vestibular', 'Mesio-Lingual', 'Distal', 'Palatino'].map(conducto => (
                      <tr key={conducto}>
                        <td className="px-4 py-2 text-sm font-medium text-slate-700">{conducto}</td>
                        <td className="px-4 py-2"><input type="text" className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm" placeholder="mm" /></td>
                        <td className="px-4 py-2"><input type="text" className="w-24 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm" placeholder="mm" /></td>
                        <td className="px-4 py-2"><input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-sm" placeholder="Cúspide..." /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= ORTODONCIA ================= */}
        {fichaActiva === 'ortodoncia' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ficha Clínica de Ortodoncia (Formato 10)</h3>
              <p className="text-sm text-slate-500">Análisis facial, cefalométrico y relaciones maxilomandibulares.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Tipo Facial</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Leptoprosopo (Dolicofacial)</option>
                  <option>Mesoprosopo (Mesofacial)</option>
                  <option>Euriprosopo (Braquifacial)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Perfil Facial</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Recto</option>
                  <option>Cóncavo</option>
                  <option>Convexo</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Relación Molar (Angle)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>Clase I</option>
                  <option>Clase II Div 1</option>
                  <option>Clase II Div 2</option>
                  <option>Clase III</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Análisis de Espacio</h4>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-600 w-24">Overjet (mm):</label>
                  <input type="number" className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-600 w-24">Overbite (mm):</label>
                  <input type="number" className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-600 w-24">Apiñamiento:</label>
                  <select className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm">
                    <option>Leve (1-3mm)</option>
                    <option>Moderado (4-6mm)</option>
                    <option>Severo (&gt;7mm)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Análisis Cefalométrico</h4>
                <textarea 
                  placeholder="Interpretación de trazado (Ricketts, Steiner, etc)..." 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none resize-none h-32"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= PERIODONCIA ================= */}
        {fichaActiva === 'periodoncia' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ficha Clínica de Periodoncia (Formato 8)</h3>
              <p className="text-sm text-slate-500">Índices de higiene, diagnóstico periodontal y movilidad.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Índice de Higiene Bucal</h4>
                <div className="flex items-center gap-4">
                  <input type="number" placeholder="%" className="w-24 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-lg font-bold text-teal-700" />
                  <span className="text-sm text-slate-600">Porcentaje de Placa Actual</span>
                </div>
                
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider mt-6">Diagnóstico Periodontal</h4>
                <div className="space-y-2">
                  {['Gingivitis inducida por placa', 'Periodontitis Crónica Leve', 'Periodontitis Crónica Moderada', 'Periodontitis Crónica Severa'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="radio" name="diag_perio" className="text-teal-600 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Hallazgos Clínicos</h4>
                <div className="grid grid-cols-2 gap-3">
                  {['Sangrado al sondeo', 'Supuración', 'Halitosis', 'Recesión Gingival'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-bold text-slate-700">Grado de Movilidad (Indicar piezas)</label>
                  <input type="text" placeholder="Ej. Grado 2 en OD 31, 41..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Bolsas Periodontales (&gt;4mm)</label>
                  <input type="text" placeholder="Indicar ubicación y profundidad..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CIRUGÍA BUCAL ================= */}
        {fichaActiva === 'cirugia' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ficha Clínica de Cirugía Bucal (Formato 7)</h3>
              <p className="text-sm text-slate-500">Evaluación pre-quirúrgica y plan de tratamiento quirúrgico.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Padecimiento Actual</h4>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tipo de Dolor</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                    <option>Pulsátil</option>
                    <option>Irradiado</option>
                    <option>Espontáneo</option>
                    <option>Localizado</option>
                    <option>Difuso</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <span className="text-sm text-slate-700">Aumento de volumen</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <span className="text-sm text-slate-700">Secreción purulenta</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Plan Quirúrgico</h4>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Bloqueo Anestésico</label>
                  <input type="text" placeholder="Ej. Dentario inferior, infiltrativa..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Tipo de Incisión / Colgajo</label>
                  <input type="text" placeholder="Ej. Newman, Envolvente..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Sutura</label>
                  <input type="text" placeholder="Ej. Seda 3-0, puntos simples..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRÓTESIS ================= */}
        {fichaActiva === 'protesis' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold text-slate-800">Ficha Clínica de Prótesis (Formatos 4, 5 y 6)</h3>
              <p className="text-sm text-slate-500">Evaluación para prótesis fija, removible o total.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Evaluación Clínica</h4>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Dientes Ausentes</label>
                  <input type="text" placeholder="Indicar ODs..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Restauraciones Presentes</label>
                  <input type="text" placeholder="Coronas, amalgamas, resinas..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Estado Periodontal de Pilares</label>
                  <input type="text" placeholder="Movilidad, proporción corona-raíz..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Diseño de la Restauración</h4>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Dientes Pilares</label>
                  <input type="text" placeholder="ODs que servirán de pilar..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Pónticos</label>
                  <input type="text" placeholder="ODs a reemplazar..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Material / Tipo de Prótesis</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                    <option>Metal-Porcelana</option>
                    <option>Zirconia Monolítica</option>
                    <option>Disilicato de Litio</option>
                    <option>Prótesis Parcial Removible (Acrílico)</option>
                    <option>Prótesis Parcial Removible (Metálica)</option>
                    <option>Prótesis Total</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
