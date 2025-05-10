import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import LoadingPage from "@/pages/state/loading";
import { getClient } from "@/services/client.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ClientCard } from "./components/client-card";

const ClientProfilePage = () => {
    const { id } = useParams();

    if (!id || isNaN(Number(id))) {
        return <div>Client ID should be a number</div>
    }

    const { data: client, isLoading } = useQuery({
        queryKey: ['client', id],
        queryFn: () => getClient(id),
    })

    if (isLoading || !client) {
        return <LoadingPage />
    }

    return (
        <div className="m-1 flex flex-wrap gap-5">
            <ClientCard client={client} noActions />
            <Card className="w-full md:w-2/3">
                {/* Prescriptions */}
            </Card>
            <Card className="w-full md:w-5/6">
                {/* Bills */}
            </Card>
            <Card className="w-full md:w-1/4">
                {/* Notes */}
            </Card>
            <Card className="w-full md:w-1/3">
                {/* Appointments */}
            </Card>
            <Card className="w-full md:w-1/4">
                {/* Documents */}
            </Card>
            <Card className="w-full md:w-1/4">
                {/* Allergies */}
            </Card>
        </div>
    )
}

export default ClientProfilePage;