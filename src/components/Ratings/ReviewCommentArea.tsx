// This section takes props which it will then pass down to the UserReview component
// using a mapping function

import UserReview from "./UserReview";

export default function RatingSection() {
  return (
    <div>
      <hr className='mb-7'></hr>
      <UserReview></UserReview>
    </div>
  );
}
