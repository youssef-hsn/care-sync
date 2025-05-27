import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/atoms/card";
import { DataTable } from "@/components/molecules/data-table";

interface InvesotrsProps {
    machineID: number;
    className?: string;
}

export const Investors = [ // TODO: remove this dummy
    {
        investorID: 1,
        createdAt: new Date("2024-03-15"),
        updatedAt: new Date("2024-03-15"),
        name: "John Doe",
        share: 50,
        status: "active"
    },
    {
        investorID: 2,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-10"),
        name: "Jane Smith",
        share: 30,
        status: "inactive"
    }
]

export const InvestorsCard = ({ className }: InvesotrsProps) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Owners</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable
                    data={Investors} 
                    columns={[
                        {label: "investorID"},
                        {label: "share"},   
                        {label: "updatedAt"},
                    ]}
                />
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">
                    This is a list of all the owners of this machine. You can add or remove owners from the machine settings.
                </p>
            </CardFooter>
        </Card>
    );
};