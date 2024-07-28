import PageHeading from "../components/PageHeading";
import ListingsGrid from "../components/ListingsGrid";
import { ListingCard } from "../components/ListingCard";

import { arrayPagination } from "../utils/PaginationUtil";
import { Listing } from "../utils/interfaces";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PaginationBar from "../components/Pagination";

export default function RecomendationsPage() {
  const MAX_LISTINGS_PAGE = 30;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { page } = useParams();
  const navigate = useNavigate();
  const defaultListings: Listing[] = [
    {
      sellerId: "1",
      listingId: "1",
      title: "Bicycle for sale1",
      price: 110.0,
      location: "V8X",
      status: "AVAILABLE",
      forCharity: false,
      listedAt: "2024-07-27T21:44:07.353627",
      lastUpdatedAt: "2024-07-27T21:44:07.353627",
    },
  ]; // MOCKING
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);
  const [listings] = useState<Listing[]>(defaultListings); // This will get replaced
  const totalPages = Math.ceil(listings.length / MAX_LISTINGS_PAGE);

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [page]);

  const activePageListing = arrayPagination(
    listings,
    currentPage,
    MAX_LISTINGS_PAGE
  );

  function handleNext() {
    setCurrentPage(currentPage + 1);
    navigate(`/recomendations/${currentPage + 1}`);
    scrollTop();
  }

  function handlePrev() {
    setCurrentPage(currentPage - 1);
    navigate(`/recomendations/${currentPage - 1}`);
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
        <PageHeading title='Your Recomendations'></PageHeading>
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          handleNext={handleNext}
          handlePrev={handlePrev}
        ></PaginationBar>
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
      </main>
    </>
  );
}
