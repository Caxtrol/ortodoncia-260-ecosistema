import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/authStore';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    // No está logueado, mandar al login
    return <Navigate to="/login" replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    // Está logueado pero no tiene el rol correcto (Regla: Cero Fricción por Rol)
    // Lo mandamos a su ruta base correspondiente
    switch (role) {
      case 'directora': return <Navigate to="/directora/dashboard" replace />;
      case 'operativa': return <Navigate to="/operacion/pacientes" replace />;
      case 'doctor': return <Navigate to="/clinica/hoy" replace />;
      case 'paciente': return <Navigate to="/portal/inicio" replace />;
      default: return <Navigate to="/login" replace />;
    }
  }

  // Tiene permiso, renderizar las rutas hijas
  return <Outlet />;
}
