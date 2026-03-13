import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'directora' | 'operativa' | 'doctor' | 'paciente' | null;

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole;
  user: any | null;
  _hydrated: boolean;
  login: (role: UserRole, userData: any) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: null,
      user: null,
      _hydrated: false,

      login: (role, userData) =>
        set({ isAuthenticated: true, role, user: userData }),

      logout: () =>
        set({ isAuthenticated: false, role: null, user: null }),

      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: 'ortodoncia260-auth',
      // Solo persistir lo necesario — no _hydrated
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        // Marcar que ya se leyó localStorage — evita el flash de redirect
        state?.setHydrated();
      },
    }
  )
);
