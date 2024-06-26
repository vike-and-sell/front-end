import axios from "axios";
import { LoginCredentials } from "./interfaces";

const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(
    "http://127.0.0.1:8080/login",
    credentials,
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  return response.data;
};

const fetchUser = async () => {
  const response = await axios.get("http://127.0.0.1:8080/users/me", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    // Get the actual error
    throw new Error("Fetching user data failed");
  }
  return response.data;
};

const fetchBrowseListings = async () => {
  const response = await axios.get("http://127.0.0.1:8080/listings/", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error(
      response.data?.message || "Fetching listings data failed..."
    );
  }
  return response.data;
};

export { login, fetchUser, fetchBrowseListings };
