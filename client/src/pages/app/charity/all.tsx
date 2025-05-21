import { PageCard } from "@/components/organisms/page-card";
import { CharityCard, Charity } from "./components/charity-card";

const data: Charity[] = [
    {
        id: 1,
        name: "Charity 1",
        description: "Description 1",
        location: "Location 1",
        founded: new Date("2020-01-01"),
    },
    {
        id: 2,
        name: "Charity 2",
        description: "Description 2",
        location: "Location 2",
        founded: new Date("2019-01-01"),
    },
    {
        id: 3,
        name: "Charity 3",
        description: "Description 3",
        location: "Location 3",
        founded: new Date("2021-01-01"),
    },
]

export default function CharitiesPage() {
  return (
    <div className="m-1 flex flex-col gap-5 justify-start">
      <PageCard 
        title="Charities" 
        description="Here you can see all the charities registered in the system" 
        buttonText="Register Charity" 
        buttonAction={() => {}} 
        onSearchBarChange={() => {}}
      />
      <div className="flex flex-wrap gap-5 justify-start">
        {data.map((charity: Charity) => (
          <CharityCard charity={charity} />
        ))}
      </div>
    </div>
  );
}