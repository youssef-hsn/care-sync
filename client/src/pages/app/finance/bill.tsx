import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { TableCell, TableFooter, TableRow } from "@/components/atoms/table";
import { DataTable } from "@/components/molecules/data-table";
import { userHasAnyOf } from "@/lib/utils/access-controll";
import LoadingPage from "@/pages/state/loading";
import { getBill } from "@/services/finance/bill.service";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams} from "react-router-dom"

export default function BillPage() {
    const { t } = useTranslation("finance");
    const { id } = useParams();

    if (!id || isNaN(Number(id))) {
        return <div>bill id should be a number</div>
    }

    const { data: bill, isLoading } = useQuery({
        queryKey: ['bill', id],
        queryFn: () => getBill(id),
    });

    if (isLoading || !bill) {
        return <LoadingPage />
    }

    return (
        <Card className="m-1">
            <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>
                    {t('bill.details')} [ #{bill?.billID} ]
                </CardTitle>
                {userHasAnyOf(['associate']) && (
                    <Button size="icon" className="ml-auto">
                        <Pencil />
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <DataTable<any> columns={[
                    {
                        label: "service"
                    },
                    {
                        label: "description",
                    },
                    {
                        label: "reason"
                    },
                    {
                        label: "amount",
                    },
                ]} data={bill?.billDetails} >
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={Object.keys(bill?.billDetails[0]).length-1}>
                                {t('bill.total')}
                            </TableCell>
                            <TableCell>
                                {bill?.total}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </DataTable>
            </CardContent>
        </Card>
    )
}