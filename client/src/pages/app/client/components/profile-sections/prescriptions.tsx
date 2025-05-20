import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { DateDisplay } from "@/components/molecules/displays/date-display";
import { DataTable } from "@/components/molecules/data-table";
import { SectionProps } from "./section-props";

const prescriptions = [ // TODO: remove this dummy
    {
        id: 1,
        medicine: "Medication A",
        dosage: "500mg",
        frequency: "Twice a day",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-03-10"),
    },
    {
        id: 2,
        medicine: "Medication B",
        dosage: "250mg",
        frequency: "Once a day",
        startDate: new Date("2024-03-05"),
        endDate: new Date("2024-03-15"),
    },
    {
        id: 3,
        medicine: "Medication C",
        dosage: "100mg",
        frequency: "Three times a day",
        startDate: new Date("2024-03-10"),
        endDate: new Date("2024-03-20"),
    },
    {
        id: 4,
        medicine: "Medication D",
        dosage: "50mg",
        frequency: "Once a week",
        startDate: new Date("2024-03-15"),
        endDate: new Date("2024-03-25"),
    },
];


export const Prescriptions: React.FC<SectionProps> = ({ className }) => {
    // const { data: records, isLoading } = useQuery({
    //     queryKey: ['client-notes', clientID],
    //     queryFn: () => getClientNotes(clientID, { page: 0, size: 10 }),
    //     enabled: !!clientID,
    // });


    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Presecriptions</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable 
                    data={prescriptions} 
                    columns={[
                        { label: 'medicine' },
                        { label: 'dosage' },
                        { label: 'frequency' },
                        { label: 'startDate', display: DateDisplay },
                        { label: 'endDate', display: DateDisplay },
                ]} />
            </CardContent>
        </Card>
    );
};