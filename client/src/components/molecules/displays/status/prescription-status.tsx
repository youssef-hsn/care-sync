import { Badge } from "@/components/atoms/badge";
import { useTranslation } from "react-i18next";

const prescriptionStatusColors = {
    inactive: "bg-yellow-200 text-yellow-800",
    active: "bg-blue-200 text-blue-800",
    cancelled: "bg-red-200 text-red-800",
    completed: "bg-green-200 text-green-800",
}

// "active",
// "inactive",
// "completed",
// "cancelled",

interface PrescriptionStatusProps {
    value: keyof typeof prescriptionStatusColors;
}

export const PrescriptionStatus = ({ value: status }: PrescriptionStatusProps) => {
    const { t } = useTranslation("data", { keyPrefix: "prescriptionStates" })

    return <Badge 
        className={prescriptionStatusColors[status]}
        >    
            {t(status)}
        </Badge>;
};