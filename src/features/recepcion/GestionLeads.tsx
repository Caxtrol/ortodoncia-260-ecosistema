import React, { useState } from 'react';
import { 
  MessageSquare, 
  Bot, 
  User, 
  CheckCircle2, 
  Smartphone, 
  Instagram, 
  Send, 
  AlertCircle,
  Clock,
  UserCircle2,
  ArrowLeft
} from 'lucide-react';

type OrigenLead = 'whatsapp' | 'instagram';
type EstadoLead = 'bot' | 'requiere_humano' | 'agendado';

interface Lead {
  id: string;
  nombre: string;
  telefono?: string;
  origen: OrigenLead;
  estado: EstadoLead;
  ultimoMensaje: string;
  hora: string;
  unread: boolean;
}

interface Mensaje {
  id: string;
  sender: 'lead' | 'bot' | 'humano';
  text: string;
  time: string;
}

const MOCK_LEADS: Lead[] = [
  { 
    id: '1', 
    nombre: 'Laura Gómez', 
    telefono: '+52 871 123 4567',
    origen: 'whatsapp', 
    estado: 'requiere_humano', 
    ultimoMensaje: '¿Tienen citas para hoy en la tarde?', 
    hora: '10:45 AM', 
    unread: true 
  },
  { 
    id: '2', 
    nombre: 'Carlos Ruiz', 
    origen: 'instagram', 
    estado: 'bot', 
    ultimoMensaje: 'El costo de la consulta de valoración es de $500...', 
    hora: '10:30 AM', 
    unread: false 
  },
  { 
    id: '3', 
    nombre: 'Sofía Méndez', 
    telefono: '+52 871 987 6543',
    origen: 'whatsapp', 
    estado: 'agendado', 
    ultimoMensaje: '¡Perfecto! Nos vemos el jueves.', 
    hora: '09:15 AM', 
    unread: false 
  },
  { 
    id: '4', 
    nombre: 'Miguel Ángel', 
    origen: 'instagram', 
    estado: 'requiere_humano', 
    ultimoMensaje: 'Quiero hablar con una persona por favor.', 
    hora: 'Ayer', 
    unread: true 
  },
];

const MOCK_CHAT: Mensaje[] = [
  { id: 'm1', sender: 'lead', text: 'Hola, quiero info sobre brackets', time: '10:40 AM' },
  { id: 'm2', sender: 'bot', text: '¡Hola Laura! 👋 Soy el asistente virtual de DentaFlow. Con gusto te ayudo. ¿Para quién sería el tratamiento?', time: '10:40 AM' },
  { id: 'm3', sender: 'lead', text: 'Para mí. ¿Tienen citas para hoy en la tarde?', time: '10:45 AM' }
];

