import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, SessionType, User } from "./interfaces";

const AuthContext = createContext<AuthContextType | null>(null);



export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null >(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false)
    checkUserStatus();
  }, []);

  const loginUser = async (username: string, password: string) => {
    try {
      await axios
      .post(
        "${import.meta.env.VITE_REACT_APP_API_URL}/login",
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        if (response.status !== 200 ){
          setUser(null);
          throw new Error(`Unable to login. Please try again later ${response.status}`)
        }
        checkUserStatus()
        
        navigate("/");
        
      })
        
        
    } catch (error) {
      setUser(null);
      throw new Error("Unable to login. Please try again later")
    }
  };


  const requestAccount = async (email: string, callback: string) => {
    try {
      await axios
        .post(
          "${import.meta.env.VITE_REACT_APP_API_URL}/request_account",
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
      await axios
        .post(
          "${import.meta.env.VITE_REACT_APP_API_URL}/verify_account",
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
    }
  };

  const requestReset = async (email: string, callback: string) => {
    try{
      await axios.post('${import.meta.env.VITE_REACT_APP_API_URL}/request_reset',
        {
            email:email,
            callback:callback
        },{
            withCredentials:false
        }
        ).then( function (response) {
            console.log("response " + response.status + " " + response.data + " " + response.statusText)
        })
    } catch (error) {
        console.log(error)
    }
  };

  const verifyReset = async (jwt: string, password: string) => {
    try{
      await axios.post('${import.meta.env.VITE_REACT_APP_API_URL}/verify_reset',
        {
            jwt:jwt,
            password:password,
        },{
            withCredentials:false
        }
        ).then( function (response) {
            console.log("response " + response.status + " " + response.data + " " + response.statusText)
        })
    } catch (error) {
        console.log(error)
    }
  };

  const checkUserStatus = async () => {
    try{ 
      const response  = await axios.get<User>('${import.meta.env.VITE_REACT_APP_API_URL}/users/me', {
        withCredentials:true
      })

      if(response.status == 401){
        setUser(null)
        navigate('/login')
        return;
      }

      if (response.data) {
        setUser(response.data);
        
      } else {
        setUser(null);
      }

    } catch (error) {
      setUser(null);
      throw new Error("Unable to fetch user")
      
    }
  };

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
