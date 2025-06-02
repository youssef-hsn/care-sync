import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { SectionProps } from "./section-props";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { AllergyActions } from "../tools/allergy-actions";

export const getAllergies = createGetter("allergies")

export const AllergiesCard: React.FC<SectionProps> = ({ className, clientID }) => {
    return (
        <TableCard 
            title="Allergies"
            clientID={clientID}
            service={getAllergies}
            columns={[
                { label: 'name' },
                { label: 'severity' },
                {
                    label: 'discoveryDate',
                    display: DateTimeDisplay
                },
            ]}
            className={className}
            actions={<AllergyActions clientID={clientID} />}
        />
    );
};