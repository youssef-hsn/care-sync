import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { DataTable } from "@/components/molecules/data-table";
import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { AppointmentStatus } from "@/components/molecules/displays/status/appointment-status";

interface DocumentsProps {
    clientID: number;
    className?: string;
}

export const reports = [ // TODO: remove this dummy
    {
        id: 1,
        title: 'Blood Test Results',
        date: '2023-10-01',
        status: 'completed',
    },
    {
        id: 2,
        title: 'X-Ray Report',
        date: '2023-10-05',
        status: 'pending',
    },
    {
        id: 3,
        title: 'MRI Scan Results',
        date: '2023-10-10',
        status: 'completed',
    },
    {
        id: 4,
        title: 'CT Scan Report',
        date: '2023-10-15',
        status: 'pending',
    },
    {
        id: 5,
        title: 'Blood Test Results',
        date: '2023-10-01',
        status: 'completed',
    },
];

export function Reports({ className }: DocumentsProps) {

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable data={reports} columns={[
                    { label: 'title' },
                    { label: 'date', display: DateTimeDisplay },
                    { label: 'status', display: AppointmentStatus },
                ]} />
            </CardContent>
        </Card>
    );
}