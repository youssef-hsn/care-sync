import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { DataTable } from "@/components/molecules/data-table";

const records = [ // TODO: remove this dummy
    {
        id: 1,
        title: "did you X?",
        content: "Note 1",
        createdAt: new Date("2024-03-15"),
    },
    {
        id: 2,
        title: "haha what?",
        content: "Note 2",
        createdAt: new Date("2024-03-10"),
    },
    {
        id: 3,
        title: "some question",
        content: "Note 3",
        createdAt: new Date("2024-03-05"),
    },
    {
        id: 4,
        title: "why did you do X?",
        content: "Note 4",
        createdAt: new Date("2024-02-28"),
    },
    {
        id: 5,
        title: "did you X?",
        content: "Note 5",
        createdAt: new Date("2024-02-20"),
    },
];

export interface RecordsProps {
    clientID: number;
    className?: string;
}


export const Records: React.FC<RecordsProps> = ({ className }) => {
    // const { data: records, isLoading } = useQuery({
    //     queryKey: ['client-notes', clientID],
    //     queryFn: () => getClientNotes(clientID, { page: 0, size: 10 }),
    //     enabled: !!clientID,
    // });


    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <DataTable data={records} columns={[
                    { label: 'title' },
                    { label: 'content' },
                    { label: 'createdAt', display: DateTimeDisplay },
                ]} />
            </CardContent>
        </Card>
    );
};