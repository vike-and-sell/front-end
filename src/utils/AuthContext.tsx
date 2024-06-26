import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    //setLoading(false)
    checkUserStatus();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await axios
        .post(
          "http://localhost:8080/login",
          {
            username: username,
            password: password,
          },
          {
            withCredentials: true,
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

          setUser(true);
          navigate("/");
        });
    } catch (error) {

      console.log(error);

      setUser(null);
    }
  };


  const requestAccount = async (email: string, callback: string) => {
    try {
      const res = await axios
        .post(
          "http://localhost:8080/request_account",
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

  const verifyAccount = async (
    jwt: string,
    username: string,
    password: string,
    location: string
  ) => {
    try {
      const res = await axios
        .post(
          "http://localhost:8080/verify_account",
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
            navigate("/login");
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
    }
  };

  const requestReset = async (email: string, callback: string) => {
    // try{
    //     const res = await axios.post('http://localhost:8080/request_reset',
    //         {
    //             email:email,
    //             callback:callback
    //         },{
    //             withCredentials:false
    //         }
    //     ).then( function (response) {
    //         console.log("response " + response.status + " " + response.data + " " + response.statusText)
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
  };

  const verifyReset = async (jwt: string, password: string) => {
    // try{
    //     const res = await axios.post('http://localhost:8080/verify_reset',
    //         {
    //             jwt:jwt,
    //             password:password,
    //         },{
    //             withCredentials:false
    //         }
    //     ).then( function (response) {
    //         console.log("response " + response.status + " " + response.data + " " + response.statusText)
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
  };

  const checkUserStatus = async () => {};

  const authData = {
    user,
    loginUser,
    requestAccount,
    verifyAccount,
    requestReset,
    verifyReset,
    checkUserStatus,
  };


  return (
    <AuthContext.Provider value={authData}>
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
