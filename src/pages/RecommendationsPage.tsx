import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";
import { arrayPagination } from "../utils/PaginationUtil";
import { ListingsGridSkeleton } from "../components/Skeletons/ListingGridSkeleton";
import PaginationBarSkeleton from "../components/Skeletons/PaginationSkeleton";
import { Listing } from "../utils/interfaces";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginationBar from "../components/Pagination";
import { getRecommendations } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import { PriBlueButton } from "../components/Button";
import ButtonSkeleton from "../components/Skeletons/ButtonSkeleton";

export default function RecommendationsPage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const [showCharities, setShowCharities] = useState(true);
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  let activePageListing: Listing[] = [];
  let totalPages = 0;

  const {
    data: listings,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: [showCharities],
    queryFn: () => getRecommendations(),
  });

  if (listings) {
    const subSearchResult = showCharities
      ? listings
      : listings.filter((listing: Listing) => !listing.forCharity);

    totalPages = Math.max(
      Math.ceil(subSearchResult.length / MAX_LISTINGS_PAGE),
      1
    );

    const urlPage = page ? +page : 1;
    if (urlPage > totalPages) {
      navigate(`/search/${subSearchResult}/1`);
    }

    activePageListing = arrayPagination(
      subSearchResult,
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

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/recommendations/${currentPage + 1}`);
    scrollTop();
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/recommendations/${currentPage - 1}`);
    scrollTop();
  }

  function scrollTop() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Using scrollTop property
    }
  }

  return (
    <>
      <main className='px-4'>
        <PageHeading title='Your Recommendations'></PageHeading>
        {isListingPending ? (
          <>
            <div className='flex justify-between mt-4 mb-4'>
              <ButtonSkeleton></ButtonSkeleton>
              <PaginationBarSkeleton></PaginationBarSkeleton>
            </div>
            <ListingsGridSkeleton></ListingsGridSkeleton>
          </>
        ) : (
          <>
            <div className='flex justify-between mt-4 mb-4'>
              {showCharities ? (
                <PriBlueButton
                  title='Hide Charities'
                  clickHandle={() => {
                    setShowCharities(false);
                    setCurrentPage(1);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTop = 0; // Using scrollTop property
                    }
                    navigate(`/recommendations/1`);
                  }}
                ></PriBlueButton>
              ) : (
                <PriBlueButton
                  title='Show Charities'
                  clickHandle={() => {
                    setShowCharities(true);
                    setCurrentPage(1);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTop = 0; // Using scrollTop property
                    }
                    navigate(`/recommendations/1`);
                  }}
                ></PriBlueButton>
              )}

              <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handlePrev={handlePrev}
              ></PaginationBar>
            </div>
            {activePageListing.length != 0 ? (
              <ListingsGrid ref={scrollRef}>
                {activePageListing.map((listing) => {
                  return (
                    <ListingCard
                      listingInfo={listing}
                      key={listing.listingId}
                    ></ListingCard>
                  );
                })}
              </ListingsGrid>
            ) : (
              <div>No reccomendations, try browsing some more</div>
            )}
          </>
        )}
      </main>
    </>
  );
}
