import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User } from "./interfaces";
import LoadingPage from "../pages/LoadingPage";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    checkUserStatus();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
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
            setUser(null);
            throw new Error(
              `Unable to login. Please try again later ${response.status}`
            );
          }
          checkUserStatus();
          console.log("refresh + forced login");
          navigate("/");
        });
    } catch (error) {
      setUser(null);
      throw new Error("Unable to login. Please try again later");
    }
  };

  const logoutUser = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_API_URL}/logout`, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status == 200) {
            setUser(null);
            navigate("/");
          }
        });
    } catch (error) {
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
  ) => {
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
    } catch (error) {
      console.log(error);
      throw new Error("Unable to fetch user");
    }
  };

  const requestReset = async (email: string, callback: string) => {
    try {
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/request_reset`,
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
