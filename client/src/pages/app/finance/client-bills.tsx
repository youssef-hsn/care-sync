import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { getBills } from '@/services/finance/bill.service';
import { DataTable } from '@/components/molecules/data-table';
import { Button } from '@/components/atoms/button';
import { PlusIcon } from 'lucide-react';
import { BILLS_BASE_URI } from '@/lib/constants/pages/views';
import { useNavigate } from 'react-router-dom';
import { Bill } from 'caresync/types/bill';

const ClientBillsPage: React.FC = () => {
    const { t } = useTranslation("finance");
    const navigate = useNavigate();
    const { data: clientBills, isLoading } = useQuery({
        queryKey: ['clientBills'],
        queryFn: async () => await getBills({ page: 0, size: 10 })
    });

    return (
        <Card className='m-1'>
            <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>{t('bills.clientBills')}</CardTitle>
                <Button size='sm'>
                    <PlusIcon />
                    {t('bills.createBill')}
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable<Bill> data={clientBills} columns={[
                    { label: 'billID' },
                    { label: 'clientId' },
                    { label: 'createdAt' },
                    { label: 'updatedAt' },
                    { label: 'total' },
                    { label: 'status' },
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
export default ClientBillsPage;