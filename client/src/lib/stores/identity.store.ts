import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface IdentityState {
  id: number
  fullName: string | null
  roles: string[]
  setIdentity: (id: number, fullName: string, roles: string[]) => void
  clearIdentity: () => void
}

export const useIdentityStore = create<IdentityState>()(
  persist(
    (set) => ({
      id: 0,
      fullName: null,
      roles: [] as string[],
      setIdentity: (id, fullName, roles) => set({ id, fullName, roles }),
      clearIdentity: () => set({ fullName: null, roles: [] })
    }),
    {
      name: 'identity-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)