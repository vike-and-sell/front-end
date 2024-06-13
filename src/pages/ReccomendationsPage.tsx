import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs, getListingInfoFromID } from "../utils/FakeListingsMock";
import { useState } from "react";

export default function ReccomendationsPage() {
  const [listingID];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <main className='px-4'>
        <PageHeading title='Your Reccomendations'></PageHeading>
        <ListingsGrid></ListingsGrid>
      </main>
    </>
  );
}
