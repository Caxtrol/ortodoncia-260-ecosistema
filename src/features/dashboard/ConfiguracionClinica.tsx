import { useState } from 'react';
import { Building2, Users, Bell, Shield, Save, Clock, MapPin, Phone, Mail } from 'lucide-react';

type TabType = 'general' | 'horarios' | 'notificaciones';

export default function ConfiguracionClinica() {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Configuración</h1>
          <p className="text-slate-500 text-sm mt-1">Ajustes generales de la clínica</p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center gap-2 shadow-sm">
          <Save className="w-4 h-4" /> Guardar Cambios
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
        
        {/* SIDEBAR TABS */}
        <div className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${
              activeTab === 'general' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-5 h-5 shrink-0" /> Información General
          </button>
          <button 
            onClick={() => setActiveTab('horarios')}
            className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${
              activeTab === 'horarios' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-5 h-5 shrink-0" /> Horarios de Atención
          </button>
          <button 
            onClick={() => setActiveTab('notificaciones')}
            className={`flex items-center gap-3 p-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap ${
              activeTab === 'notificaciones' ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-5 h-5 shrink-0" /> Notificaciones y WhatsApp
          </button>
          <button className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors md:mt-4 whitespace-nowrap">
            <Users className="w-5 h-5 shrink-0" /> Gestión de Usuarios
          </button>
          <button className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap">
            <Shield className="w-5 h-5 shrink-0" /> Permisos y Roles
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-y-auto p-6">
          
          {activeTab === 'general' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Información de la Clínica</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-medium text-sm cursor-pointer hover:bg-slate-50 transition-colors">
                  Subir Logo
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">Logotipo de la Clínica</h4>
                  <p className="text-sm text-slate-500 mt-1">Recomendado: 512x512px en formato PNG o JPG.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nombre de la Clínica</label>
                  <input type="text" defaultValue="DentaFlow Especialidades" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">RFC (Opcional)</label>
                  <input type="text" defaultValue="DEN123456789" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><MapPin className="w-4 h-4" /> Dirección Completa</label>
                  <input type="text" defaultValue="Av. Morelos 1234, Centro, Torreón, Coah." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4" /> Teléfono Principal</label>
                  <input type="text" defaultValue="871 123 4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4" /> Correo Electrónico</label>
                  <input type="email" defaultValue="contacto@dentaflow.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'horarios' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Horarios de Atención</h3>
              <p className="text-sm text-slate-500 mb-6">Estos horarios determinan la disponibilidad en la agenda unificada.</p>
              
              <div className="space-y-4">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(dia => (
                  <div key={dia} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4 w-32">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                      <span className="font-bold text-slate-700">{dia}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <input type="time" defaultValue="09:00" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                      <span className="text-slate-400">a</span>
                      <input type="time" defaultValue="19:00" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-4 w-32">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <span className="font-bold text-slate-700">Sábado</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="time" defaultValue="09:00" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                    <span className="text-slate-400">a</span>
                    <input type="time" defaultValue="14:00" className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 opacity-60">
                  <div className="flex items-center gap-4 w-32">
                    <input type="checkbox" className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" />
                    <span className="font-bold text-slate-700">Domingo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notificaciones' && (
            <div className="max-w-2xl animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Automatización de WhatsApp</h3>
              
              <div className="space-y-6">
                <div className="flex items-start justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800">Recordatorios de Cita</h4>
                    <p className="text-sm text-slate-500 mt-1">Enviar mensaje automático 24 horas antes de la cita.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800">Mensaje de Bienvenida (Leads)</h4>
                    <p className="text-sm text-slate-500 mt-1">Responder automáticamente cuando un paciente nuevo escribe.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <div>
                    <h4 className="font-bold text-slate-800">Encuesta de Satisfacción</h4>
                    <p className="text-sm text-slate-500 mt-1">Enviar link para calificar en Google Maps al finalizar consulta.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
