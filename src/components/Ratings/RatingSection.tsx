import { ReviewInfo } from "../../utils/interfaces";
import { Review, Reviews } from "./Reviews";
import UserReview from "./UserReview";

interface RatingSectionProps {
  reviews: [];
  listingId: string | undefined;
  ratings: [];
}

export default function RatingSection({
  reviews,
  listingId,
  ratings,
}: RatingSectionProps) {
  const isReviews =
    reviews === undefined || reviews.length === 0 ? true : false;
  const averageRating = calculateAverageRating(ratings);

  return (
    <div>
      <hr className='mb-7'></hr>
      <UserReview listingId={listingId}></UserReview>
      <Reviews averageRating={averageRating}>
        {isReviews ? (
          <div className='text-slate-400'>Nothing here...</div>
        ) : (
          reviews
            .slice() // create a copy of the reviews array
            .reverse() // reverse the copied array
            .map((review: ReviewInfo, index) => {
              const reviewString = review.review;
              return <Review key={index} review={reviewString}></Review>;
            })
        )}
      </Reviews>
    </div>
  );
}

interface RatingInfo {
  username: string;
  created_on: string;
  rating: number;
}

function calculateAverageRating(ratingList: []) {
  const ratings = ratingList.map((obj: RatingInfo) => obj.rating);
  if (ratings.length === 0) return "No Ratings";
  const sum = ratings.reduce((acc, num) => acc + num, 0);
  const average = sum / ratings.length;
  const roundedAverage = (Math.round(average * 10) / 10).toFixed(1);
  return roundedAverage;
}
