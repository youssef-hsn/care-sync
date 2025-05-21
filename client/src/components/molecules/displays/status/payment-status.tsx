import { Badge } from "@/components/atoms/badge"
import { useTranslation } from "react-i18next"

export const paymentStatusColors = {
    pending: "bg-yellow-200 text-yellow-800",
    paid: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800",
    partial: "bg-orange-200 text-orange-800",
}

export function PaymentStatus (props: {value: keyof typeof paymentStatusColors}) {
    const { t } = useTranslation("data", { keyPrefix: "paymentStates" })

    return <Badge className={paymentStatusColors[props.value]}>
        {t(props.value)}
    </Badge>
}