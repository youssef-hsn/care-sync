import { DateDisplay } from "@/components/molecules/displays/date-display";
import { SectionProps } from "./section-props";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { PrescriptionActions } from "../tools/prescription-actions";
import { PrescriptionStatus } from "@/components/molecules/displays/status/prescription-status";

export const getPrescriptions = createGetter("prescriptions")

export const Prescriptions: React.FC<SectionProps> = ({ className, clientID }) => {
    return (
        <TableCard 
            title="Prescriptions"
            clientID={clientID}
            service={getPrescriptions}
            columns={[
                { label: 'medication' },
                { label: 'dosage' },
                { label: 'frequency' },
                { label: 'endDate', display: DateDisplay },
                { label: 'status', display: PrescriptionStatus },
                { label: 'instructions' },
            ]}
            className={className}
            actions={<PrescriptionActions clientID={clientID} />}
        />
    );
};