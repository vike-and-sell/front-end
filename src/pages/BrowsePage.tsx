import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs } from "../utils/FakeListingsMock";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaginationBar from "../components/Pagination";
import { Listing } from "../utils/interfaces";
import { arrayPagination } from "../utils/PaginationUtil";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";

export default function BrowsePage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const defaultListings: Listing[] = getListingIDs(); // MOCKING
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [listings, setListings] = useState<Listing[]>(defaultListings); // This will get replaced
  const totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);
  const isLoading = false;
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
    navigate(`/browse/${currentPage + 1}`);
    scrollTop();
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/browse/${currentPage - 1}`);
    scrollTop();
  }

  function scrollTop() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Using scrollTop property
    }
  }

  return (
    <>
      <main className="px-4">
        <PageHeading title="Browse Around"></PageHeading>
        {isLoading ? (
          <PaginationBarSkeleton></PaginationBarSkeleton>
        ) : (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrev={handlePrev}
          ></PaginationBar>
        )}

        {isLoading ? (
          <ListingsGridSkeleton></ListingsGridSkeleton>
        ) : (
          <ListingsGrid ref={scrollRef}>
            {activePageListing.map((listing) => (
              <ListingCard
                listingInfo={listing}
                key={listing.listingId}
              ></ListingCard>
            ))}
          </ListingsGrid>
        )}
      </main>
    </>
  );
}
