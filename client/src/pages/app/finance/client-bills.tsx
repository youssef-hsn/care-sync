import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/atoms/card';
import { useTranslation } from 'react-i18next';
import { getBills } from '@/services/finance/bill.service';
import { DataTable } from '@/components/molecules/data-table';
import { Button } from '@/components/atoms/button';
import { PlusIcon } from 'lucide-react';
import { BILLS_BASE_URI } from '@/lib/constants/pages/views';
import { useNavigate } from 'react-router-dom';
import { Bill } from 'caresync/types/bill';
import { Input } from '@/components/atoms/input';
import { PaymentStatus } from '@/components/molecules/displays/status/payment-status';
import { DateTimeDisplay } from '@/components/molecules/displays/date-display';

const ClientBillsPage: React.FC = () => {
    const { t } = useTranslation("finance");
    const navigate = useNavigate();
    const { data: clientBills, isLoading } = useQuery({
        queryKey: ['clientBills'],
        queryFn: async () => await getBills({ page: 0, size: 10 })
    });

    return (
        <Card className='m-1'>
            <CardHeader className='flex flex-col'>
                <CardTitle>{t('bills.clientBills')}</CardTitle>
                <CardDescription>
                    {t('bills.clientBillsDescription')}
                </CardDescription>
                <div className='flex flex-row gap-2 w-full'>
                    <Input 
                        placeholder={t('bills.searchBills')}
                        onChange={() => {}}
                        className='w-full'
                    />
                    <Button>
                        <PlusIcon /> {t('bills.createBill')}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataTable<Bill> data={clientBills} columns={[
                    { label: 'billID' },
                    { label: 'clientId' },
                    { 
                        label: 'createdAt',
                        display: DateTimeDisplay
                    },
                    { 
                        label: 'updatedAt',
                        display: DateTimeDisplay
                    },
                    { label: 'total' },
                    { label: 'status', display: PaymentStatus },
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