import { Divider } from "@chakra-ui/react";
import { Charity } from "../utils/interfaces";
import PageHeading from "../components/PageHeading";
import CharityCard from "../components/CharityCard";
import { getCharities } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import CharityPageSkeleton from "../components/Skeletons/CharityPageSkeleton";

export default function CharityPage() {
  const {
    data: charities,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["charities"], queryFn: getCharities });

  // Loading Page here
  if (isLoading) {
    return <CharityPageSkeleton></CharityPageSkeleton>;
  }

  // Error Message
  if (isError) {
    return <ErrorPage>{error.message}</ErrorPage>;
  }

  const activeCharities = charities.filter(
    (charity: Charity) => charity.status == "AVAILABLE"
  );
  const pastCharities = charities.filter(
    (charity: Charity) => charity.status != "AVAILABLE"
  );

  return (
    <main className='px-4'>
      <PageHeading title='Charities'></PageHeading>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Active Charity
      </h2>
      <div className='flex flex-col p-4 gap-3'>
        {activeCharities.length == 0 ? (
          <div>No Active Charities</div>
        ) : (
          activeCharities.map((charity: Charity) => (
            <CharityCard charityInfo={charity} key={charity.name}></CharityCard>
          ))
        )}
      </div>
      <Divider mb='4px'></Divider>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Past Charities
      </h2>
      <div className='flex flex-col p-4'>
        {pastCharities.length == 0 ? (
          <div>Nothing here yet...</div>
        ) : (
          pastCharities.map((charity: Charity) => (
            <CharityCard charityInfo={charity} key={charity.name}></CharityCard>
          ))
        )}
      </div>
    </main>
  );
}
