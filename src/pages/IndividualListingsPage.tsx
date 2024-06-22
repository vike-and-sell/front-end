import PageHeading from "../components/PageHeading";
import DefaultButton from "../components/Button";
import RatingSection from "../components/Ratings/ReviewCommentArea";
import { getListingInfoFromID, getReviews } from "../utils/FakeListingsMock";
import { useParams } from "react-router-dom";
import { Listing } from "../utils/interfaces";

export default function IndividualListing() {
  const { listingID } = useParams();

  // This information will have to be fetched using React Query or UseEffect
  const listingInfo: Listing = getListingInfoFromID(listingID); // MOCKING FUNCTION
  const reviews = getReviews(listingInfo.listingId); // MOCKING FUNCTION
  return (
    <main className='p-4 flex flex-col lg:overflow-y-scroll lg:max-h-[calc(100vh-150px)]'>
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
