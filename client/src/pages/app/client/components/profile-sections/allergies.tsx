import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/card";
import { DataTable } from "@/components/molecules/data-table";
import { DateTimeDisplay } from "@/components/molecules/displays/date-display";

interface AllergiesCardProps {
    clientID?: number;
    className?: string;
}

export const allergies = [ // TODO: remove this dummy
    {
        id: 1,
        name: 'Peanuts',
        discoveryDate: new Date('2023-10-01'),
    },
    {
        id: 2,
        name: 'Shellfish',
        discoveryDate: new Date('2023-10-01'),
    },
    {
        id: 3,
        name: 'Penicillin',
        discoveryDate: new Date('2023-10-01'),
    },
    {
        id: 4,
        name: 'Latex',
        discoveryDate: new Date('2023-10-01'),
    },
];

export const AllergiesCard: React.FC<AllergiesCardProps> = ({ className })=> (
    <Card className={className}>
        <CardHeader>
            <CardTitle>Allergies</CardTitle>
        </CardHeader>
        <CardContent>
            <DataTable
                data={allergies}
                columns={[
                    { label: 'id' },
                    { label: 'name' },
                    {
                        label: 'discoveryDate',
                        display: DateTimeDisplay
                    },
                ]}
            />
        </CardContent>
    </Card>
);