import { Divider } from "@chakra-ui/react";
import { Charity } from "../utils/interfaces";

import PageHeading from "../components/PageHeading";
import CharityCard from "../components/CharityCard";

export default function CharityPage() {
  const charityInfo: Charity = {
    name: "The Salvation Army",
    status: "AVAILABLE",
    fund: 20,
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/The_Salvation_Army.svg/300px-The_Salvation_Army.svg.png",
    startDate: "2024-05-22T12:34:56Z",
    endDate: "2024-07-18T12:34:56Z",
    numListings: 69,
  };

  const charityInfo2: Charity = {
    name: "BC Cancer",
    status: "AVAILABLE",
    fund: 100,
    logoUrl:
      "https://www.cgen.ca/wp-content/uploads/2018/02/BC-Cancer-logo.png",
    startDate: "2024-05-22T12:34:56Z",
    endDate: "2024-07-12T12:34:56Z",
    numListings: 69,
  };

  return (
    <main className='px-4'>
      <PageHeading title='Charities'></PageHeading>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Active Charity
      </h2>
      <div className='flex flex-col p-4'>
        <CharityCard charityInfo={charityInfo}></CharityCard>
      </div>
      <Divider mb='4px'></Divider>
      <h2 className='font-semibold text-pri-blue text-xl p-0'>
        Past Charities
      </h2>
      <div className='flex flex-col p-4'>
        <CharityCard charityInfo={charityInfo2}></CharityCard>
      </div>
    </main>
  );
}
