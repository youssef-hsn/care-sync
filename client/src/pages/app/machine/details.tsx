import { useParams } from "react-router-dom";
import { MachineCard } from "./components/machine-card";
import { ProfitPie, InvestorsCard} from "./components/details-sections";
import CharityCard from "../charity/components/charity-card";
import { Appointments, Bills } from "../client/components/profile-sections";

const MachineDetailsPage = () => {
    const { id } = useParams();

    if (!id || isNaN(Number(id))) {
        return <div>Machine ID should be a number</div>
    }

    // const { data: client, isLoading } = useQuery({
    //     queryKey: ['client', id],
    //     queryFn: () => getClient(id),
    // })

    // if (isLoading || !client) {
    //     return <LoadingPage />
    // }

    return (
        <div className="m-1 flex flex-wrap gap-5 justify-center md:justify-start">
            <MachineCard machine={{
                id: Number(id),
                name: "Machine " + id,
                status: "Active",
                location: "Location " + id,
                description: "Description for machine " + id,
                price: 100,
                lastMaintenance: new Date(),
                nextMaintenance: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days from now
            }} noActions />
            <InvestorsCard machineID={Number(id)}/>
            <Appointments clientID={1} className="w-full md:w-65/100" />
            <CharityCard charity={{
                id: 1,
                name: "Charity " + id,
                description: "Description for charity " + id,
                location: "Location " + id,
                founded: new Date(),
                totalDonations: 1000,
                status: "Active",
            }} />
            <ProfitPie/>
            <Bills clientID={1} className="w-full md:w-68/100" />
        </div>
    )
}

export default MachineDetailsPage;