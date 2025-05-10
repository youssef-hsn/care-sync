import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { PaginationParams } from 'caresync/types/pagination';
import { Client } from 'caresync/types/client';

export const getClients = async (page: PaginationParams): Promise<Client[]> => {
    const response: AxiosResponse = await api.get('/client', { params: page });
    return response.data;
};

export const getClient = async (clientId: string): Promise<Client> => {
    const response: AxiosResponse = await api.get(`/client/${clientId}`);
    return response.data;
};
