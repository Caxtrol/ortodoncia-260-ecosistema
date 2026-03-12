import { useState } from 'react';
import { DollarSign, CreditCard, FileText, CheckCircle2, AlertCircle, Plus, Printer } from 'lucide-react';

const PLAN_TRATAMIENTO = [
  { id: 't1', fase: 'Fase 1: Preparación', tratamiento: 'Limpieza Ultrasónica', costo: 800, estado: 'completado', fecha: '15 Ene 2026' },
  { id: 't2', fase: 'Fase 1: Preparación', tratamiento: 'Resina Simple OD 14', costo: 1200, estado: 'completado', fecha: '20 Ene 2026' },
  { id: 't3', fase: 'Fase 2: Ortodoncia', tratamiento: 'Estudio Cefalométrico', costo: 1500, estado: 'completado', fecha: '05 Feb 2026' },
  { id: 't4', fase: 'Fase 2: Ortodoncia', tratamiento: 'Instalación Brackets Metálicos', costo: 8000, estado: 'en_proceso', fecha: '10 Feb 2026' },
  { id: 't5', fase: 'Fase 2: Ortodoncia', tratamiento: 'Mensualidad 1/18', costo: 1000, estado: 'pendiente', fecha: '10 Mar 2026' },
  { id: 't6', fase: 'Fase 2: Ortodoncia', tratamiento: 'Mensualidad 2/18', costo: 1000, estado: 'pendiente', fecha: '10 Abr 2026' },
];

const PAGOS_REALIZADOS = [
  { id: 'p1', fecha: '15 Ene 2026', concepto: 'Limpieza Ultrasónica', monto: 800, metodo: 'Tarjeta de Crédito', recibo: 'REC-001' },
  { id: 'p2', fecha: '20 Ene 2026', concepto: 'Resina Simple OD 14', monto: 1200, metodo: 'Efectivo', recibo: 'REC-002' },
  { id: 'p3', fecha: '05 Feb 2026', concepto: 'Estudio Cefalométrico', monto: 1500, metodo: 'Transferencia', recibo: 'REC-003' },
  { id: 'p4', fecha: '10 Feb 2026', concepto: 'Anticipo Brackets (50%)', monto: 4000, metodo: 'Tarjeta de Débito', recibo: 'REC-004' },
];

export default function PlanPagos() {
  const totalPresupuesto = PLAN_TRATAMIENTO.reduce((acc, item) => acc + item.costo, 0);
  const totalPagado = PAGOS_REALIZADOS.reduce((acc, item) => acc + item.monto, 0);
  const saldoPendiente = totalPresupuesto - totalPagado;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 overflow-hidden">
      
      {/* Columna Izquierda: Plan de Tratamiento */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            Plan de Tratamiento
          </h3>
          <button className="flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 bg-teal-50 px-3 py-1.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Agregar Procedimiento
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            {PLAN_TRATAMIENTO.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:shadow-sm transition-all bg-white">
                <div className="flex items-center gap-4">
                  {item.estado === 'completado' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                  {item.estado === 'en_proceso' && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />}
                  {item.estado === 'pendiente' && <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />}
                  
                  <div>
                    <h4 className="font-bold text-slate-800">{item.tratamiento}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.fase} • {item.fecha}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">${item.costo.toLocaleString('es-MX')}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mt-1 inline-block ${
                    item.estado === 'completado' ? 'bg-emerald-50 text-emerald-700' :
                    item.estado === 'en_proceso' ? 'bg-amber-50 text-amber-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {item.estado.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Columna Derecha: Resumen Financiero y Pagos */}
      <div className="lg:w-1/3 flex flex-col gap-6 overflow-hidden">
        
        {/* Tarjeta de Resumen */}
        <div className="bg-slate-900 rounded-2xl shadow-sm p-6 text-white shrink-0 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-slate-400 font-medium mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Resumen Financiero
          </h3>
          
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-end">
              <span className="text-slate-300 text-sm">Presupuesto Total</span>
              <span className="font-bold text-lg">${totalPresupuesto.toLocaleString('es-MX')}</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-slate-300 text-sm">Pagos Realizados</span>
              <span className="font-bold text-lg text-emerald-400">-${totalPagado.toLocaleString('es-MX')}</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <span className="text-slate-300 font-medium">Saldo Pendiente</span>
              <span className="font-black text-3xl text-amber-400">${saldoPendiente.toLocaleString('es-MX')}</span>
            </div>
          </div>

          <button className="w-full mt-6 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" /> Registrar Nuevo Pago
          </button>
        </div>

        {/* Historial de Pagos */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800">Historial de Pagos</h3>
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <Printer className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="space-y-4">
              {PAGOS_REALIZADOS.map((pago) => (
                <div key={pago.id} className="flex justify-between items-center border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-700 text-sm">{pago.concepto}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-slate-400">{pago.fecha}</span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-400">{pago.metodo}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-emerald-600">${pago.monto.toLocaleString('es-MX')}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{pago.recibo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
