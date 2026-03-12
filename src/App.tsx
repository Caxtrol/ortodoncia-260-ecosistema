/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts & Guards
import DirectoraGeneralLayout from './layouts/DirectoraGeneralLayout';
import DirectoraOperativaLayout from './layouts/DirectoraOperativaLayout';
import VistaClinicaLayout from './layouts/VistaClinicaLayout';
import PortalPacienteLayout from './layouts/PortalPacienteLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Features (Pages)
import LoginScreen from './features/auth/LoginScreen';
import PacientesCRM from './features/crm/PacientesCRM';
import AgendaUnificada from './features/agenda/AgendaUnificada';
import PacientesDelDia from './features/clinica/PacientesDelDia';
import ExpedienteClinico from './features/clinica/ExpedienteClinico';
import ResumenTratamiento from './features/paciente/ResumenTratamiento';
import MisCitas from './features/paciente/MisCitas';
import LogrosPaciente from './features/paciente/LogrosPaciente';
import PerfilPaciente from './features/paciente/PerfilPaciente';
import DashboardEjecutivo from './features/dashboard/DashboardEjecutivo';
import LogrosEquipo from './features/dashboard/LogrosEquipo';
import ConfiguracionClinica from './features/dashboard/ConfiguracionClinica';
import LlegadasCobros from './features/recepcion/LlegadasCobros';
import GestionLeads from './features/recepcion/GestionLeads';

// Create a client
const queryClient = new QueryClient();

// Temporary placeholder components for routes
const Placeholder = ({ title }: { title: string }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center h-full flex flex-col items-center justify-center">
    <h3 className="text-xl font-medium text-slate-800">{title}</h3>
    <p className="text-slate-500 mt-2">Módulo en construcción (Fase 1)</p>
  </div>
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/ortodoncia-260-ecosistema">
        <Routes>
          {/* Ruta Pública: Login */}
          <Route path="/login" element={<LoginScreen />} />

          {/* Redirección raíz al login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 1. Rol: Directora General (Dra. Cinthia) */}
          <Route element={<ProtectedRoute allowedRoles={['directora']} />}>
            <Route path="/directora" element={<DirectoraGeneralLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardEjecutivo />} />
              <Route path="equipo" element={<LogrosEquipo />} />
              <Route path="configuracion" element={<ConfiguracionClinica />} />
            </Route>
          </Route>

          {/* 2. Rol: Directora Operativa (Norma) */}
          <Route element={<ProtectedRoute allowedRoles={['operativa']} />}>
            <Route path="/operacion" element={<DirectoraOperativaLayout />}>
              <Route index element={<Navigate to="agenda" replace />} />
              <Route path="agenda" element={<AgendaUnificada />} />
              <Route path="pacientes" element={<PacientesCRM />} />
              <Route path="leads" element={<GestionLeads />} />
              <Route path="llegadas" element={<LlegadasCobros />} />
            </Route>
          </Route>

          {/* 3. Rol: Doctor en Consultorio */}
          <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
            <Route path="/clinica" element={<VistaClinicaLayout />}>
              <Route index element={<Navigate to="hoy" replace />} />
              <Route path="hoy" element={<PacientesDelDia />} />
              <Route path="expediente" element={<ExpedienteClinico />} />
            </Route>
          </Route>

          {/* 4. Rol: Paciente (PWA) */}
          <Route element={<ProtectedRoute allowedRoles={['paciente']} />}>
            <Route path="/portal" element={<PortalPacienteLayout />}>
              <Route index element={<Navigate to="inicio" replace />} />
              <Route path="inicio" element={<ResumenTratamiento />} />
              <Route path="citas" element={<MisCitas />} />
              <Route path="logros" element={<LogrosPaciente />} />
              <Route path="perfil" element={<PerfilPaciente />} />
            </Route>
          </Route>

          {/* Ruta Catch-all (404) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
