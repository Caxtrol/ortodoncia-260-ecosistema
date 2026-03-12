import { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  CalendarCheck, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Target
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// --- MOCK DATA ---
const REVENUE_DATA = [
  { mes: 'Ene', ingresos: 380000, meta: 400000 },
  { mes: 'Feb', ingresos: 420000, meta: 420000 },
  { mes: 'Mar', ingresos: 480000, meta: 450000 },
  { mes: 'Abr', ingresos: 460000, meta: 480000 },
  { mes: 'May', ingresos: 510000, meta: 500000 },
  { mes: 'Jun', ingresos: 540000, meta: 520000 },
];

const TRATAMIENTOS_DATA = [
  { nombre: 'Ortodoncia', valor: 45, color: '#0d9488' }, // teal-600
  { nombre: 'Implantes', valor: 30, color: '#0f766e' },  // teal-700
  { nombre: 'Diseño Sonrisa', valor: 15, color: '#14b8a6' }, // teal-500
  { nombre: 'General', valor: 10, color: '#5eead4' },    // teal-300
];

const CUENTAS_COBRAR = [
  { id: 1, paciente: 'María González', tratamiento: 'Implante Dental', monto: 15000, diasAtraso: 12 },
  { id: 2, paciente: 'Carlos Ruiz', tratamiento: 'Ortodoncia (Mensualidad)', monto: 1200, diasAtraso: 5 },
  { id: 3, paciente: 'Ana Silva', tratamiento: 'Endodoncia', monto: 3500, diasAtraso: 2 },
];

export default function DashboardEjecutivo() {
  const [periodo, setPeriodo] = useState('Este Mes');

  // Formateador de moneda
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto hide-scrollbar pb-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Ejecutivo</h1>
          <p className="text-slate-500 text-sm mt-1">Resumen financiero y operativo de la clínica</p>
        </div>
        
        <select 
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          className="bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
        >
          <option>Hoy</option>
          <option>Esta Semana</option>
          <option>Este Mes</option>
          <option>Trimestre Actual</option>
          <option>Año Actual</option>
        </select>
      </div>

      {/* KPI CARDS (Grid 4 columnas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Ingresos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> +12.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Ingresos Totales</p>
            <h3 className="text-2xl font-black text-slate-800">{formatCurrency(540000)}</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" /> Meta: {formatCurrency(520000)}
            </div>
          </div>
        </div>

        {/* KPI 2: Pacientes Nuevos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> +5.2%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Pacientes Nuevos</p>
            <h3 className="text-2xl font-black text-slate-800">48</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" /> Meta: 50 pacientes
            </div>
          </div>
        </div>

        {/* KPI 3: Ticket Promedio */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-lg">
              <ArrowDownRight className="w-3 h-3" /> -2.1%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Ticket Promedio</p>
            <h3 className="text-2xl font-black text-slate-800">{formatCurrency(3250)}</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" /> Meta: {formatCurrency(3500)}
            </div>
          </div>
        </div>

        {/* KPI 4: Tasa de Asistencia */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">
              <ArrowUpRight className="w-3 h-3" /> +1.5%
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Tasa de Asistencia</p>
            <h3 className="text-2xl font-black text-slate-800">92%</h3>
            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Target className="w-3 h-3" /> Meta: 90% (Excelente)
            </div>
          </div>
        </div>

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico Principal: Ingresos vs Meta (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Ingresos vs. Meta</h3>
              <p className="text-sm text-slate-500">Evolución de los últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-slate-600">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div> Ingresos
              </span>
              <span className="flex items-center gap-2 text-slate-600">
                <div className="w-3 h-3 rounded-full bg-slate-300"></div> Meta
              </span>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="meta" stroke="#cbd5e1" strokeWidth={2} fill="none" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="ingresos" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico Secundario: Distribución de Tratamientos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Mix de Tratamientos</h3>
            <p className="text-sm text-slate-500 mb-6">Porcentaje de ingresos por área</p>
          </div>
          
          <div className="flex-1 h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRATAMIENTOS_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="nombre" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }} width={100} />
                <Tooltip cursor={{fill: 'transparent'}} formatter={(value: number) => `${value}%`} />
                <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={24}>
                  {TRATAMIENTOS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Alertas / Cuentas por Cobrar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-500" />
            Cuentas por Cobrar (Atrasadas)
          </h3>
          <button className="text-sm font-bold text-teal-600 hover:text-teal-700">Ver Todas</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-sm text-slate-500">
                <th className="pb-3 font-medium">Paciente</th>
                <th className="pb-3 font-medium">Tratamiento</th>
                <th className="pb-3 font-medium">Días Atraso</th>
                <th className="pb-3 font-medium text-right">Monto Pendiente</th>
                <th className="pb-3 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {CUENTAS_COBRAR.map((cuenta) => (
                <tr key={cuenta.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                  <td className="py-4 font-bold text-slate-800">{cuenta.paciente}</td>
                  <td className="py-4 text-slate-600">{cuenta.tratamiento}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      cuenta.diasAtraso > 10 ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cuenta.diasAtraso} días
                    </span>
                  </td>
                  <td className="py-4 font-bold text-slate-800 text-right">{formatCurrency(cuenta.monto)}</td>
                  <td className="py-4 text-right">
                    <button className="text-teal-600 font-bold hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity">
                      Recordatorio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
