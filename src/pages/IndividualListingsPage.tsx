import PageHeading from "../components/PageHeading";
import DefaultButton from "../components/Button";
import RatingSection from "../components/Ratings/ReviewCommentArea";
import fetchReviewsWithID from "../components/Ratings/ReviewMockingData";
import { getListingInfoFromID } from "../utils/FakeListingsMock";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Listing {
  sellerId: string;
  listingId: string;
  title: string;
  price: number;
  location: string; // Assuming location can be either latlong or first 3 letters of zip code
  status: string;
  listedAt: string; // Should be in ISO 8601 format
  lastUpdatedAt: string; // Should be in ISO 8601 format
}

export default function IndividualListing() {
  const mockreviews = fetchReviewsWithID(); // MOCKING FUNCTION
  const { listingID } = useParams();
  const [reviews, setReviews] = useState(mockreviews);
  const listingInfo: Listing = getListingInfoFromID(listingID); // MOCKING FUNCTION

  return (
    <main className='p-4 flex flex-col'>
      <PageHeading title={listingInfo.title}></PageHeading>
      <div className='flex flex-col items-start gap-4 lg:gap-6 mb-12'>
        <div className='text-green-700 font-bold text-2xl'>
          ${listingInfo.price}
        </div>
        <div className='text-sm'>
          {timeSincePost(listingInfo.listedAt)}
          <span className='font-bold'> {listingInfo.sellerId}</span>
        </div>
        <div className='flex gap-4'>
          <DefaultButton title='Message Seller'></DefaultButton>
          <DefaultButton title='View Seller'></DefaultButton>
        </div>
      </div>
      <RatingSection reviews={reviews}></RatingSection>
    </main>
  );
}

function timeSincePost(postedTime: string) {
  const postDate = new Date(postedTime);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return "Posted today by";
  } else {
    return `Posted ${diffDays} days ago by`;
  }
}
