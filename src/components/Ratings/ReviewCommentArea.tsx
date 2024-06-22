import { Review, Reviews } from "./Reviews";
import UserReview from "./UserReview";

interface RatingSectionProps {
  reviews: string[];
}

export default function RatingSection({ reviews }: RatingSectionProps) {
  let reviewCount = reviews.length;
  return (
    <div>
      <hr className='mb-7'></hr>
      <UserReview></UserReview>
      <Reviews>
        {reviewCount == 0 ? (
          <div className='text-slate-400'>Nothing here...</div>
        ) : (
          reviews.map((review, index) => (
            <Review key={index} review={review}></Review>
          ))
        )}
      </Reviews>
    </div>
  );
}
