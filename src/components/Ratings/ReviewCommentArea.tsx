// This section takes props which it will then pass down to the UserReview component
// using a mapping function

import { Review, Reviews } from "./Reviews";
import UserReview from "./UserReview";

export default function RatingSection() {
  const reviewCount = 0;
  return (
    <div>
      <hr className='mb-7'></hr>
      <UserReview></UserReview>
      <Reviews>
        {reviewCount == 0 ? (
          <div className='text-slate-400'>Nothing here...</div>
        ) : (
          <Review review='This was okay'></Review>
        )}
      </Reviews>
    </div>
  );
}
