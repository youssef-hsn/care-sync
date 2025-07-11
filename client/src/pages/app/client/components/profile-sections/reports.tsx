import { DateTimeDisplay } from "@/components/molecules/displays/date-display";
import { SectionProps } from "./section-props";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { AppointmentStatus } from "@/components/molecules/displays/status/appointment-status";

export const getReports = createGetter("reports")

export const Reports: React.FC<SectionProps> = ({ className, clientID }) => {
    return (
        <TableCard 
            title="Reports"
            clientID={clientID}
            service={getReports}
            columns={[
                { label: 'title' },
                { label: 'createdAt', display: DateTimeDisplay },
                { label: 'status', display: AppointmentStatus },
            ]}
            className={className}
        />
    );
};