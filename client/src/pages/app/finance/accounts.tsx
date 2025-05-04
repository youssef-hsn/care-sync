import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/card';
import { Skeleton } from '@/components/atoms/skeleton';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/lib/hooks/use-auth';
import { getBills } from '@/services/finance/bill.service';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableHead,
    TableRow,
} from '@/components/atoms/table';

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

    const { data: bills, isLoading } = useQuery({
        queryKey: ['bills'],
        queryFn: async () => await getBills({ page: 0, size: 10 }, accessToken!)
    });

    return (
        <Card className='m-1'>
            <CardHeader>
                <CardTitle>{t('bills.title')}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <Skeleton className="h-4 w-1/2" />
                ) : (
                    <Table>
                        <TableCaption>{t('bills.tableCaption')}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('bills.billID')}</TableHead>
                                <TableHead>{t('bills.clientId')}</TableHead>
                                <TableHead>{t('bills.total')}</TableHead>
                                <TableHead>{t('bills.status')}</TableHead>
                                <TableHead>{t('bills.createdAt')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bills?.map((bill: Bill) => (
                                <TableRow key={bill.billID}>
                                    <TableCell>{bill.billID}</TableCell>
                                    <TableCell>{bill.clientId}</TableCell>
                                    <TableCell>{bill.total}</TableCell>
                                    <TableCell>{bill.status}</TableCell>
                                    <TableCell>{new Date(bill.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
export default BillsPage;