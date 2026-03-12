import { Star, Gift, Clock, ChevronRight, Award, Sparkles } from 'lucide-react';

const RECOMPENSAS = [
  { id: 1, titulo: 'Limpieza Dental Gratis', puntos: 500, icono: Sparkles, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 2, titulo: 'Kit de Blanqueamiento', puntos: 800, icono: Gift, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 3, titulo: '50% en Retenedores', puntos: 1200, icono: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const HISTORIAL_PUNTOS = [
  { id: 1, accion: 'Llegada a tiempo a cita', fecha: '15 Abr 2026', puntos: '+10' },
  { id: 2, accion: 'Referir a un amigo (Carlos R.)', fecha: '02 Abr 2026', puntos: '+100' },
  { id: 3, accion: 'Pago de mensualidad puntual', fecha: '15 Mar 2026', puntos: '+50' },
  { id: 4, accion: 'Canje: Cepillo eléctrico', fecha: '10 Feb 2026', puntos: '-300', negativo: true },
];

export default function LogrosPaciente() {
  const puntosActuales = 450;
  const metaSiguiente = 500;
  const progreso = (puntosActuales / metaSiguiente) * 100;

  return (
    <div className="max-w-md mx-auto h-full flex flex-col gap-6 pb-6 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Mis Puntos Smile</h1>
        <p className="text-slate-500 text-sm mt-1">Gana puntos y canjéalos por premios</p>
      </div>

      {/* TARJETA DE PUNTOS ACTUALES */}
      <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 text-center">
          <p className="text-orange-100 text-sm font-medium uppercase tracking-wider mb-2">Saldo Actual</p>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Star className="w-10 h-10 text-yellow-200 fill-yellow-200" />
            <span className="text-6xl font-black tracking-tighter">{puntosActuales}</span>
          </div>

          <div className="bg-black/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 text-left">
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span>Nivel Plata</span>
              <span>Faltan {metaSiguiente - puntosActuales} pts para Oro</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* RECOMPENSAS DISPONIBLES */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-teal-600" />
          Premios Disponibles
        </h3>
        <div className="flex flex-col gap-3">
          {RECOMPENSAS.map((premio) => (
            <div key={premio.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${premio.bg} ${premio.color}`}>
                <premio.icono className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm">{premio.titulo}</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{premio.puntos} pts</p>
              </div>
              <button 
                disabled={puntosActuales < premio.puntos}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-colors ${
                  puntosActuales >= premio.puntos 
                    ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-900/10' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Canjear
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* HISTORIAL DE PUNTOS */}
      <div className="mt-2">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          Historial de Movimientos
        </h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <div className="flex flex-col gap-4">
            {HISTORIAL_PUNTOS.map((item, index) => (
              <div key={item.id} className={`flex items-center justify-between ${index !== HISTORIAL_PUNTOS.length - 1 ? 'border-b border-slate-50 pb-4' : ''}`}>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{item.accion}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.fecha}</p>
                </div>
                <span className={`font-black text-sm ${item.negativo ? 'text-slate-600' : 'text-emerald-500'}`}>
                  {item.puntos}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center justify-center gap-1">
            Ver todo el historial <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
