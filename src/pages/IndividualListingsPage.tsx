import { FaArrowLeft } from "react-icons/fa6";
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
  Badge,
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
import { useQuery, useQueries } from "@tanstack/react-query";
import {
  fetchListingRating,
  fetchListingReviews,
  fetchOtherUser,
  fetchSingleListing,
  fetchUser,
} from "../utils/api";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import Chat from "./chat";

export default function IndividualListing() {
  const { listingID } = useParams();
  const navigate = useNavigate();
  const { 
    isOpen:isDeleteOpen, 
    onOpen: onDeleteOpen, 
    onClose: onDeleteClose 
  } = useDisclosure();

  const { 
    isOpen:isChatOpen, 
    onOpen:onChatOpen, 
    onClose:onChatClose 
  } = useDisclosure();
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

  // Fetch Listing Reviews
  const {
    data: ratings,
    isError: isRatingError,
    isPending: isRatingPending,
    error: ratingError,
  } = useQuery({
    queryKey: ["ratings", listingID],
    queryFn: () => fetchListingRating(listingID),
  });

  // Fetch User and Seller Info
  const [userData, sellerData] = useQueries({
    queries: [
      { queryKey: ["userinfo"], queryFn: fetchUser, enabled: !listingInfo },
      {
        queryKey: ["sellerData"],
        queryFn: () => fetchOtherUser(listingInfo.sellerId),
        enabled: !listingInfo,
      },
    ],
  });

  // Error Screen for Listing Info
  if (isError) {
    const errorMessage = axios.isAxiosError(error) && error.response ? error.response.data.message : error.message;
    return (
      <ErrorPage>
        <div>{errorMessage}</div>
      </ErrorPage>
    );
  }

  // Error Screen for Review
  if (isReviewError) {
    const reviewErrorMessage = axios.isAxiosError(reviewError) && reviewError.response ? reviewError.response.data.message : reviewError.message;
    return (
      <ErrorPage>
        <div>{reviewErrorMessage}</div>
      </ErrorPage>
    );
  }

  // Error Screen for Rating
  if (isRatingError) {
    const ratingErrorMessage = axios.isAxiosError(ratingError) && ratingError.response ? ratingError.response.data.message : ratingError.message;
    return (
      <ErrorPage>
        <div>{ratingErrorMessage}</div>
      </ErrorPage>
    );
  }

  // Still need to be implemented
  const handleDelete = () => {};
  const handleDoNotRecommend = () => {};

  // Check if all data is loaded
  if (
    isListingPending ||
    isReviewPending ||
    isRatingPending ||
    userData.isLoading ||
    sellerData.isLoading
  ) {
    return <IndividualListingsPageSkeleton></IndividualListingsPageSkeleton>;
  }

  // Verifies User owns listing
  if (userData && listingInfo) {
    if (userData.data.userId == listingInfo.sellerId) {
      isUser = true;
    }
  }

  return (
    <main className='p-4 flex flex-col lg:overflow-y-scroll lg:max-h-[calc(100vh-150px)]'>
      <div className='flex gap-2 items-center'>
        <button
          className=' p-1 rounded-lg bg-pri-blue'
          data-cy="back-button" 
          title='Back Button'
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={15} color='white' />
        </button>
        <h1 className='font-semibold text-pri-blue text-3xl p-0' data-cy="listing-title" >
          {listingInfo.title}
        </h1>
        <Menu>
          <MenuButton as={Button} width='47px' background='white' data-cy="menu-button">
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
                <MenuItem icon={<AiOutlineDelete />} onClick={onDeleteOpen}>
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
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Listing</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this listing?</ModalBody>

            <ModalFooter>
              <InvalidRedButton
                clickHandle={handleDelete}
                data-cy="delete-listing"
                title='Yes'
                className='mr-3'
              ></InvalidRedButton>
              <InverseBlueButton
                clickHandle={onDeleteClose}
                data-cy="cancel-delete-listing"
                title='No'
              ></InverseBlueButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>

      <div>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isChatOpen}
        onClose={onChatClose}
        scrollBehavior="outside"
        size='full'
        isCentered
      >
        <ModalOverlay />
        <ModalContent m={10} >
          <ModalCloseButton ml={5} />
          <ModalBody my={3} mr={4}>
            <Chat></Chat>
          </ModalBody>
        </ModalContent>
      </Modal>
      </div>
      <div className='flex flex-col items-start gap-4 lg:gap-6 mb-12'>
        <div className='flex items-center gap-3'>
          <div className='text-green-700 font-bold text-2xl' data-cy="listing-price">
            ${listingInfo.price}
          </div>
          <Badge
            colorScheme={`${
              listingInfo.status == "AVAILABLE" ? "green" : "red"
            }`}
            data-cy="listing-status-badge"
          >
            {listingInfo.status}
          </Badge>
          { listingInfo?.forCharity? 
          <Badge
            data-cy="listing-charity-badge"
          >
            CHARITY
          </Badge>
          : ''
          }
        </div>

        <div className='text-sm' data-cy="listing-time">
          {timeSincePost(listingInfo.listedAt)}
          <span className='font-bold' data-cy="listing-seller"> {sellerData.data.username}</span>
        </div>
        <div className='flex gap-4'>
          <DefaultButton title='Message Seller' data-cy="message-seller-button" clickHandle={onChatOpen}></DefaultButton>
        </div>
      </div>
      <RatingSection
        reviews={reviews}
        listingId={listingID}
        ratings={ratings}
      ></RatingSection>
    </main>
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
