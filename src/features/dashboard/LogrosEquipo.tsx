import { Trophy, Medal, Star, TrendingUp, Award, Target, ChevronUp } from 'lucide-react';

const RANKING = [
  { id: 1, nombre: 'Dra. Elena Torres', rol: 'Ortodoncista', puntos: 2450, tendencia: '+120', avatar: 'ET', color: 'bg-amber-100 text-amber-700', border: 'border-amber-200', icon: Trophy },
  { id: 2, nombre: 'Norma (Recepción)', rol: 'Operativa', puntos: 2100, tendencia: '+85', avatar: 'NR', color: 'bg-slate-100 text-slate-700', border: 'border-slate-200', icon: Medal },
  { id: 3, nombre: 'Dr. Alejandro Ruiz', rol: 'Odontólogo General', puntos: 1850, tendencia: '+40', avatar: 'AR', color: 'bg-orange-100 text-orange-700', border: 'border-orange-200', icon: Medal },
  { id: 4, nombre: 'Ana (Asistente)', rol: 'Asistente Dental', puntos: 1200, tendencia: '+15', avatar: 'AN', color: 'bg-slate-50 text-slate-600', border: 'border-slate-100', icon: Star },
];

const METAS = [
  { id: 1, titulo: 'Pacientes Nuevos', actual: 48, objetivo: 50, unidad: 'pacientes', color: 'bg-blue-500' },
  { id: 2, titulo: 'Retención de Citas', actual: 92, objetivo: 90, unidad: '%', color: 'bg-emerald-500' },
  { id: 3, titulo: 'Reseñas en Google', actual: 15, objetivo: 20, unidad: 'reseñas', color: 'bg-amber-500' },
];

export default function LogrosEquipo() {
  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto hide-scrollbar pb-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Logros del Equipo</h1>
        <p className="text-slate-500 text-sm mt-1">Gamificación y rendimiento del personal (Mes actual)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEADERBOARD (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Ranking de Puntos Smile (Staff)
            </h3>
            <button className="text-sm font-bold text-teal-600 hover:text-teal-700">Ver reglas</button>
          </div>

          <div className="flex flex-col gap-3">
            {RANKING.map((persona, index) => {
              const Icon = persona.icon;
              return (
                <div key={persona.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${persona.border} ${index === 0 ? 'bg-gradient-to-r from-amber-50 to-white' : 'bg-white'}`}>
                  
                  <div className="font-black text-slate-300 text-xl w-6 text-center">
                    #{index + 1}
                  </div>

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${persona.color}`}>
                    {persona.avatar}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                      {persona.nombre}
                      {index === 0 && <Icon className="w-4 h-4 text-amber-500 fill-amber-500" />}
                    </h4>
                    <p className="text-sm text-slate-500">{persona.rol}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-slate-800">{persona.puntos}</p>
                    <p className="text-xs font-bold text-emerald-500 flex items-center justify-end gap-0.5 mt-0.5">
                      <ChevronUp className="w-3 h-3" /> {persona.tendencia} pts
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* METAS COLECTIVAS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-500" />
              Metas Colectivas
            </h3>
            <p className="text-sm text-slate-500 mt-1">Si se cumplen, todo el equipo gana un bono.</p>
          </div>

          <div className="flex flex-col gap-6 flex-1">
            {METAS.map((meta) => {
              const progreso = Math.min((meta.actual / meta.objetivo) * 100, 100);
              return (
                <div key={meta.id}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-700 text-sm">{meta.titulo}</span>
                    <span className="text-xs font-bold text-slate-500">
                      {meta.actual} / {meta.objetivo} {meta.unidad}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${meta.color}`}
                      style={{ width: `${progreso}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <TrendingUp className="w-6 h-6 text-teal-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">¡Excelente trabajo!</p>
            <p className="text-xs text-slate-500 mt-1">Están a un 95% de lograr el bono grupal de este mes.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
