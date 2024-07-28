import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { arrayPagination } from "../utils/PaginationUtil";
import { fetchMyListings } from "../utils/api";
import { Listing } from "../utils/interfaces";
import ErrorPage from "./ErrorPage";
import PageHeading from "../components/PageHeading";
import { ListingCard } from "../components/ListingCard";
import ListingsGrid from "../components/ListingsGrid";
import PaginationBar from "../components/Pagination";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";
import axios from "axios";

export default function MyListings() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  let totalPages = 0;
  let activePageListing: Listing[] = [];
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  const {
    data: listings,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: [currentPage],
    queryFn: fetchMyListings,
  });

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/mylistings/${currentPage + 1}`);
    scrollTop();
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/mylistings/${currentPage - 1}`);
    scrollTop();
  }

  function scrollTop() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Using scrollTop property
    }
  }

  if (listings) {
    totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);
    activePageListing = arrayPagination(
      listings,
      currentPage,
      MAX_LISTINGS_PAGE
    );
  }

  if (isError) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : error.message;
    return <ErrorPage>{errorMessage}</ErrorPage>;
  }

  return (
    <>
      <main className='px-4'>
        <PageHeading data-cy='page-heading' title='My Listings'></PageHeading>
        <div className='flex justify-end'>
          {isListingPending ? (
            <PaginationBarSkeleton></PaginationBarSkeleton>
          ) : (
            <PaginationBar
              currentPage={currentPage}
              totalPages={totalPages}
              handleNext={handleNext}
              handlePrev={handlePrev}
            ></PaginationBar>
          )}
        </div>
        {isListingPending ? (
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
