import { api } from '@/lib/api';

interface LoginCredentials {
  phone: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: {
    fullName: string;
    roles: Set<string>;
  };
}

interface RegisterCredentials extends LoginCredentials {
    fullName: string;
}

export interface RegsiterResponse {
    message: string;
    userData: {
        id: number;
        phone: string;
        firstName: string;
        lastName: string;
    }
}

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials, { withCredentials: true });
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<RegsiterResponse>('auth/register', credentials);
    return data
  },

  refreshToken: async () => {
    const { data } = await api.post<{ accessToken: string }>('/auth/refresh', {}, { withCredentials: true });
    return data;
  },

  getMe: async () => {
    const { data } = await api.get('/auth/me');
    return data;
  },

  logout: async () => {
    const { data } = await api.post('/auth/logout');
    return data;
  }

};