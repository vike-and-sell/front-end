// This will probably take a function from the parent containing logged in User ID and other information needed to post?
// Depends how we are storing the username of the logged in user (Props, context, local storage, etc?)
// Consider implement form elements / Formik Library?
import DefaultButton from "../Button";
import { Textarea } from "@chakra-ui/react";
import StarRatings from "./StarRatings";

export default function UserReview() {
  return (
    <div>
      Your Rating
      <Textarea placeholder='Leave your comment here!' resize='none'></Textarea>
      <div className='flex items-center justify-between'>
        <StarRatings></StarRatings>
        <DefaultButton title='Submit'></DefaultButton>
      </div>
    </div>
  );
}
