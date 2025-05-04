import { AxiosResponse } from 'axios';
import { api } from '@/lib/api';
import { PaginationParams } from 'caresync/types/pagination';

export const getMyBills = async (page: PaginationParams): Promise<any> => {
    const response: AxiosResponse = await api.get('/finance/my-bills', { params: page } );
    return response.data;
};

export const getBills = async (page: PaginationParams): Promise<any> => {
    const response: AxiosResponse = await api.get('/finance/bills', { params: page });
    return response.data;
};

export const getBill = async (billId: string): Promise<any> => {
    const response: AxiosResponse = await api.get(`/finance/bills/${billId}/details`);
    return response.data;
};
