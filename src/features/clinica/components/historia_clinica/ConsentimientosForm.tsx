import React, { useState, useRef } from 'react';
import { FileSignature, CheckCircle2, AlertCircle, Printer } from 'lucide-react';

export default function ConsentimientosForm() {
  const [tipoConsentimiento, setTipoConsentimiento] = useState('general');
  const [firmado, setFirmado] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleClearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setFirmado(false);
  };

  const handleSaveSignature = () => {
    setFirmado(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Selector de Consentimiento */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full">
          <label className="text-sm font-bold text-slate-700 block mb-2">Tipo de Consentimiento Informado</label>
          <select 
            value={tipoConsentimiento}
            onChange={(e) => setTipoConsentimiento(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none font-medium text-slate-700"
          >
            <option value="general">Atención Integral Estomatológica (General)</option>
            <option value="cirugia">Cirugía Bucal / Exodoncia</option>
            <option value="endodoncia">Endodoncia</option>
            <option value="ortodoncia">Ortodoncia y Ortopedia Maxilar</option>
            <option value="protesis">Prótesis / Rehabilitación</option>
          </select>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-100 transition-colors shrink-0">
          <Printer className="w-4 h-4" /> Imprimir Formato
        </button>
      </div>

      {/* Documento Legal */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="text-center mb-6 border-b border-slate-100 pb-6">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-wide">Carta de Consentimiento Informado</h3>
          <p className="text-sm text-slate-500 mt-1">Con fundamento en la Ley General de Salud y NOM-004-SSA3-2012</p>
        </div>

        <div className="prose prose-sm max-w-none text-slate-600 space-y-4 text-justify">
          <p>
            Amablemente me informó de manera verbal, libre y sin coerción alguna, en forma clara, sencilla y suficiente, acerca del diagnóstico, el pronóstico y las alternativas de tratamiento para mi padecimiento.
          </p>
          <p>
            Estoy informado(a) que durante la práctica de la estomatología u odontología y sus diversas disciplinas de especialización en ocasiones incluyen riesgos, complicaciones e incluso posibilidad de que se presente una emergencia médico-odontológica; por tanto, como los resultados no se pueden garantizar, acepto afrontar los riesgos por ser mayor el beneficio esperado.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="space-y-1">
              <span className="font-bold text-slate-700">Diagnóstico(s):</span>
              <div className="p-2 bg-slate-50 rounded border border-slate-100 min-h-[40px]">Caries profunda OD 46</div>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-700">Tratamiento(s) por realizar:</span>
              <div className="p-2 bg-slate-50 rounded border border-slate-100 min-h-[40px]">Endodoncia y Corona</div>
            </div>
            <div className="space-y-1 md:col-span-2">
              <span className="font-bold text-slate-700">Riesgos y complicaciones inherentes:</span>
              <div className="p-2 bg-slate-50 rounded border border-slate-100 min-h-[40px]">Dolor post-operatorio, inflamación, posible fractura radicular.</div>
            </div>
          </div>
        </div>

        {/* Área de Firmas */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-teal-600" /> Firmas Digitales
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Firma Paciente */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Firma del Paciente o Tutor</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 relative overflow-hidden">
                {firmado ? (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                    <span className="text-sm font-bold text-emerald-700">Documento Firmado</span>
                    <button onClick={handleClearSignature} className="text-xs text-slate-500 underline mt-2">Volver a firmar</button>
                  </div>
                ) : null}
                <canvas 
                  ref={canvasRef}
                  width={400} 
                  height={150} 
                  className="w-full h-[150px] cursor-crosshair touch-none"
                  onMouseDown={(e) => {
                    const ctx = canvasRef.current?.getContext('2d');
                    if (ctx) {
                      ctx.beginPath();
                      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                    }
                  }}
                  onMouseMove={(e) => {
                    if (e.buttons !== 1) return;
                    const ctx = canvasRef.current?.getContext('2d');
                    if (ctx) {
                      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                      ctx.stroke();
                    }
                  }}
                />
              </div>
              <div className="flex justify-between items-center">
                <button onClick={handleClearSignature} className="text-xs font-medium text-slate-500 hover:text-slate-700">Limpiar panel</button>
                {!firmado && (
                  <button onClick={handleSaveSignature} className="text-xs font-bold bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700">
                    Guardar Firma
                  </button>
                )}
              </div>
            </div>

            {/* Firma Doctor */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700">Firma del Cirujano Dentista</label>
              <div className="border border-slate-200 rounded-xl bg-slate-50 h-[150px] flex flex-col items-center justify-center text-slate-400">
                <FileSignature className="w-8 h-8 mb-2 opacity-50" />
                <span className="text-sm">Firma Digital Registrada</span>
                <span className="text-xs font-mono mt-1 text-slate-500">Céd. Prof. 12345678</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
