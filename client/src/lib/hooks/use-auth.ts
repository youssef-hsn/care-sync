import { useAuthStore } from '@/lib/stores/auth.store'
import { useIdentityStore } from '@/lib/stores/identity.store'
import { authService, LoginResponse } from '@/services/auth.service'


export const useAuth = () => {
  const { accessToken, setAccessToken } = useAuthStore()
  const { id, fullName, roles, setIdentity, clearIdentity } = useIdentityStore()

  const storeIdentity = async (res: LoginResponse) => {
    const { accessToken: aT, user: {id, fullName, roles} } = res

    setAccessToken(aT)
    setIdentity(id, fullName, roles)
  }

  const clearSession = () => {
    setAccessToken("")
    clearIdentity()
  }

  const refreshAccess = async () => {
    try {
      const { accessToken } = await authService.refreshToken()
      setAccessToken(accessToken)
    } catch (error) {
      clearSession()
    }
  }

  return {
    accessToken,
    fullName,
    roles,
    clearSession,
    refreshAccess,
    storeIdentity,
    isAuthenticated: () => !!accessToken,
  }
}