// This will probably take a function from the parent containing logged in User ID and other information needed to post?
// Depends how we are storing the username of the logged in user (Props, context, local storage, etc?)
// Consider implement form elements / Formik Library?
import DefaultButton from "../Button";
import { Textarea } from "@chakra-ui/react";
import StarRatings from "./StarRatings";
import { useState } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export default function UserReview() {
  const [ratingValue, setRatingValue] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [formError, setFormError] = useState(false);
  console.log(`Lifted State to Parent ${ratingValue}`);

  function handleSubmit() {
    if (ratingValue !== 0 && textInput !== "") {
      setFormError(false);
    } else {
      setFormError(true);
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const inputValue = e.target.value;
    setTextInput(inputValue);
  }

  return (
    <FormControl isInvalid={formError}>
      <FormLabel className="text-pri-blue font-semibold m-0">
        Leave a rating!
      </FormLabel>
      <Textarea
        placeholder="Leave your comment here!"
        resize="none"
        value={textInput}
        onChange={(e) => handleTextChange(e)}
        aria-label="Text Review Area"
        required
      ></Textarea>
      {formError && textInput === "" ? (
        <FormErrorMessage>Please enter in a review message.</FormErrorMessage>
      ) : (
        ""
      )}
      <div className="flex items-center justify-between mt-4">
        <StarRatings setValue={setRatingValue}></StarRatings>
        <DefaultButton
          title="Submit"
          clickHandle={handleSubmit}
        ></DefaultButton>
      </div>
      {formError && ratingValue === 0 ? (
        <FormErrorMessage>Please enter in a rating.</FormErrorMessage>
      ) : (
        ""
      )}
    </FormControl>
  );
}
