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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBrowseListings } from "../utils/api";
import ErrorPage from "./ErrorPage";
import UserGrid from "../components/UserGrid";

export default function SearchResultsPage() {
  // Create a few dummy objects to insert into the page for now

  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchString, page } = useParams();
  const [searchListings, setSearchListings] = useState(true);
  const queryClient = useQueryClient();

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
  });

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  if (searchListings) {
    console.log("Searching for listings");
  } else {
    console.log("Canceling serach for listings");
    console.log("Searching for users");
  }

  const {
    data: listings,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: [searchString, currentPage, filterOptions, searchListings],
    queryFn: () => fetchBrowseListings(filterOptions),
    enabled: searchListings,
  });

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

  if (listings) {
    totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);
    activePageListing = arrayPagination(
      listings,
      currentPage,
      MAX_LISTINGS_PAGE
    );
  }

  if (isError) {
    return <ErrorPage>{error.response.data.message}</ErrorPage>;
  }
  return (
    <>
      <main className='px-4'>
        <PageHeading title={`Results for "${searchString}"`}></PageHeading>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <FilterListing
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            ></FilterListing>
            <div className='flex gap-2 text-sm'>
              <button
                className={`px-3 py-1 ${
                  searchListings
                    ? "bg-pri-blue text-acc-blue"
                    : "bg-acc-blue text-pri-blue"
                } rounded-full`}
                onClick={() => {
                  if (searchListings) return;
                  setSearchListings(true); // In theory this automatically triggers refresh / refetch
                }}
              >
                Listings
              </button>
              <button
                className={`px-3 py-1 ${
                  !searchListings
                    ? "bg-pri-blue text-acc-blue"
                    : "bg-acc-blue text-pri-blue"
                } rounded-full`}
                onClick={() => {
                  if (!searchListings) return;
                  queryClient.cancelQueries({
                    queryKey: [
                      searchString,
                      currentPage,
                      filterOptions,
                      searchListings,
                    ],
                  });
                  setSearchListings(false); // In theory this automatically triggers refresh / refetch
                }}
              >
                Users
              </button>
            </div>
          </div>

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

        {searchListings ? (
          isListingPending ? (
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
          )
        ) : (
          <UserGrid>
            <div>demo</div>
          </UserGrid>
        )}
      </main>
    </>
  );
}
