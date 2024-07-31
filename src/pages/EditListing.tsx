import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";
import ErrorPage from "./ErrorPage";
import { fetchSingleListing, fetchUser } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EditCreateSkeleton from "../components/Skeletons/EditCreateListingSkeleton";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useAuth } from "../utils/AuthContext";
import { UserSearchItem } from "../utils/interfaces";

export default function Edit() {
  const navigate = useNavigate();
  const toast = useToast();
  const { listingID } = useParams();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [forCharity, setForCharity] = useState<boolean>(false);
  const [buyersArray, setBuyersArray] = useState<UserSearchItem[]>([]);
  const [buyerUsername, setBuyerUsername] = useState<string>("");
  const [isEditLoading, setIsEditLoading] = useState<boolean>(false);
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      auth.checkUserStatus();
    }
  }, []);

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
      setPrice(parseFloat(listingInfo.price));
      setStatus(listingInfo.status);
      setForCharity(listingInfo.forCharity);
    }
  }, [listingInfo, userData]);

  useEffect(() => {
    const dbFn = setTimeout(() => {
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/search?search=${buyerUsername}`,
          {
            withCredentials: true,
          }
        )
        .then((r) => setBuyersArray(r.data.users));
    }, 500);

    return () => clearTimeout(dbFn);
  }, [buyerUsername]);

  if (isError) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : error.message;
    return (
      <ErrorPage>
        <div>{errorMessage}</div>
      </ErrorPage>
    );
  }

  const isInvalidTitle = title === "";

  const isInvalidPrice = Number.isNaN(price);

  // Handle edit actually makes the changes
  const handleEdit = async (): Promise<any> => {
    setIsEditLoading(true);
    toast({
      title: "Updating listing...",
      status: "loading",
      duration: 10000,
      isClosable: true,
    });
    axios
      .patch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/listings/${listingID}`,
        {
          title,
          price,
          status,
          forCharity,
          buyerUsername,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setIsEditLoading(false);
        if (response.status == 200) {
          toast.closeAll();
          toast({
            title: "Listing updated",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate(`/listing/${listingID}`);
        }
      })
      .catch(() => {
        setIsEditLoading(false);
        toast.closeAll();
        toast({
          title: "Failed to update",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
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
        <PageHeading
          data-cy='page-heading'
          title={"Edit Listing " + listingInfo.title}
        ></PageHeading>
        <div className=''>
          <FormControl isInvalid={isInvalidTitle}>
            <div className='my-4'>
              <FormLabel>Title*</FormLabel>
              <Input
                data-cy='edit-title-input'
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
                  data-cy='edit-price-input'
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
                data-cy='edit-status-dropdown'
                className={`${
                  status === "AVAILABLE"
                    ? "text-green-700 font-semibold"
                    : "text-red font-semibold"
                }`}
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option
                  className='text-green-700 font-semibold'
                  value='AVAILABLE'
                >
                  Available
                </option>
                <option className='text-red font-semibold' value='SOLD'>
                  Sold
                </option>
                <option className='text-red font-semibold' value='REMOVED'>
                  Removed
                </option>
              </Select>
            </div>
          </FormControl>

          <FormControl className={`${status === "SOLD" ? "" : "hidden"}`}>
            <div className='my-4'>
              <FormLabel>Select Buyer</FormLabel>
              <AutoComplete
                creatable
                openOnFocus={true}
                onSelectOption={(item) => {
                  setBuyerUsername(item.item.value);
                }}
                rollNavigation
                placement="top"
              >
                <AutoCompleteInput
                  data-cy='edit-buyer-autocomplete'
                  defaultValue={buyerUsername}
                  placeholder='Search...'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBuyerUsername(e.target.value)
                  }
                />
                <AutoCompleteList>
                  <AutoCompleteGroup title="" showDivider>
                    {buyersArray
                      .slice(0, 30)
                      .map((buyer: UserSearchItem, index: number) => (
                        <AutoCompleteItem
                          key={`${index}`}
                          value={buyer.username}
                          align="center"
                        >
                          <Avatar size="sm" name={buyer.username} />
                          <Text ml="4">{buyer.username}</Text>
                        </AutoCompleteItem>
                      ))}
                  </AutoCompleteGroup>
                  <AutoCompleteCreatable></AutoCompleteCreatable>
                </AutoCompleteList>
              </AutoComplete>
            </div>
          </FormControl>

          <FormControl>
            <div className='my-4'>
              <FormLabel>Charity</FormLabel>

              <Checkbox
                data-cy='edit-charity-checkbox'
                isChecked={forCharity}
                onChange={(e) => setForCharity(e.target.checked)}
                size='md'
              >
                I'd like to donate the earnings from this listing to charity
              </Checkbox>
            </div>
          </FormControl>

          <div className='my-5'></div>

          <FormControl>
            <div className='my-5 flex'>
              <PriBlueButton
                clickHandle={handleEdit}
                data-cy='edit-listing-button'
                isDisabled={isInvalidPrice || isInvalidTitle || isEditLoading}
                title='Save Changes'
              ></PriBlueButton>

              <InverseBlueButton
                clickHandle={() => navigate(-1)}
                className='ml-4'
                data-cy='cancel-button'
                title='Cancel'
              ></InverseBlueButton>
            </div>
          </FormControl>
        </div>
      </main>
    </>
  );
}
