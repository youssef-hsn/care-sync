import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { DataTable } from "@/components/molecules/data-table";
import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { AppointmentStatus } from "@/components/molecules/displays/status/appointment-status";

const appointments = [
    {
        id: 1,
        title: "Appointment 1",
        date: new Date(),
        status: "completed",
    },
    {
        id: 2,
        title: "Appointment 2",
        date: new Date(),
        status: "completed",
    },
    {
        id: 3,
        title: "Appointment 3",
        date: new Date(),
        status: "cancelled",
    },
    {
        id: 4,
        title: "Appointment 4",
        date: new Date("2025-05-18"),
        status: "confirmed",
    },
    {
        id: 5,
        title: "Appointment 5",
        date: new Date("2025-05-18"),
        status: "pending",
    }
];
export const Appointments = ({ clientID, className }: { clientID: number, className?: string }) => {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Appointments</CardTitle>
            </CardHeader>
            <CardContent>
            <DataTable data={appointments} columns={[
                { label: 'title' },
                { label: 'date', display: DateTimeDisplay },
                { label: 'status', display: AppointmentStatus },
            ]} />
            </CardContent>
        </Card>
    );
};