import axios from "axios";
import { FilterOptions, LoginCredentials } from "./interfaces";

const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
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
    const response = await axios.get("http://localhost:8080/users/me", {
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
    const response = await axios.get(`http://localhost:8080/listings/?${paramsString}`, 
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
    const response = await axios.get(`http://localhost:8080/listings/${listingID}`, {
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
    const response = await axios.get(`http://localhost:8080/listings/me`, {
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
    const response = await axios.get(`http://localhost:8080/review/${listingID}`, {
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



export { login, fetchUser, fetchBrowseListings, fetchSingleListing ,fetchMyListings,fetchListingReviews};
