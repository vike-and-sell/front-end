import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs } from "../utils/FakeListingsMock";
import { useState } from "react";

// TODO : There currently exists an issue with the reccomendations page being the main page as it makes pagination a little bit harder
// TODO : We might have to add a random how screen with some filler information as like a home page? Other companies defeat this by just using
// TODO : Infinite scrolling which we can try doing then?

export default function ReccomendationsPage() {
  const defaultListings = getListingIDs();
  const [listingIDs, setListingsIDs] = useState(defaultListings);

  return (
    <>
      <main className="px-4">
        <PageHeading title="Your Reccomendations"></PageHeading>
        <ListingsGrid>
          {listingIDs.map((listingID) => (
            <ListingCard listingID={listingID}></ListingCard>
          ))}
        </ListingsGrid>
      </main>
    </>
  );
}
