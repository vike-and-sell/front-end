// This will probably take a function from the parent containing logged in User ID and other information needed to post?
// Depends how we are storing the username of the logged in user (Props, context, local storage, etc?)
// Consider implement form elements / Formik Library?
import { PriBlueButton } from "../Button";
import { Textarea, useToast } from "@chakra-ui/react";
import StarRatings from "./StarRatings";
import { useState } from "react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { addReview } from "../../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserReview {
  listingId: string | undefined;
}

export default function UserReview({ listingId }: UserReview) {
  const toast = useToast();
  const [ratingValue, setRatingValue] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [formError, setFormError] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => addReview(listingId, textInput, ratingValue),
    onSuccess: () => {
      toast.closeAll();
      toast({
        title: "Review added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTextInput("");
      setRatingValue(0);
      queryClient.invalidateQueries({ queryKey: ["reviews", listingId] });
      queryClient.invalidateQueries({ queryKey: ["ratings", listingId] });
    },
    onError: () => {
      toast.closeAll();
      toast({
        title: "Failed to add review",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });
  function handleSubmit() {
    if (ratingValue !== 0 && textInput !== "") {
      setFormError(false);
      toast({
        title: "Adding review",
        status: "loading",
        duration: 10000,
        isClosable: true,
      });
      mutation.mutate();
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
      <FormLabel className='text-pri-blue font-semibold m-0'>
        Leave a rating!
      </FormLabel>
      <Textarea
        className='review-textbox'
        placeholder='Leave your comment here!'
        resize='none'
        value={textInput}
        onChange={(e) => handleTextChange(e)}
        aria-label='Text Review Area'
        required
      ></Textarea>
      {formError && textInput === "" ? (
        <FormErrorMessage className='textbox-error' data-cy='review-textbox-error'>
          Please enter in a review message.
        </FormErrorMessage>
      ) : (
        ""
      )}
      <div className='flex items-center justify-between mt-4'>
        <StarRatings
          setValue={setRatingValue}
          defaultValue={ratingValue}
        ></StarRatings>

        <PriBlueButton
          datacy='submit-review'
          clickHandle={handleSubmit}
          isDisabled={mutation.isPending}
          title='Submit'
        ></PriBlueButton>
      </div>
      {formError && ratingValue === 0 ? (
        <FormErrorMessage className='rating-error' data-cy='rating-error'>
          Please enter in a rating.
        </FormErrorMessage>
      ) : (
        ""
      )}
    </FormControl>
  );
}
