import PageHeading from "../components/PageHeading";
import { useNavigate, useParams } from "react-router-dom";
import { getListingInfoFromID } from "../utils/FakeListingsMock";
import { Listing } from "../utils/interfaces";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { InverseBlueButton, PriBlueButton } from "../components/Button";

export default function Edit() {
  const navigate = useNavigate();
  const { listingID } = useParams();
  const listingInfo: Listing = getListingInfoFromID(listingID); // MOCKING FUNCTION

  const [title, setTitle] = useState<string>(listingInfo.title);
  const [price, setPrice] = useState<number>(listingInfo.price);
  const [status, setStatus] = useState<string>(listingInfo.status);

  const isInvalidTitle = title === "";

  const isInvalidPrice = Number.isNaN(price);

  const handleEdit = () => {};

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
