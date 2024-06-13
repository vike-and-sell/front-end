import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs } from "../utils/FakeListingsMock";
import { useState } from "react";

export default function ReccomendationsPage() {
  const defaultListings = getListingIDs();
  const [listingIDs, setListingsIDs] = useState(defaultListings);
  const [currentPage, setCurrentPage] = useState(0);
  console.log(listingIDs);
  return (
    <>
      <main className='px-4'>
        <PageHeading title='Your Reccomendations'></PageHeading>
        <ListingsGrid>
          {listingIDs.map((listingID) => (
            <ListingCard listingID={listingID}></ListingCard>
          ))}
        </ListingsGrid>
      </main>
    </>
  );
}
