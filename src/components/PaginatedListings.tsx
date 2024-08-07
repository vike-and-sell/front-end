import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleListing } from '../utils/api';
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import PaginationBar from "../components/Pagination";
import { Listing } from "../utils/interfaces";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";

interface PaginatedListingsProps{
    listingIds: number[];
    accordionIndex: number;
    indexTitle: string;
    isOpen: boolean;
}

export default function PaginatedListings({ listingIds, accordionIndex, indexTitle, isOpen }:PaginatedListingsProps) {
  const MAX_LISTINGS_PAGE = 10;
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [accordionIndex]);

  const currentListingIds = listingIds.slice(
    (currentPage - 1) * MAX_LISTINGS_PAGE,
    currentPage * MAX_LISTINGS_PAGE
  );

  const { 
    data: listings, 
    isFetching, 
    isError, 
    error
  } = useQuery({
    queryKey: [currentPage, currentListingIds],
    queryFn: async () => {
      const listingPromises = currentListingIds.map((id) => fetchSingleListing(id.toString()));
      return Promise.all(listingPromises);
    },
    enabled: isOpen && currentListingIds.length > 0,
  });

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    navigate(`/myprofile/${indexTitle}/${currentPage + 1}`);
    scrollTop();
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
    navigate(`/myprofile/${indexTitle}/${currentPage - 1}`);
    scrollTop();
  };

  const scrollTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  };

  let totalPages = 1;
  let activePageListing: Listing[] = [];
  if (listings) {
    totalPages = Math.ceil(listingIds.length / MAX_LISTINGS_PAGE);
    const urlPage = page ? +page : 1;
    if (urlPage > totalPages && isOpen) {
      navigate(`/myprofile/${indexTitle}/1`);
    }
    activePageListing = listings;
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
      {isFetching ? (
        <>
          <PaginationBarSkeleton />
          <ListingsGridSkeleton />
        </>
      ) : (
        <>
          {
           activePageListing.length > 0 ? (
            <div>
              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />

              <ListingsGrid ref={scrollRef}>
                {activePageListing.map((listing) => (
                  <ListingCard
                    listingInfo={listing}
                    key={listing.listingId}
                  ></ListingCard>
                ))}
              </ListingsGrid>
            </div>
            
           ):(
            <div className="text-center">
              No listings {indexTitle}
            </div>
           )
          }
          
        </>
      )}
    </>
  );
};