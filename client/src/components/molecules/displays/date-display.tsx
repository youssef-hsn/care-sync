 import { Badge } from "@/components/atoms/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/atoms/tooltip";
import { format } from "date-fns";

interface DateDisplayProps {
    value: Date;
}

export const DateDisplay = ({ value: date }: DateDisplayProps) => {
    const formattedDate = format(date, "dd/MM/yyyy");

    return (
        <Badge variant="outline" className="font-normal">
            {formattedDate}
        </Badge>
    );
}

export const DateTimeDisplay = ({ value: date }: DateDisplayProps) => {
    const tooltipTime = format(date, "HH:mm:ss");

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="cursor-help">
                    <DateDisplay value={date} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Time: {tooltipTime}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
