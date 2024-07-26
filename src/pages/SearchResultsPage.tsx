import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PaginationBar from "../components/Pagination";
import { Listing, SearchResults, UserSearchItem } from "../utils/interfaces";
import { arrayPagination } from "../utils/PaginationUtil";
import FilterListing from "../components/FilterListings";
import { FilterOptions } from "../utils/interfaces";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";
import { useQuery } from "@tanstack/react-query";
import { queryListings } from "../utils/api";
import ErrorPage from "./ErrorPage";
import UserGrid from "../components/UserGrid";
import UserCard from "../components/UserCard";

export default function SearchResultsPage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchString, page } = useParams();
  const [searchListings, setSearchListings] = useState(true);
  const navigate = useNavigate();
  let totalPages = 0;
  let activePageListing: Listing[] | UserSearchItem[] = [];
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

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError,
  } = useQuery({
    queryKey: [searchString ? searchString : "", filterOptions],
    queryFn: () => {
      queryListings(searchString ? searchString : "", filterOptions);
      const searchResults: SearchResults = {
        listings: [
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
          {
            sellerId: "1",
            listingId: "1",
            title: "Example",
            price: 21,
            location: "NA",
            status: "AVAILABLE",
            listedAt: "2024-05-22T12:34:56Z",
            lastUpdatedAt: "2024-05-22T12:34:56Z",
          },
        ],
        users: [
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
          { username: "john_doe", userId: "1" },
        ],
      };
      return searchResults;
      // queryListings(searchString ? searchString : "", filterOptions);
    },
    enabled: searchListings,
  });

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/search/${searchString}/${currentPage + 1}`);
    scrollTop();
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/search/${searchString}/${currentPage - 1}`);
    scrollTop();
  }

  function resetPageIndexing() {
    setCurrentPage(1);
    navigate(`/search/${searchString}/1`);
    scrollTop();
  }

  function scrollTop() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Using scrollTop property
    }
  }

  // Logic to partition search results correct
  if (searchResults) {
    const subSearchResult: Listing[] | UserSearchItem[] = searchListings
      ? searchResults.listings
      : searchResults.users;
    totalPages = Math.ceil(subSearchResult.length / MAX_LISTINGS_PAGE);
    activePageListing = arrayPagination(
      subSearchResult,
      currentPage,
      MAX_LISTINGS_PAGE
    );
  }

  if (isError) {
    return (
      <ErrorPage>Unable to load search results, please try again.</ErrorPage>
    );
  }

  return (
    <>
      <main className="px-4">
        <PageHeading title={`Results for "${searchString}"`}></PageHeading>
        <div className="flex justify-between">
          <div className="flex items-center gap-4 mb-4" id="search-tool-bar">
            <FilterListing
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            ></FilterListing>
            <div className="flex gap-2 text-sm">
              <button
                className={`px-3 py-1 ${
                  searchListings
                    ? "bg-pri-blue text-acc-blue"
                    : "bg-acc-blue text-pri-blue"
                } rounded-full`}
                onClick={() => {
                  if (searchListings) return;
                  resetPageIndexing();
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
                  resetPageIndexing();
                  setSearchListings(false); // In theory this automatically triggers refresh / refetch
                }}
              >
                Users
              </button>
            </div>
          </div>

          {isSearchLoading ? (
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
          isSearchLoading ? (
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
          <UserGrid ref={scrollRef}>
            {activePageListing.map((user) => (
              <UserCard username={user.username} key={user.userId}></UserCard>
            ))}
          </UserGrid>
        )}
      </main>
    </>
  );
}
