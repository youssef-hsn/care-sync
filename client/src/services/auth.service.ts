import { api } from '@/lib/api';

interface LoginCredentials {
  phone: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    phone: string;
    roles: Set<string>;
  };
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    return data;
  },
};