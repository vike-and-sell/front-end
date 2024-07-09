import PageHeading from "../components/PageHeading";
import DefaultButton, {
  InvalidRedButton,
  InverseBlueButton,
} from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { FaEllipsisH, FaRegEdit } from "react-icons/fa";
import { MdDoNotDisturb } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import RatingSection from "../components/Ratings/RatingSection";
import IndividualListingsPageSkeleton from "../components/Skeletons/IndividualListingSkeleton";
import { useQuery } from "@tanstack/react-query";
import {
  fetchListingReviews,
  fetchSingleListing,
  fetchUser,
} from "../utils/api";
import ErrorPage from "./ErrorPage";

export default function IndividualListing() {
  const { listingID } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  let isUser = false;

  // Fetch Listing Data
  const {
    data: listingInfo,
    isPending: isListingPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["listings", listingID],
    queryFn: () => fetchSingleListing(listingID),
  });

  // Fetch Listing Reviews
  const {
    data: reviews,
    isError: isReviewError,
    isPending: isReviewPending,
    error: reviewError,
  } = useQuery({
    queryKey: ["reviews", listingID],
    queryFn: () => fetchListingReviews(listingID),
  });

  // Fetch User Data
  const { data: userData } = useQuery({
    queryKey: ["userinfo"],
    queryFn: fetchUser,
    enabled: !listingInfo,
  });

  // Error Screen for Listing Info
  if (isError) {
    return (
      <ErrorPage>
        <div>{error.message}</div>
        <div>{error.response?.data.message}</div>
      </ErrorPage>
    );
  }

  // Error Screen for Review
  if (isReviewError) {
    return (
      <ErrorPage>
        <div>{reviewError.message}</div>
        <div>{reviewError.response?.data.message}</div>
      </ErrorPage>
    );
  }

  // Still need to be implemented
  const handleDelete = () => {};
  const handleDoNotRecommend = () => {};

  // Verifies User owns listing
  if (userData && listingInfo) {
    if (userData.userId == listingInfo.sellerId) {
      isUser = true;
    }
  }

  return !isListingPending && !isReviewPending ? (
    <main className='p-4 flex flex-col lg:overflow-y-scroll lg:max-h-[calc(100vh-150px)]'>
      <div className='flex'>
        <PageHeading title={listingInfo.title}></PageHeading>
        <div className='ml-4'>
          <Menu>
            <MenuButton as={Button} width='47px'>
              <FaEllipsisH color='#166aac'></FaEllipsisH>
            </MenuButton>
            <MenuList>
              {isUser ? (
                <>
                  <MenuItem
                    icon={<FaRegEdit />}
                    onClick={() => navigate(`/edit/${listingID}`)}
                  >
                    Edit Listing
                  </MenuItem>
                  <MenuItem icon={<AiOutlineDelete />} onClick={onOpen}>
                    Delete Listing
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem
                    icon={<MdDoNotDisturb />}
                    onClick={handleDoNotRecommend}
                  >
                    Do Not Recommend
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>

          <Modal
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Listing</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Are you sure you want to delete this listing?
              </ModalBody>

              <ModalFooter>
                <InvalidRedButton
                  clickHandle={handleDelete}
                  title='Yes'
                  className='mr-3'
                ></InvalidRedButton>
                <InverseBlueButton
                  clickHandle={onClose}
                  title='No'
                ></InverseBlueButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className='flex flex-col items-start gap-4 lg:gap-6 mb-12'>
        <div className='text-green-700 font-bold text-2xl'>
          ${listingInfo.price}
        </div>
        <div className='text-sm'>
          {timeSincePost(listingInfo.listedAt)}
          <span className='font-bold'> {listingInfo.sellerId}</span>
        </div>
        <div className='flex gap-4'>
          <DefaultButton title='Message Seller'></DefaultButton>
          <DefaultButton title='View Seller'></DefaultButton>
        </div>
      </div>
      <RatingSection reviews={reviews}></RatingSection>
    </main>
  ) : (
    <IndividualListingsPageSkeleton></IndividualListingsPageSkeleton>
  );
}

function timeSincePost(postedTime: string) {
  const postDate = new Date(postedTime);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays === 0) {
    return "Posted today by";
  } else {
    return `Posted ${diffDays} days ago by`;
  }
}
