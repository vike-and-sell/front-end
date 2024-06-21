import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { getListingIDs } from "../utils/FakeListingsMock";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaginationBar from "../components/Pagination";
import { Listing } from "../utils/interfaces";

export default function BrowsePage() {
  const MAX_LISTINGS_PAGE = 60;

  const { page } = useParams();
  const navigate = useNavigate();
  const defaultListings: Listing[] = getListingIDs(); // MOCKING
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [listings, setListings] = useState<Listing[]>(defaultListings); // This will get replaced
  const totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);

  // For future reference, we can use React Query with no super unique query that returns the data
  // array, we don't really need to use state or effect for this stuff

  const activePageListing = arrayPagination(
    listings,
    currentPage,
    MAX_LISTINGS_PAGE
  );

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/browse/${currentPage + 1}`);
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/browse/${currentPage - 1}`);
  }

  return (
    <>
      <main className='px-4'>
        <PageHeading title='Browse Around'></PageHeading>
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        ></PaginationBar>
        <ListingsGrid>
          {activePageListing.map((listing) => (
            <ListingCard listingInfo={listing}></ListingCard>
          ))}
        </ListingsGrid>
      </main>
    </>
  );
}

function arrayPagination(
  arr: Listing[],
  currentPage: number,
  maxListingsPerPage: number
) {
  const totalListings = arr.length - 1;
  const start = currentPage * maxListingsPerPage;
  if (start + maxListingsPerPage > totalListings) {
    return arr.slice(start);
  } else {
    return arr.slice(start, start + maxListingsPerPage);
  }
}
