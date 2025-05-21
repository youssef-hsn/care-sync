import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { getMyBills } from '@/services/finance/bill.service';
import { DataTable } from '@/components/molecules/data-table';
import { useNavigate } from 'react-router-dom';
import { BILLS_BASE_URI } from '@/lib/constants/pages/views';
import { Bill } from 'caresync/types/bill';
import { PaymentStatus } from '@/components/molecules/displays/status/payment-status';
import { DateTimeDisplay } from '@/components/molecules/displays/date-display';

const BillsPage: React.FC = () => {
  const { t } = useTranslation("finance");

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['bills'],
    queryFn: async () => {
      return await getMyBills({ page: 0, size: 10 })},
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
          { 
            label: 'createdAt',
            display: DateTimeDisplay
          },
          { 
            label: 'updatedAt',
            display: DateTimeDisplay
          },
          { label: 'total' },
          { label: 'status', display: PaymentStatus},
        ]}
          isLoading={isLoading}
          onRowClick={(row) => {
            navigate(BILLS_BASE_URI + "/" + row.billID);
          }}
        />
      </CardContent>
    </Card>
  );
}
export default BillsPage;