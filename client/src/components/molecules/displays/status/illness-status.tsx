import { Badge } from "@/components/atoms/badge";
import { useTranslation } from "react-i18next";

const illnessStatusColors = {
    recovered: "bg-green-200 text-green-800",
    active: "bg-yellow-200 text-yellow-800",
    under_treatment: "bg-blue-200 text-blue-800",
    chronic: "bg-red-200 text-red-800",
}

interface IllnessStatusProps {
    value: keyof typeof illnessStatusColors;
}

export const IllnessStatus = ({ value: status }: IllnessStatusProps) => {
    const { t } = useTranslation("data", { keyPrefix: "illnessStates" })

    return (
        <Badge 
            className={illnessStatusColors[status]}
        >    
            {t(status)}
        </Badge>
    )
};