import {
  Prescriptions,
  Bills,
  Records,
  Appointments,
  Reports,
  AllergiesCard,
} from "@/pages/app/client/components/profile-sections";
import { useIdentityStore } from "@/lib/stores/identity.store";
import { PageCard } from "@/components/organisms/page-card";
import { Machine, MachineCard } from "@/pages/app/machine/components/machine-card";

const data: Machine[] = [
    {
        id: 1,
        name: "Machine 1",
        description: "Description 1",
        price: 1000,
        status: "Active",
    },
    {
        id: 2,
        name: "Machine 2",
        description: "Description 2",
        price: 2000,
        status: "Active",
    },
    {
        id: 3,
        name: "Machine 3",
        description: "Description 3",
        price: 3000,
        status: "Active",
    },
]

const DashboardPage = () => {
    const { id } = useIdentityStore();

    // const { data: client, isLoading } = useQuery({
    //     queryKey: ['client', id],
    //     queryFn: () => getClient(id),
    // })

    // if (isLoading || !client) {
    //     return <LoadingPage />
    // }

    return (
        <div className="m-1 flex flex-wrap gap-5">
            <Prescriptions clientID={Number(id)} className="w-full" />
            <Records clientID={Number(id)} className="w-full md:w-1/2" />
            <AllergiesCard clientID={Number(id)} className="w-full md:w-48/100" />
            <Reports clientID={Number(id)} className="w-full md:w-48/100" />
            <Appointments clientID={Number(id)} className="w-full md:w-1/2" />
            <Bills clientID={Number(id)} className="w-full" />
            <PageCard 
                title="Your Machines" 
                description="Here you can see all the machines you have registered" 
                buttonText="Register Machine" 
                buttonAction={() => {}} 
                onSearchBarChange={() => {}} 
                className="w-full"
            />
            {data.map((machine) => (
                <MachineCard machine={machine} />
            ))}
        </div>
    )
}

export default DashboardPage;