import { useState } from 'react';
import { Search, Plus, QrCode, Phone, Calendar, AlertTriangle, X, ChevronRight, Award, MessageCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Database } from '../../types/database';
import ModalNuevoPaciente from '../../components/modals/ModalNuevoPaciente';

type Paciente = Database['public']['Tables']['pacientes']['Row'];

// Datos falsos (Mock) para validar la UI con Norma
const MOCK_PACIENTES: Paciente[] = [
  {
    id: 'uuid-1',
    codigo_paciente: 'O260-00001',
    nombre_completo: 'María González Pérez',
    telefono: '+528711234567',
    telefono_alternativo: null,
    email: 'maria.g@email.com',
    fecha_nacimiento: '1985-05-15',
    curp: 'GOPM850515XXXXXX',
    tipo_sangre: 'O+',
    lugar_origen: 'Torreón, Coah.',
    domicilio: 'Col. Centro, Torreón',
    foto_url: null,
    qr_code_url: null,
    sucursal_principal: 'torreon',
    canal_preferido: 'whatsapp',
    nativo_digital: true,
    notas_especiales: 'Alergia a Penicilina',
    puntos_smile: 1250,
    nivel_smile: 'plata',
    total_visitas: 12,
    fecha_ultima_visita: '2026-02-28',
    activo: true,
    origen_registro: 'walk_in',
    created_at: '2025-01-10T10:00:00Z',
    updated_at: '2026-02-28T10:00:00Z',
  },
  {
    id: 'uuid-2',
    codigo_paciente: 'O260-00002',
    nombre_completo: 'Don Roberto Sánchez',
    telefono: '+528719876543',
    telefono_alternativo: '+528715554433',
    email: null,
    fecha_nacimiento: '1952-11-03',
    curp: null,
    tipo_sangre: 'A+',
    lugar_origen: 'San Pedro, Coah.',
    domicilio: 'Centro, San Pedro',
    foto_url: null,
    qr_code_url: null,
    sucursal_principal: 'san_pedro',
    canal_preferido: 'llamada',
    nativo_digital: false,
    notas_especiales: 'Hipertenso controlado. Paciente mayor, hablar con su hija Laura para citas.',
    puntos_smile: 450,
    nivel_smile: 'bronce',
    total_visitas: 4,
    fecha_ultima_visita: '2026-03-05',
    activo: true,
    origen_registro: 'whatsapp',
    created_at: '2025-11-20T10:00:00Z',
    updated_at: '2026-03-05T10:00:00Z',
  },
  {
    id: 'uuid-3',
    codigo_paciente: 'O260-00003',
    nombre_completo: 'Ana Sofía Ruiz',
    telefono: '+528713332211',
    telefono_alternativo: null,
    email: 'anasofia@email.com',
    fecha_nacimiento: '2005-08-22',
    curp: null,
    tipo_sangre: 'B-',
    lugar_origen: 'Torreón, Coah.',
    domicilio: 'Residencial Norte, Torreón',
    foto_url: null,
    qr_code_url: null,
    sucursal_principal: 'torreon',
    canal_preferido: 'whatsapp',
    nativo_digital: true,
    notas_especiales: null,
    puntos_smile: 3500,
    nivel_smile: 'oro',
    total_visitas: 24,
    fecha_ultima_visita: '2025-09-15',
    activo: false, // Inactivo (> 6 meses)
    origen_registro: 'facebook',
    created_at: '2024-05-10T10:00:00Z',
    updated_at: '2025-09-15T10:00:00Z',
  }
];

