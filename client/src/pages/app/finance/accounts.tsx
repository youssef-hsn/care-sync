import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { getBills } from '@/services/finance/bill.service';
import { DataTable } from '@/components/molecules/data-table';


interface Bill {
    billID: number;
    clientId: number;
    total: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
const ClientBillsPage: React.FC = () => {
    const { t } = useTranslation("finance");

    const { data: clientBills, isLoading } = useQuery({
        queryKey: ['clientBills'],
        queryFn: async () => await getBills({ page: 0, size: 10 })
    });

    return (
        <Card className='m-1'>
            <CardHeader>
                <CardTitle>{t('clientBills.title')}</CardTitle>
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
                />
            </CardContent>
        </Card>
    );
}
export default ClientBillsPage;