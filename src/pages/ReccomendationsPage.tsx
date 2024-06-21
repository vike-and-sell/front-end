import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs } from "../utils/FakeListingsMock";
import { arrayPagination } from "../utils/PaginationUtil";
import { Listing } from "../utils/interfaces";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginationBar from "../components/Pagination";

// TODO : There currently exists an issue with the reccomendations page being the main page as it makes pagination a little bit harder
// TODO : We might have to add a random how screen with some filler information as like a home page? Other companies defeat this by just using
// TODO : Infinite scrolling which we can try doing then?

export default function ReccomendationsPage() {
  const MAX_LISTINGS_PAGE = 15;

  const { page } = useParams();
  const navigate = useNavigate();
  const defaultListings: Listing[] = getListingIDs(); // MOCKING
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [listings, setListings] = useState<Listing[]>(defaultListings); // This will get replaced
  const totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  // For future reference, we can use React Query with no super unique query that returns the data
  // array, we don't really need to use state or effect for this stuff
  // TODO : Need to add an effect or useQuery that changes when the page params change?

  const activePageListing = arrayPagination(
    listings,
    currentPage,
    MAX_LISTINGS_PAGE
  );

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/reccomendations/${currentPage + 1}`);
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/reccomendations/${currentPage - 1}`);
  }

  return (
    <>
      <main className='px-4'>
        <PageHeading title='Your Reccomendations'></PageHeading>
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        ></PaginationBar>
        <ListingsGrid>
          {activePageListing.map((listing) => {
            console.log("hello");
            console.log(listing);
            return (
              <ListingCard
                listingInfo={listing}
                key={listing.listingId}
              ></ListingCard>
            );
          })}
        </ListingsGrid>
      </main>
    </>
  );
}
