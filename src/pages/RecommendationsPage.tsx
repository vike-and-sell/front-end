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
import ButtonSkeleton from "../components/Skeletons/ButtonSkeleton";

export default function RecommendationsPage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  let activePageListing: Listing[] = [];
  let totalPages = 0;

  const {
    data: listings,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: [],
    queryFn: () => getRecommendations(),
  });

  if (listings) {
    totalPages = Math.max(Math.ceil(listings.length / MAX_LISTINGS_PAGE), 1);

    const urlPage = page ? +page : 1;
    if (urlPage > totalPages) {
      navigate(`/reccomendations/1`);
    }

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
      <main className="px-4">
        <PageHeading title="Your Recommendations"></PageHeading>
        {isListingPending ? (
          <>
            <div className="flex justify-end mt-4 mb-4">
              <PaginationBarSkeleton></PaginationBarSkeleton>
            </div>
            <ListingsGridSkeleton></ListingsGridSkeleton>
          </>
        ) : (
          <>
            <div className="flex justify-end mt-4 mb-4">
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
