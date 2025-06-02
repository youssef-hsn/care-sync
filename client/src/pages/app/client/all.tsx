import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/services/client.service";
import { ClientCard } from "./components/client-card";
import { Client } from "caresync/types/client";
import LoadingPage from "@/pages/state/loading";
import { PageCard } from "@/components/organisms/page-card";
import { useState } from "react";
import { DialogHeader, DialogTitle } from "@/components/atoms/dialog";
import { DialogContent } from "@/components/atoms/dialog";
import { Dialog } from "@/components/atoms/dialog";
import { CreateClientForm } from "@/components/common/forms/create-client";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, error } = useQuery({
    queryKey: ['clients', search],
    queryFn: async () => {
      return await getClients({ page: 1, size: 10, search: search })
    },
    refetchOnWindowFocus: true,
  });
  
  return (

    <div className="m-1 flex flex-col gap-5 justify-start">
      <PageCard 
        title="Clients" 
        description="Here you can see all the clients registered in the system" 
        buttonText="Register Client" 
        buttonAction={() => {
          setIsDialogOpen(true);
        }} 
        onSearchBarChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
      />

      <div className="flex flex-col gap-5 justify-center items-center">
        {error && <div>Error: {error.message}</div>}
        {isLoading && <LoadingPage />}
        {(!data || data.length === 0) && <div>No clients found</div>}
      </div>
      
      <div className="flex flex-wrap gap-5 justify-start">
        {data &&data.map((client: Client) => (
          <ClientCard key={client.clientID} client={client} />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New</DialogTitle>
            </DialogHeader>
            <CreateClientForm onComplete={() => {
              setIsDialogOpen(false);
            }} />
          </DialogContent>
        </Dialog>
    </div>
    
  )
}