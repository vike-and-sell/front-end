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
  const scrollRef = useRef<HTMLDivElement>(null);

  const filterOptionsHash = (fo: FilterOptions) =>
    `${fo.isDescending}${fo.maxPrice}${fo.minPrice}${fo.sortBy}${fo.status}`;

  const resetListings = (fo: FilterOptions) => {
    fetchBrowseListings(fo).then((l) => {
      setListings(l);
    });
  };

  const updateFilterOptions = (newFilterOptions: FilterOptions) => {
    resetListings(newFilterOptions);
    setFilterOptions(newFilterOptions);
    scrollRef.current?.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    resetListings(filterOptions);
  }, []);

  const loadMore = async (hash: string): Promise<void> => {
    return new Promise<void>(async (resolve) => {
      if (
        filterRef.current &&
        listingsRef.current &&
        hash === filterOptionsHash(filterRef.current)
      ) {
        const newListings = await fetchBrowseListings(
          filterRef.current,
          listingsRef.current.length
        );
        setListings((oldListings) => {
          return [...oldListings, ...newListings];
        });
        resolve();
      }
    });
  };

  return (
    <>
      <main className="px-4 overflow-y-hidden flex flex-col">
        <PageHeading data-cy="page-heading" title="Browse Around"></PageHeading>
        <div className="flex justify-between">
          <FilterListing
            disableLocation={false}
            filterOptions={filterOptions}
            setFilterOptions={updateFilterOptions}
          ></FilterListing>
        </div>
        <InfiniteScrollingListingView
          scrollRef={scrollRef}
          listings={listings}
          loadMore={loadMore}
          hash={filterOptionsHash(filterOptions)}
        />
      </main>
    </>
  );
}
