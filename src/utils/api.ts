import axios from "axios";
import { FilterOptions, Listing } from "./interfaces";

const fetchUser = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/users/me`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error("Fetching user data failed");
  }

  return response.data;
};

const fetchOtherUser = async (userId: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error("Fetching user data failed");
  }

  return response.data;
};

const fetchBrowseListings = async (
  filterOptions: FilterOptions,
  offset: number = 0
): Promise<Listing[]> => {
  let paramsString = "";
  Object.keys(filterOptions).forEach((key) => {
    const filter = filterOptions[key];
    if (filter !== undefined && filter !== "") {
      paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(
        String(filter)
      )}&`;
    }
  });
  paramsString += `offset=${offset}`;

  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/listings?${paramsString}`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching listings data failed..."
    );
  }

  return response.data;
};

const fetchSingleListing = async (listingID: string | undefined) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/listings/${listingID}`,
    {
      withCredentials: true,
    }
  );
 
  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching single listing data failed..."
    );
  }

  return response.data;
};

const fetchMyListings = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/listings/me`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching single listing data failed..."
    );
  }

  return response.data;
};

const fetchListingReviews = async (listingID: string | undefined) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/review/${listingID}`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching review listing data failed..."
    );
  }
  return response.data;
};

const fetchListingRating = async (listingID: string | undefined) => {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/rating/${listingID}`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to retrieve rating...");
  }
  return response.data;
};

const addReview = async (
  listingID: string | undefined,
  reviewContent: string,
  ratingValue: number
) => {
  const responseReview = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/review/${listingID}`,
    {
      reviewContent,
    },
    {
      withCredentials: true,
    }
  );

  const responseRating = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/rating/${listingID}`,
    {
      ratingValue,
    },
    {
      withCredentials: true,
    }
  );

  if (responseReview.status !== 201) {
    throw new Error(responseReview.data?.message || "Failed to add review...");
  }

  if (responseRating.status !== 201) {
    throw new Error(responseRating.data?.message || "Failed to add rating...");
  }
};

const queryListings = async function (
  query: string,
  filterOptions: FilterOptions
) {
  let paramsString = "";
  Object.keys(filterOptions).forEach((key) => {
    const filter = filterOptions[key];
    if (filter !== undefined && filter !== "") {
      paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(
        String(filter)
      )}&`;
    }
  });

  const searchResponse = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/search?q=${encodeURIComponent(
      query
    )}${"&" + paramsString}`,
    {
      withCredentials: true,
    }
  );

  if (searchResponse.status !== 200) {
    throw new Error("Failed to search for items or users");
  }
  
  return searchResponse.data;
};

const getCharities = async function () {
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/charity`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed get charities");
  }

  return response.data;
};

const getRecommendations = async function (){
  const response = await axios.get(
    `${import.meta.env.VITE_REACT_APP_API_URL}/recommendations`,
    {
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed get recommendations");
  }
  
  return response.data;
};

export {
  getCharities,
  getRecommendations,
  queryListings,
  fetchUser,
  fetchOtherUser,
  fetchBrowseListings,
  fetchSingleListing,
  fetchMyListings,
  fetchListingReviews,
  fetchListingRating,
  addReview,
};