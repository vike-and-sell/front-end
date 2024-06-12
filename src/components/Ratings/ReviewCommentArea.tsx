// This section takes props which it will then pass down to the UserReview component
// using a mapping function

import UserReview from "./UserReview";

export default function RatingSection() {
  return (
    <div>
      <UserReview></UserReview>
      {/* This area will be where user comments are if there are any, maybe generate a dummy text if nothing? */}
    </div>
  );
}
