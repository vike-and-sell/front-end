import PageHeading from "../components/PageHeading";
import { useNavigate } from "react-router-dom";
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import axios from "axios";

export default function Edit() {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ID, setID] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [isTitleTouched, setIsTitleTouched] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState<boolean>(true);
  const [forCharity, setForCharity] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const listingPayload = {
    sellerId: ID,
    title: title,
    price: price,
    location: location,
    status: "AVAILABLE",
    forCharity,
  };

  const isInvalidPrice = Number.isNaN(price);

  const fetchUser = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/me`, {
          withCredentials: true,
        })
        .then(function (response) {
          const newID = Number(response.data.userId);
          setID(newID);
          setLocation(response.data.location);
        });
    } catch (error) {
      console.error("Unable to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const createListing = async () => {
    setIsError(false);
    setIsCreating(true);
    toast({
      title: "Creating Listing...",
      status: "loading",
      duration: 10000,
      isClosable: true,
    });
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/listings`,
          listingPayload,
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          if (response.status == 201) {
            toast.closeAll();
            toast({
              title: "Listing created",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }
          navigate(`/listing/${response.data.listingId}`);
        });
    } catch (error) {
      setIsCreating(false);
      setIsError(true);
      toast.closeAll();
      toast({
        title: "Failed to create listing",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreate = () => {
    setIsInvalidTitle(title === "");
    setIsTitleTouched(true);
    if (title === "") {
      setIsError(true);
      return;
    }
    setIsError(false);
    createListing();
  };

  return (
    <>
      <main className="px-4">
        <PageHeading
          data-cy="page-heading"
          title={"Create Listing"}
        ></PageHeading>
        <div className="">
          <FormControl isRequired isInvalid={isInvalidTitle && isTitleTouched}>
            <div className="my-4 md:mr-80">
              <FormLabel>Title</FormLabel>
              <Input
                data-cy="create-title-input"
                value={title}
                onChange={(e) => {
                  setIsInvalidTitle(false);
                  setTitle(e.target.value);
                  setIsTitleTouched(true);
                }}
                type="text"
              ></Input>
              {isInvalidTitle && isTitleTouched ? (
                <FormErrorMessage className="font-semibold">
                  Title is required.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl isInvalid={isInvalidPrice}>
            <div className="my-4 md:mr-80">
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                >
                  $
                </InputLeftElement>
                <Input
                  data-cy="create-price-input"
                  value={price}
                  min="0"
                  max="999999999.99"
                  onChange={(e) => {
                    const value = e.target.value;

                    // Allow the value if it's empty or matches the float pattern with up to two decimal places
                    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                      const numericValue = parseFloat(value);

                      // Check if the value is within the range of 9 to 999999999.99
                      if (
                        (numericValue >= 0 && numericValue <= 99999999.99) ||
                        value === ""
                      ) {
                        setPrice(numericValue);
                      }
                    }
                  }}
                  type="number"
                ></Input>
              </InputGroup>
              {isInvalidPrice ? (
                <FormErrorMessage className="font-semibold">
                  Price is required.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl>
            <div className="my-4">
              <FormLabel>Charity</FormLabel>

              <Checkbox
                data-cy="create-charity-checkbox"
                isChecked={forCharity}
                onChange={(e) => setForCharity(e.target.checked)}
                size="md"
              >
                I'd like to donate the earnings from this listing to charity{" "}
                {forCharity}
              </Checkbox>
            </div>
          </FormControl>

          <FormControl>
            <div className="my-5 flex">
              <PriBlueButton
                data-cy="create-listing-button"
                isDisabled={
                  isInvalidPrice ||
                  (isInvalidTitle && isTitleTouched) ||
                  isCreating
                }
                clickHandle={handleCreate}
                title="Create Listing"
              ></PriBlueButton>

              <InverseBlueButton
                data-cy="cancel-button"
                clickHandle={() => navigate(-1)}
                className="ml-4"
                title="Cancel"
              ></InverseBlueButton>
            </div>
          </FormControl>

          {isError ? (
            <div
              className="text-red text-center text-xs sm:text-sm"
              data-cy="create-listing-error"
            >
              Could not create listing.
            </div>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  );
}