export default function PacientesCRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState<Paciente[]>(MOCK_PACIENTES);

  const filteredPacientes = pacientes.filter(p => 
    p.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigo_paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.telefono.includes(searchTerm)
  );

  const handleSavePaciente = (nuevoPaciente: any) => {
    // Simulamos guardar el paciente agregándolo al estado local
    const pacienteFormateado: Paciente = {
      ...nuevoPaciente,
      telefono_alternativo: null,
      curp: null,
      tipo_sangre: 'No especificado',
      lugar_origen: 'No especificado',
      domicilio: 'No especificado',
      foto_url: null,
      qr_code_url: null,
      sucursal_principal: nuevoPaciente.sucursal,
      canal_preferido: 'whatsapp',
      nativo_digital: true,
      notas_especiales: nuevoPaciente.alergias || null,
      puntos_smile: 0,
      nivel_smile: 'bronce',
      total_visitas: 0,
      fecha_ultima_visita: null,
      activo: true,
      origen_registro: 'walk_in',
      created_at: nuevoPaciente.fecha_registro,
      updated_at: nuevoPaciente.fecha_registro,
    };
    
    setPacientes([pacienteFormateado, ...pacientes]);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header & Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Directorio de Pacientes</h1>
          <p className="text-slate-500 text-sm mt-1">Busca por nombre, teléfono o código O260</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nuevo Paciente
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Ej. María González, O260-0001, 871..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Código</th>
                <th className="px-6 py-4 font-medium">Paciente</th>
                <th className="px-6 py-4 font-medium">Contacto</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Nivel Smile</th>
                <th className="px-6 py-4 font-medium text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPacientes.map((paciente) => (
                <tr 
                  key={paciente.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedPaciente(paciente)}
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                      {paciente.codigo_paciente}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                        {paciente.nombre_completo.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{paciente.nombre_completo}</p>
                        {paciente.notas_especiales && (
                          <div className="flex items-center gap-1 text-amber-600 text-xs mt-0.5">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Alerta médica</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600 text-sm">{paciente.telefono}</p>
                    <p className="text-slate-400 text-xs capitalize">{paciente.canal_preferido}</p>
                  </td>
                  <td className="px-6 py-4">
                    {paciente.activo ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <Award className={`w-4 h-4 ${
                        paciente.nivel_smile === 'oro' ? 'text-yellow-500' :
                        paciente.nivel_smile === 'plata' ? 'text-slate-400' :
                        'text-amber-700'
                      }`} />
                      <span className="text-sm font-medium text-slate-700 capitalize">{paciente.nivel_smile}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-teal-50 rounded-lg">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPacientes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No se encontraron pacientes con ese criterio de búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Profile Panel */}
      {selectedPaciente && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setSelectedPaciente(null)}
          />
          
          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
            {/* Panel Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-semibold text-slate-800">Perfil del Paciente</h2>
              <button 
                onClick={() => setSelectedPaciente(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Panel Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Identity Card (QR) */}
              <div className="bg-gradient-to-br from-teal-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-teal-200 text-xs font-bold tracking-wider uppercase mb-1">Ortodoncia 260</p>
                    <h3 className="text-xl font-serif font-bold leading-tight mb-1">{selectedPaciente.nombre_completo}</h3>
                    <p className="font-mono text-teal-100 text-sm">{selectedPaciente.codigo_paciente}</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl shadow-sm">
                    <QRCodeSVG 
                      value={`https://ortodoncia260.mx/p/${selectedPaciente.codigo_paciente}`} 
                      size={64} 
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-teal-200/70">Nivel Smile</p>
                    <p className="font-medium capitalize flex items-center gap-1">
                      <Award className="w-4 h-4" /> {selectedPaciente.nivel_smile}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-teal-200/70">Puntos</p>
                    <p className="font-bold text-lg">{selectedPaciente.puntos_smile}</p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {selectedPaciente.notas_especiales && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-amber-800">Alerta Médica / Nota</h4>
                    <p className="text-sm text-amber-700 mt-1">{selectedPaciente.notas_especiales}</p>
                  </div>
                </div>
              )}

              {/* Quick Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Teléfono Principal</p>
                    <p className="text-sm font-medium text-slate-800">{selectedPaciente.telefono}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Última Visita</p>
                    <p className="text-sm font-medium text-slate-800">
                      {selectedPaciente.fecha_ultima_visita ? new Date(selectedPaciente.fecha_ultima_visita).toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      }) : 'Sin visitas registradas'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 p-4 rounded-xl transition-colors">
                  <Calendar className="w-6 h-6" />
                  <span className="text-sm font-medium">Agendar Cita</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] p-4 rounded-xl transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </button>
                <button className="col-span-2 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 p-3 rounded-xl transition-colors mt-2">
                  <QrCode className="w-5 h-5" />
                  <span className="text-sm font-medium">Imprimir Tarjeta QR Física</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal de Nuevo Paciente */}
      <ModalNuevoPaciente 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSavePaciente}
      />
    </div>
  );
}
