import { PaymentStatus } from "@/components/molecules/displays/status/payment-status";
import { DateDisplay } from "@/components/molecules/displays/date-display";
import { createGetter } from "@/services/client.service";
import { TableCard } from "@/components/organisms/table-card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/button";

const clickableBills = ({value: billID}: {value: any}) => {
    const navigate = useNavigate()

    return (
        <Button
        variant="outline"
        size="sm"
        onClick={() => {
            navigate(`/bills/${billID}`)
        }}>
            #{billID}
        </Button>
    )
}


interface BillsProps {
    clientID: number;
    className?: string;
}

export const getBills = createGetter("bills")

export const Bills = ({ clientID, className }: BillsProps) => {

    return (
        <TableCard
            title="Bills"
            service={getBills}
            clientID={clientID}
            columns={[
                { label: 'billID', display: clickableBills },
                { label: 'createdAt', display: DateDisplay },
                { label: 'total' },
                { label: 'status', display: PaymentStatus },
            ]}
            className={className}
        />
    );
};
