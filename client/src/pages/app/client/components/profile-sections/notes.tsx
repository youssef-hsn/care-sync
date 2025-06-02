import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { SectionProps } from "./section-props";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { NotesActions } from "../tools/notes-actions";

export const getRecords = createGetter("records")

export const Records: React.FC<SectionProps> = ({ className, clientID }) => {
    return (
        <TableCard 
            title="Notes"
            clientID={clientID}
            service={getRecords}
            columns={[
                { label: 'title' },
                { label: 'details', header: 'Content' },
                { label: 'createdAt', display: DateTimeDisplay },
            ]}
            className={className}
            actions={<NotesActions clientID={clientID} />}
        />
    );
};