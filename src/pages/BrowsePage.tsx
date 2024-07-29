import { Spinner } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import FilterListing from "../components/FilterListings";
import InfiniteScrollingListingView from "../components/InfiniteScrollingListingView";
import PageHeading from "../components/PageHeading";
import { fetchBrowseListings } from "../utils/api";
import { FilterOptions, Listing } from "../utils/interfaces";

export default function BrowsePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    sortBy: "",
    isDescending: true,
    maxPrice: "",
    minPrice: "",
    status: "",
  });
  const listingsRef = useRef<Listing[]>();
  listingsRef.current = listings;
  const filterRef = useRef<FilterOptions>();
  filterRef.current = filterOptions;

  const filterOptionsHash = (fo: FilterOptions) =>
    `${fo.isDescending}${fo.maxPrice}${fo.minPrice}${fo.sortBy}${fo.status}`;

  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const resetListings = (fo: FilterOptions) => {
    fetchBrowseListings(fo).then((l) => {
      setListings(l);
    });
  };

  const updateFilterOptions = (newFilterOptions: FilterOptions) => {
    resetListings(newFilterOptions);
    setFilterOptions(newFilterOptions);
  };

  useEffect(() => {
    resetListings(filterOptions);
  }, []);

  const loadMore = (hash: string) => {
    if (
      filterRef.current &&
      listingsRef.current &&
      hash === filterOptionsHash(filterRef.current)
    ) {
      setIsLoadingMore(true);
      fetchBrowseListings(filterRef.current, listingsRef.current.length).then(
        (newListings) => {
          setIsLoadingMore(false);
          setListings((oldListings) => {
            return [...oldListings, ...newListings];
          });
        }
      );
    }
  };

  return (
    <>
      <main className="px-4">
        <PageHeading data-cy="page-heading" title="Browse Around"></PageHeading>
        <div className="flex justify-between">
          <FilterListing
            disableLocation={false}
            filterOptions={filterOptions}
            setFilterOptions={updateFilterOptions}
          ></FilterListing>
        </div>
        <InfiniteScrollingListingView
          listings={listings}
          loadMore={loadMore}
          hash={filterOptionsHash(filterOptions)}
        />
        {isLoadingMore && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </main>
    </>
  );
}
