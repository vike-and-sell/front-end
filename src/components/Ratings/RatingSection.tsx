import { ReviewInfo } from "../../utils/interfaces";
import { Review, Reviews } from "./Reviews";
import UserReview from "./UserReview";

interface RatingSectionProps {
  reviews: [];
}

type ItemStatus = "" | "SOLD" | "AVAILABLE" | undefined;

export default function RatingSection({ reviews }: RatingSectionProps) {
  let isReviews = reviews === undefined || reviews.length === 0 ? true : false;
  return (
    <div>
      <hr className='mb-7'></hr>
      <UserReview></UserReview>
      <Reviews>
        {isReviews ? (
          <div className='text-slate-400'>Nothing here...</div>
        ) : (
          reviews.map((review: ReviewInfo, index) => {
            let reviewString = review.review;
            return <Review key={index} review={reviewString}></Review>;
          })
        )}
      </Reviews>
    </div>
  );
}
