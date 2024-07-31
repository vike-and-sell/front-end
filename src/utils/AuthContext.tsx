import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User } from "./interfaces";
import LoadingPage from "../pages/LoadingPage";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    checkUserStatus();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      toast({
        title: "Logging in...",
        status: "loading",
        duration: 10000,
        isClosable: true,
      });
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/login`,
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status !== 200) {
            toast.closeAll();
            setUser(null);
            throw new Error(
              `Unable to login. Please try again later ${response.status}`
            );
          }
          checkUserStatus();
          toast.closeAll();
          toast({
            title: "Logged in",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/");
        });
    } catch (error) {
      setUser(null);
      toast.closeAll();
      throw new Error("Unable to login. Please try again later");
    }
  };

  const logoutUser = async () => {
    try {
      toast({
        title: "Logging out...",
        status: "loading",
        duration: 10000,
        isClosable: true,
      });
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status == 200) {
            setUser(null);
            toast.closeAll();
            toast({
              title: "Logged out",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            navigate("/");
          }
        });
    } catch (error) {
      toast.closeAll();
      toast({
        title: "Error logging out",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setUser(null);
    }
  };

  const requestAccount = async (email: string, callback: string) => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/request_account`,
          {
            email: email,
            callback: callback,
          },
          {
            withCredentials: false,
          }
        )
        .then(function (response) {
          console.log(
            "response " +
              response.status +
              " " +
              response.data +
              " " +
              response.statusText
          );
        });
    } catch (error) {
      console.log(error);
      throw new Error("Unable to request new account");
    }
  };

  const verifyAccount = async (
    jwt: string,
    username: string,
    password: string,
    location: string
  ): Promise<string> => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/verify_account`,
          {
            jwt: jwt,
            username: username,
            password: password,
            location: location,
          },
          {
            withCredentials: false,
          }
        )
        .then(function (response) {
          console.log(response.status);
          if (response.status == 201) {
            navigate("/unverified/success");
            return new Promise((resolve) =>
              resolve("Account creation successful. Redirecting you!")
            );
          }
          if (response.status == 400) {
          }
          console.log(
            "response " +
              response.status +
              " " +
              response.data +
              " " +
              response.statusText
          );
        });
    } catch (error: any) {
      if (error.response) {
        if (error.response.status == 400) {
          return new Promise((resolve) => resolve(error.response.data.message));
        }
      }
      throw new Error("Unable to fetch user");
    }
    return new Promise<string>((resolve) => resolve(""));
  };

  const requestReset = async (email: string, callback: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/request_reset`,
        {
          email: email,
          callback: callback,
        },
        {
          withCredentials: false,
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const verifyReset = async (jwt: string, password: string) => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/verify_reset`,
          {
            jwt: jwt,
            password: password,
          },
          {
            withCredentials: false,
          }
        )
        .then(function (response) {
          console.log(
            "response " +
              response.status +
              " " +
              response.data +
              " " +
              response.statusText
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserStatus = async () => {
    try {
      const response = await axios.get<User>(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/me`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.status == 401) {
        setUser(null);
        navigate("/login");
        return;
      }

      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      setLoading(false);
      throw new Error("Unable to fetch user");
    }
  };

  const authData = {
    isLoading,
    user,
    setLoading,
    loginUser,
    logoutUser,
    requestAccount,
    verifyAccount,
    requestReset,
    verifyReset,
    checkUserStatus,
  };

  return (
    <AuthContext.Provider value={authData}>
      {isLoading ? <LoadingPage></LoadingPage> : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
