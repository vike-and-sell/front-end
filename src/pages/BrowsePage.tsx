import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaginationBar from "../components/Pagination";
import { Listing } from "../utils/interfaces";
import { arrayPagination } from "../utils/PaginationUtil";
import FilterListing from "../components/FilterListings";
import { FilterOptions } from "../utils/interfaces";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchBrowseListings } from "../utils/api";
import ErrorPage from "./ErrorPage";
import axios from "axios";

export default function BrowsePage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  let totalPages = 0;
  let activePageListing: Listing[] = [];
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: "",
    isDescending: true,
    maxPrice: "",
    minPrice: "",
    status: "",
    offset: 0,
  });

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  const {
    data: listings,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: [filterOptions, currentPage],
    queryFn: () =>
      fetchBrowseListings({
        ...filterOptions,
        offset: (currentPage - 1) * 30,
      }),
  });

  function goToPage(newPage: number) {
    setCurrentPage(newPage);
    navigate(`/browse/${newPage}`);
    scrollTop();
  }

  function handleNext() {
    goToPage(currentPage + 1);
  }

  function handlePrev() {
    goToPage(currentPage - 1);
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
      <main className="px-4">
        <PageHeading data-cy="page-heading" title="Browse Around"></PageHeading>
        <div className="flex justify-between">
          <FilterListing
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
          ></FilterListing>
          {isListingPending ? (
            <PaginationBarSkeleton></PaginationBarSkeleton>
          ) : (
            <PaginationBar
              currentPage={currentPage}
              hasMore={listings.length >= 30}
              handleNext={handleNext}
              handlePrev={handlePrev}
              goToPage={goToPage}
            ></PaginationBar>
          )}
        </div>
        {isListingPending ? (
          <ListingsGridSkeleton></ListingsGridSkeleton>
        ) : (
          <ListingsGrid ref={scrollRef}>
            {listings.map((listing: Listing) => (
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
