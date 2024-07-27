import axios from "axios";
import { FilterOptions } from "./interfaces";

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

const fetchBrowseListings = async (filterOptions: FilterOptions) => {
  let paramsString = "";
  Object.keys(filterOptions).forEach((key) => {
    const filter = filterOptions[key];
    if (filter !== undefined && filter !== "") {
      paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(
        String(filter)
      )}&`;
    }
  });

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
  console.log("fetch single listing");
  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching single listing data failed..."
    );
  }

  return response.data;
};

const fetchMyListings = async () => {
  try {
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
  } catch (error) {
    throw error;
  }
};

const fetchListingReviews = async (listingID: string | undefined) => {
  try {
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
  } catch (error) {
    throw error;
  }
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
  review: string,
  rating: number
) => {
  const responseReview = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/review/${listingID}`,
    {
      review,
    },
    {
      withCredentials: true,
    }
  );

  const responseRating = await axios.post(
    `${import.meta.env.VITE_REACT_APP_API_URL}/rating/${listingID}`,
    {
      rating,
    },
    {
      withCredentials: true,
    }
  );

  if (responseReview.status !== 200) {
    throw new Error(responseReview.data?.message || "Failed to add review...");
  }

  if (responseRating.status !== 200) {
    throw new Error(responseRating.data?.message || "Failed to add rating...");
  }
};

const queryListings = async function (
  query: string,
  filterOptions: FilterOptions
) {
  let paramsString = "";
  Object.keys(filterOptions).forEach((key) => {
    if (filterOptions[key] != "") {
      paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(
        filterOptions[key]
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
  console.log(searchResponse.data);
  return searchResponse.data;
};

export {
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
