import axios from "axios";
import { FilterOptions, LoginCredentials } from "./interfaces";

const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(
      "${import.meta.env.VITE_REACT_APP_API_URL}/login",
      credentials,
      { withCredentials: true }
    );
    
    if (response.status !== 200) {
      throw new Error("Login failed");
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchUser = async () => {
  try {
    const response = await axios.get("${import.meta.env.VITE_REACT_APP_API_URL}/users/me", {
      withCredentials: true,
    });
    
    if (response.status !== 200) {
      throw new Error("Fetching user data failed");
    }
    
    return response.data;
  } catch (error) {
     throw error;
  }
};

const fetchBrowseListings = async (filterOptions:FilterOptions) => {
  let paramsString = "";
  
  Object.keys(filterOptions).forEach((key)=> {
    if (filterOptions[key] != '') {
      paramsString += `${encodeURIComponent(key)}=${encodeURIComponent(filterOptions[key])}&`
    }
  })

  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/?${paramsString}`, 
      {
      withCredentials: true,
    });
    
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Fetching listings data failed...");
    }
    
    return response.data;
  } catch (error) {
     throw error;
  }
};

const fetchSingleListing = async (listingID: string | undefined) => {
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/${listingID}`, {
      withCredentials: true,
    });
    
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Fetching single listing data failed...");
    }
 
    return response.data;
  } catch (error) {   
      throw error;
  }
};

const fetchMyListings = async () => {

  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/listings/me`, {
      withCredentials: true,
    });
   
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Fetching single listing data failed...");
    }
    
    return response.data;
  } catch (error) {   
      throw error;
  }
};

const fetchListingReviews = async (listingID: string | undefined) => {
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/review/${listingID}`, {
      withCredentials: true,
    });
    
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Fetching review listing data failed...");
    }
    return response.data;
  } catch (error) {   
      throw error;
  }
};

const fetchListingRating = async (listingID: string | undefined) => {
  
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/rating/${listingID}`, 
    {
      withCredentials: true,
    });
    
    if (response.status !== 200) {
      throw new Error(response.data?.message || "Failed to retrieve rating...");
    }
    return response.data;
  } catch (error) {   
      throw error;
  }
};

const addReview = async (listingID: string | undefined, review: string, rating:number) => {
  
  try {
    const responseReview = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/review/${listingID}`, 
    {
      review
    },
    {
      withCredentials: true,
    });

    const responseRating = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/rating/${listingID}`, 
      {
        rating
      },
      {
        withCredentials: true,
      });
    
    if (responseReview.status !== 200) {
      throw new Error(responseReview.data?.message || "Failed to add review...");
    }

    if (responseRating.status !== 200) {
      throw new Error(responseRating.data?.message || "Failed to add rating...");
    }
   
  } catch (error) {   
      throw error;
  }
};

export { login, fetchUser, fetchBrowseListings, fetchSingleListing ,fetchMyListings,fetchListingReviews,fetchListingRating,addReview};
