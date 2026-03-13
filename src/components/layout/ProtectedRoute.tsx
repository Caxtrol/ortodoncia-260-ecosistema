import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role, _hydrated } = useAuthStore();

  // ⚠️ CRÍTICO: esperar a que zustand lea localStorage antes de redirigir.
  // Sin esto, en el primer render _hydrated=false, isAuthenticated=false
  // → redirige a /login aunque el usuario SÍ tenga sesión guardada
  // → eso causa el bucle en múltiples pestañas.
  if (!_hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400">Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    // Redirigir a la ruta correcta según el rol (Regla: Cero Fricción por Rol)
    switch (role) {
      case 'directora': return <Navigate to="/directora/dashboard" replace />;
      case 'operativa': return <Navigate to="/operacion/agenda" replace />;
      case 'doctor':    return <Navigate to="/clinica/hoy" replace />;
      case 'paciente':  return <Navigate to="/portal/inicio" replace />;
      default:          return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
}
