import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'directora' | 'operativa' | 'doctor' | 'paciente' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: any | null; // Aquí iría el tipo de usuario de Supabase
  login: (role: UserRole, userData: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      user: null,
      login: (role, userData) => set({ isAuthenticated: true, role, user: userData }),
      logout: () => set({ isAuthenticated: false, role: null, user: null }),
    }),
    {
      name: 'ortodoncia260-auth', // Guarda la sesión en localStorage (PWA friendly)
    }
  )
);
