import { useState } from 'react';
import { QrCode, Calendar, Star, ChevronRight, Clock, MapPin, Award, X, Sparkles } from 'lucide-react';

// Mock Data del Paciente Logueado
const PACIENTE = {
  nombre: 'Roberto',
  apellidos: 'Sánchez',
  tratamiento: 'Ortodoncia Invisible',
  faseActual: 3,
  faseTotal: 12,
  puntosSmile: 450,
  proximaCita: {
    fecha: '15 de Abril, 2026',
    hora: '10:30 AM',
    doctor: 'Dr. Alejandro Ruiz',
    sucursal: 'Sucursal Torreón',
  }
};

export default function ResumenTratamiento() {
  const [mostrarQR, setMostrarQR] = useState(false);

  const progresoPorcentaje = (PACIENTE.faseActual / PACIENTE.faseTotal) * 100;

  return (
    <div className="max-w-md mx-auto h-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* Tarjeta de Bienvenida (Estilo Tarjeta de Crédito/Membresía) */}
      <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 text-white shadow-lg shadow-teal-900/20 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-teal-100 text-sm font-medium mb-1">Hola de nuevo,</p>
              <h2 className="text-2xl font-bold">{PACIENTE.nombre} {PACIENTE.apellidos}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
              <span className="text-xl font-bold">RS</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-teal-100 text-xs font-medium uppercase tracking-wider mb-1">Puntos Smile</p>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-3xl font-black tracking-tight">{PACIENTE.puntosSmile}</span>
              </div>
            </div>
            <button className="text-xs font-bold bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-xl backdrop-blur-md border border-white/30">
              Canjear
            </button>
          </div>
        </div>
      </div>

      {/* Botón Principal: Código QR */}
      <button 
        onClick={() => setMostrarQR(true)}
        className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <QrCode className="w-6 h-6 text-teal-400" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg">Mi Código QR</h3>
            <p className="text-slate-400 text-sm">Úsalo para registrar tu llegada en clínica</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-500" />
      </button>

      {/* Próxima Cita */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            Próxima Cita
          </h3>
          <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
            Confirmada
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 shrink-0">
              <span className="text-xs font-bold text-rose-500 uppercase">Abr</span>
              <span className="text-lg font-black text-slate-800 leading-none">15</span>
            </div>
            <div>
              <p className="font-bold text-slate-800">{PACIENTE.proximaCita.fecha}</p>
              <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                <Clock className="w-4 h-4" />
                {PACIENTE.proximaCita.hora}
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-slate-100"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
              <MapPin className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <p className="font-bold text-slate-800">{PACIENTE.proximaCita.sucursal}</p>
              <p className="text-sm text-slate-500 mt-1">{PACIENTE.proximaCita.doctor}</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-3 rounded-xl transition-colors text-sm">
          Reprogramar Cita
        </button>
      </div>

      {/* Progreso del Tratamiento */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            Mi Progreso
          </h3>
          <span className="text-sm font-bold text-teal-600">
            {Math.round(progresoPorcentaje)}%
          </span>
        </div>

        <p className="text-sm font-bold text-slate-800 mb-1">{PACIENTE.tratamiento}</p>
        <p className="text-xs text-slate-500 mb-4">Fase {PACIENTE.faseActual} de {PACIENTE.faseTotal}</p>

        {/* Barra de Progreso */}
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progresoPorcentaje}%` }}
          ></div>
        </div>
      </div>

      {/* Modal del Código QR */}
      {mostrarQR && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-4 flex justify-end">
              <button 
                onClick={() => setMostrarQR(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-8 pb-10 flex flex-col items-center text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Tu Código de Acceso</h3>
              <p className="text-slate-500 text-sm mb-8">
                Muestra este código en el iPad de recepción para registrar tu llegada automáticamente.
              </p>
              
              {/* Simulación de QR */}
              <div className="w-64 h-64 bg-white border-4 border-slate-100 rounded-3xl p-4 shadow-inner flex items-center justify-center relative">
                {/* Esquinas del escáner */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-500 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-500 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-500 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-500 rounded-br-xl"></div>
                
                {/* Imagen QR Mock */}
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PACIENTE-${PACIENTE.nombre}-${PACIENTE.apellidos}&color=0f172a`} 
                  alt="Código QR"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-8 flex items-center gap-2 text-teal-600 font-bold bg-teal-50 px-4 py-2 rounded-full">
                <Award className="w-5 h-5" />
                <span>¡Ganas 10 Puntos Smile por llegar a tiempo!</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
