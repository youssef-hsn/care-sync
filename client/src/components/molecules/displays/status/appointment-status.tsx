import { Badge } from "@/components/atoms/badge";
import { useTranslation } from "react-i18next";

const appointmentStatusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    confirmed: "bg-blue-200 text-blue-800",
    cancelled: "bg-red-200 text-red-800",
    completed: "bg-green-200 text-green-800",
}

interface AppointmentStatusProps {
    value: keyof typeof appointmentStatusColors;
}

export const AppointmentStatus = ({ value: status }: AppointmentStatusProps) => {
    const { t } = useTranslation("data", { keyPrefix: "appointmentStates" })

    return <Badge 
        variant={status === 'completed' ? 'default' : 'secondary'}
        className={appointmentStatusColors[status]}
        >    
            {t(status)}
        </Badge>;
};