import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/hooks/use-auth';
import { getMyBills } from '@/services/finance/bill.service';
import { DataTable } from '@/components/molecules/data-table';

interface Bill {
  billID: number;
  clientId: number;
  total: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
const BillsPage: React.FC = () => {
  const { t } = useTranslation("finance");
  const { accessToken } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      console.log('Fetching bills');
      return await getMyBills({ page: 0, size: 10 }, accessToken!)},
    refetchOnWindowFocus: true,
  });

  return (
    <Card className='m-1'>
      <CardHeader>
        <CardTitle>{t('bills.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable<Bill> data={data} columns={[
          { label: 'billID' },
          { label: 'status' },
          { label: 'createdAt' },
          { label: 'updatedAt' },
          { label: 'total' },
        ]}
          isLoading={isLoading}
        >
        </DataTable>
      </CardContent>
    </Card>
  );
}
export default BillsPage;