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
      console.log();
      setUser(null);
    }
  };

  const registerUser = (username: string, password: string) => {};

  const checkUserStatus = async () => {};

  const authData = { user, loginUser, registerUser, checkUserStatus };

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
