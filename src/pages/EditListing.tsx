import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import ErrorPage from "./ErrorPage";
import { fetchSingleListing, fetchUser } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditCreateSkeleton from "../components/Skeletons/EditCreateListingSkeleton";

export default function Edit() {
  const navigate = useNavigate();
  const { listingID } = useParams();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const {
    data: listingInfo,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: [listingID],
    queryFn: () => fetchSingleListing(listingID),
  });

  // Fetch User Data
  const { data: userData, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["userinfo"],
    queryFn: fetchUser,
    enabled: !listingInfo,
  });

  // Used to load initial listingInfo data as a state (Can be refactored)
  useEffect(() => {
    if (listingInfo && userData) {
      setTitle(listingInfo.title);
      setPrice(listingInfo.price);
      setStatus(listingInfo.status);
    }
  }, [listingInfo, userData]);

  if (isError) {
    return (
      <ErrorPage>
        <div>{error.message}</div>
        <div>{error.response?.data.message}</div>
      </ErrorPage>
    );
  }

  const isInvalidTitle = title === "";

  const isInvalidPrice = Number.isNaN(price);

  // Handle edit actually makes the changes
  const handleEdit = async () => {
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/listings/${listingID}`,
        {
          title,
          price,
          status,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status == 200) {
          navigate(`/listing/${listingID}`);
        }
      })
      .catch((error) => console.error(error));
  };

  if (isLoading || isUserDataLoading) {
    return <EditCreateSkeleton></EditCreateSkeleton>;
  }

  if (listingInfo.sellerId != userData.userId) {
    return (
      <ErrorPage>
        <div>Unauthorized Access</div>
      </ErrorPage>
    );
  }

  return (
    <>
      <main className='px-4'>
        <PageHeading title={"Edit Listing " + listingInfo.title}></PageHeading>
        <div className=''>
          <FormControl isInvalid={isInvalidTitle}>
            <div className='my-4'>
              <FormLabel>Title*</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                value={title}
              ></Input>
              {isInvalidTitle ? (
                <FormErrorMessage className='font-semibold'>
                  Title is required.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl isInvalid={isInvalidPrice}>
            <div className='my-4'>
              <FormLabel>Price*</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  color='gray.300'
                  fontSize='1.2em'
                >
                  $
                </InputLeftElement>
                <Input
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                  type='number'
                  value={price}
                ></Input>
              </InputGroup>
              {isInvalidPrice ? (
                <FormErrorMessage className='font-semibold'>
                  Price is required.
                </FormErrorMessage>
              ) : (
                ""
              )}
            </div>
          </FormControl>

          <FormControl>
            <div className='my-4'>
              <FormLabel>Status*</FormLabel>
              <Select
                className={`${
                  status === "AVAILABLE"
                    ? "text-green-700 font-semibold"
                    : "text-invalid-red font-semibold"
                }`}
                onChange={(e) => setStatus(e.target.value)}
                defaultValue={listingInfo.status}
              >
                <option
                  className='text-green-700 font-semibold'
                  value='AVAILABLE'
                >
                  Available
                </option>
                <option className='text-invalid-red font-semibold' value='SOLD'>
                  Sold
                </option>
              </Select>
            </div>
          </FormControl>

          <div className='my-5'></div>

          <FormControl>
            <div className='my-5 flex'>
              <PriBlueButton
                clickHandle={handleEdit}
                isDisabled={isInvalidPrice || isInvalidTitle}
                title='Save Changes'
              ></PriBlueButton>

              <InverseBlueButton
                clickHandle={() => navigate(-1)}
                className='ml-4'
                title='Cancel'
              ></InverseBlueButton>
            </div>
          </FormControl>
        </div>
      </main>
    </>
  );
}
