import LoadingPage from "@/pages/state/loading";
import { getClient } from "@/services/client.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ClientCard } from "./components/client-card";
import { Prescriptions } from "./components/profile-sections/prescriptions";
import { Bills } from "./components/profile-sections/bills";
import { Records } from "./components/profile-sections/records";
import { Appointments } from "./components/profile-sections/appointments";
import { Reports } from "./components/profile-sections/reports";
import { AllergiesCard } from "./components/profile-sections/allergies";

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
        <div className="m-1 flex flex-wrap gap-5 justify-center md:justify-start">
            <ClientCard client={client} noActions />
            <Prescriptions clientID={Number(id)} className="w-full md:w-2/3" />
            <Records clientID={Number(id)} className="w-full md:w-1/2" />
            <AllergiesCard clientID={Number(id)} className="w-full md:w-48/100" />
            <Reports clientID={Number(id)} className="w-full md:w-48/100" />
            <Appointments clientID={Number(id)} className="w-full md:w-1/2" />
            <Bills clientID={Number(id)} className="w-full" />
        </div>
    )
}

export default ClientProfilePage;