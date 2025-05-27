import { useQuery } from "@tanstack/react-query";
import { getMachines } from "@/services/machine.service";
import { MachineCard } from "./components/machine-card";
import CenterDisplay from "@/components/templates/center-display";
import LoadingPage from "@/pages/state/loading";
import { PageCard } from "@/components/organisms/page-card";

interface Machine {
  id: number
  name: string
  description: string
  price: number
  status: string
}

export default function MachinesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['machines'],
    queryFn: getMachines,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <CenterDisplay>No machines found</CenterDisplay>
  } 
  
  return (
    <div className="m-1 flex flex-col gap-5 justify-start">
        <PageCard 
            title="Machines" 
            description="Here you can see all the machines registered in the system" 
            buttonText="Register Machine" 
            buttonAction={() => {}}
        />
        <div className="flex flex-wrap gap-5 justify-start">
        {data.map((machine: Machine) => (
            <MachineCard key={machine.id} machine={machine} />
        ))}
        </div>
    </div>
  )
}
