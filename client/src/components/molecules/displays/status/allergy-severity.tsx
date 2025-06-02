import { Badge } from "@/components/atoms/badge";
import { useTranslation } from "react-i18next";

const allergySeverityColors = {
    "mild": "bg-green-200 text-green-800",
    "moderate": "bg-yellow-200 text-yellow-800",
    "severe": "bg-red-200 text-red-800",
}

interface AllergySeverityProps {
    value: keyof typeof allergySeverityColors;
}

export const AllergySeverity = ({ value: status }: AllergySeverityProps) => {
    const { t } = useTranslation("data", { keyPrefix: "allergySeverity" })

    return <Badge 
        className={allergySeverityColors[status]}
        >    
            {t(status)}
        </Badge>;
};