import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { DataTable } from "@/components/molecules/data-table";
import { PaymentStatus } from "@/components/molecules/displays/status/payment-status";
import { Bill } from "caresync/types/bill";
import { useNavigate } from "react-router-dom";
import { BILLS_BASE_URI } from "@/lib/constants/pages/views";
import { DateDisplay } from "@/components/molecules/displays/date-display";

interface BillsProps {
    clientID: number;
    className?: string;
}
const bills: Bill[] = [ // TODO: remove this dummy
    {
        billID: 1,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
        total: 150.00,
        status: "paid"
    },
    {
        billID: 2,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-10"),
        total: 75.50,
        status: "pending"
    },
    {
        billID: 3,
        createdAt: new Date("2024-03-05"),
        updatedAt: new Date("2024-03-05"),
        total: 200.00,
        status: "cancelled"
    },
    {
        billID: 4,
        createdAt: new Date("2024-02-28"),
        updatedAt: new Date("2024-02-28"),
        total: 125.75,
        status: "paid"
    },
    {
        billID: 5,
        createdAt: new Date("2024-02-20"),
        updatedAt: new Date("2024-02-20"),
        total: 300.00,
        status: "pending"
    }
]

export const Bills = ({ clientID, className }: BillsProps) => {
    const navigate = useNavigate();
    
    // const { data: bills, isLoading } = useQuery({
    //     queryKey: ['client-bills', clientID],
    //     queryFn: () => getClientBills(clientID, { page: 0, size: 10 }),
    //     enabled: !!clientID,
    // });



    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Bills</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable<Bill> 
                    data={bills} 
                    columns={[
                        { label: 'billID' },
                        { label: 'createdAt', display: DateDisplay },
                        { label: 'total' },
                        { label: 'status', display: PaymentStatus },
                    ]}
                    // isLoading={isLoadingBills}
                    onRowClick={(row) => navigate(`${BILLS_BASE_URI}/${row.billID}`)}
                />
            </CardContent>
        </Card>
    );
};
