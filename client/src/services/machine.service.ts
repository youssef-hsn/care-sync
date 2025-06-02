import { api } from "@/lib/api";
import { AxiosResponse } from "axios";

export const getMachines = async (params: { page: number, size: number, search: string }): Promise<any[]> => {
    const response: AxiosResponse = await api.get('/machine', { params: params });
    return response.data;
}