export default function GestionLeads() {
  const [activeTab, setActiveTab] = useState<'todos' | 'requiere_humano' | 'bot'>('requiere_humano');
  const [selectedLeadId, setSelectedLeadId] = useState<string>('1');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Mensaje[]>(MOCK_CHAT);
  
  const leads = MOCK_LEADS.filter(lead => {
    if (activeTab === 'todos') return true;
    return lead.estado === activeTab;
  });

  const selectedLead = MOCK_LEADS.find(l => l.id === selectedLeadId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: Mensaje = {
      id: Date.now().toString(),
      sender: 'humano',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory([...chatHistory, newMessage]);
    setChatInput('');
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Leads (IA)</h1>
          <p className="text-slate-500 text-sm mt-1">Supervisa y atiende prospectos de WhatsApp e Instagram</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('requiere_humano')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'requiere_humano' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <AlertCircle className="w-4 h-4" /> Requieren Atención
            <span className="bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-md text-xs">2</span>
          </button>
          <button 
            onClick={() => setActiveTab('bot')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeTab === 'bot' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Bot className="w-4 h-4" /> Atendidos por IA
          </button>
          <button 
            onClick={() => setActiveTab('todos')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'todos' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      {/* MAIN CONTENT: SPLIT VIEW */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        
        {/* LEFT PANEL: LEADS LIST */}
        <div className={`w-full lg:w-1/3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden shrink-0 ${selectedLead ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <input 
              type="text" 
              placeholder="Buscar paciente o teléfono..." 
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {leads.map(lead => (
              <button 
                key={lead.id}
                onClick={() => setSelectedLeadId(lead.id)}
                className={`w-full text-left p-4 border-b border-slate-50 transition-colors hover:bg-slate-50 flex gap-3 ${
                  selectedLeadId === lead.id ? 'bg-teal-50/50 border-l-4 border-l-teal-500' : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="shrink-0 mt-1">
                  {lead.origen === 'whatsapp' ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`font-bold text-sm truncate ${lead.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                      {lead.nombre}
                    </h4>
                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{lead.hora}</span>
                  </div>
                  <p className={`text-xs truncate ${lead.unread ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                    {lead.ultimoMensaje}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {lead.estado === 'requiere_humano' && (
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Esperando humano
                      </span>
                    )}
                    {lead.estado === 'bot' && (
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Bot className="w-3 h-3" /> IA respondiendo
                      </span>
                    )}
                    {lead.estado === 'agendado' && (
                      <span className="text-[10px] font-bold bg-teal-100 text-teal-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Agendado
                      </span>
                    )}
                  </div>
                </div>
                {lead.unread && (
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full shrink-0 mt-1.5"></div>
                )}
              </button>
            ))}
            {leads.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No hay conversaciones en esta categoría.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CHAT VIEW */}
        {selectedLead ? (
          <div className={`flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden ${!selectedLead ? 'hidden lg:flex' : 'flex'}`}>
            
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedLeadId('')}
                  className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{selectedLead.nombre}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    {selectedLead.origen === 'whatsapp' ? <Smartphone className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                    {selectedLead.telefono || '@' + selectedLead.nombre.toLowerCase().replace(' ', '')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {selectedLead.estado !== 'agendado' && (
                  <button className="bg-teal-50 hover:bg-teal-100 text-teal-700 text-sm font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-2 border border-teal-200">
                    <CheckCircle2 className="w-4 h-4" /> Marcar Agendado
                  </button>
                )}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/30">
              <div className="text-center text-xs text-slate-400 font-medium my-2">Hoy</div>
              
              {chatHistory.map((msg) => {
                const isLead = msg.sender === 'lead';
                const isBot = msg.sender === 'bot';
                
                return (
                  <div key={msg.id} className={`flex gap-3 max-w-[80%] ${isLead ? 'self-start' : 'self-end flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isLead ? 'bg-slate-200 text-slate-500' : 
                      isBot ? 'bg-teal-100 text-teal-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {isLead ? <User className="w-4 h-4" /> : 
                       isBot ? <Bot className="w-4 h-4" /> : <UserCircle2 className="w-4 h-4" />}
                    </div>
                    
                    <div className={`flex flex-col ${isLead ? 'items-start' : 'items-end'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500">
                          {isLead ? selectedLead.nombre : isBot ? 'IA Asistente' : 'Recepción (Tú)'}
                        </span>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <div className={`p-3 rounded-2xl text-sm ${
                        isLead ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-none' : 
                        isBot ? 'bg-teal-50 border border-teal-100 text-teal-800 rounded-tr-none' : 
                        'bg-slate-800 text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
              {selectedLead.estado === 'bot' && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-800 text-sm">
                    <Bot className="w-4 h-4" /> La IA está atendiendo este chat.
                  </div>
                  <button className="text-sm font-bold text-amber-700 hover:text-amber-800 bg-amber-100 px-3 py-1.5 rounded-lg transition-colors">
                    Tomar control manual
                  </button>
                </div>
              )}
              
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe un mensaje al paciente..." 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white w-12 rounded-xl flex items-center justify-center transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="hidden lg:flex flex-1 bg-slate-50 rounded-2xl border border-slate-200 flex-col items-center justify-center text-slate-400">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Selecciona un chat para ver la conversación</p>
          </div>
        )}

      </div>
    </div>
  );
}
