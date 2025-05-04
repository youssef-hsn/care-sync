import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { getClients } from '@/services/client.service';
import { DataTable } from '@/components/molecules/data-table';

interface Bill {
  billID: number;
  clientId: number;
  total: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
const ClientsPage: React.FC = () => {
  const { t } = useTranslation("finance");

  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      return await getClients({ page: 0, size: 10 })},
    refetchOnWindowFocus: true,
  });

  return (
    <Card className='m-1'>
      <CardHeader>
        <CardTitle>{t('bills.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable<Bill> data={data} columns={[
          { label: 'clientID' },
          { label: 'name' },
          { label: 'phone' },
          { label: 'email' },
          { label: 'address' },
          { label: 'createdAt' },
          { label: 'updatedAt' },
        ]}
          isLoading={isLoading}
        >
        </DataTable>
      </CardContent>
    </Card>
  );
}
export default ClientsPage;