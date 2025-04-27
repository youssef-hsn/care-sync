import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IdentityState {
  fullName: string | null
  roles: string[]
  setIdentity: (fullName: string, roles: string[]) => void
  clearIdentity: () => void
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set) => ({
      fullName: null,
      roles: [] as string[],
      setIdentity: (fullName, roles) => set({ fullName, roles }),
      clearIdentity: () => set({ fullName: null, roles: [] })
    }),
    {
      name: 'identity-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)