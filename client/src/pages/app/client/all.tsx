import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/client.service";
import { ClientCard } from "./components/client-card";
import { Client } from "caresync/types/client";
import CenterDisplay from "@/components/templates/center-display";
import LoadingPage from "@/pages/state/loading";

export default function ClientsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      return await getClients({ page: 0, size: 10 })},
    refetchOnWindowFocus: true,
  });


  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <CenterDisplay>No clients found</CenterDisplay>
  } 
  
  return (
    <div className="m-1 flex flex-wrap gap-5 justify-start">
      {data.map((client: Client) => (
        <ClientCard key={client.clientID} client={client} />
      ))}
    </div>
  )
}