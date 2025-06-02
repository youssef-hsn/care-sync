import { SectionProps } from "./section-props";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { DateDisplay } from "@/components/molecules/displays/date-display";
import { IllnessStatus } from "@/components/molecules/displays/status/illness-status";
import { IllnessHistoryActions } from "../tools/illness-actions";

export const getIllnessHistory = createGetter("illness-history")

export const IllnessHistory: React.FC<SectionProps> = ({ className, clientID }) => {
    return (
        <TableCard 
            title="Illness History"
            clientID={clientID}
            service={getIllnessHistory}
            columns={[
                { label: 'illnessName', header: 'Illness' },
                { label: 'status', header: 'Status', display: IllnessStatus },
                { label: 'createdAt', display: DateDisplay, header: 'Discovery' },
                { label: 'description', },
            ]}
            className={className}
            actions={<IllnessHistoryActions clientID={clientID} />}
        />
    );
};