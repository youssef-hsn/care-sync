import { useAuthStore } from '@/lib/stores/auth.store'
import { useIdentityStore } from '@/lib/stores/identity.store'
import { authService, LoginResponse } from '@/services/auth.service'


export const useAuth = () => {
  const { accessToken, setAccessToken } = useAuthStore()
  const { fullName, roles, setIdentity, clearIdentity } = useIdentityStore()

  const storeIdentity = async (res: LoginResponse) => {
    const { accessToken: aT, user: {fullName, roles} } = res
    console.log(aT)
    setAccessToken(aT)
    setIdentity(fullName, roles)
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
      console.error('Error refreshing access token:', error)
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