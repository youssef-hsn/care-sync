import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IdentityState {
  fullName: string | null
  roles: Set<string>
  setIdentity: (firstName: string, roles: Set<string>) => void
  clearIdentity: () => void
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set) => ({
      fullName: null,
      roles: new Set<string>(),
      setIdentity: (fullName, roles) => set({ fullName, roles }),
      clearIdentity: () => set({ fullName: null, roles: new Set<string>() })
    }),
    {
      name: 'identity-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)