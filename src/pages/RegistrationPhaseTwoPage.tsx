import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export default function RegistrationPhaseTwoPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userLocation, setUserLocation] = useState("");

  const { jwt } = useParams();
  const location = useLocation();

  const { verifyAccount } = useAuth();

  const token = new URLSearchParams(location.search).toString().substring(1);

  const onCreate = () => {
    //Need to check if user exists already
    verifyAccount(token, username, password, userLocation);
  };

  console.log(token);
  return (
    <>
      <div className='flex flex-col justify-evenly h-full'>
        <div className='flex flex-col'>
          <span className='text-rt-dark-blue px-3 text-center text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold mb-auto'>
            Join the Green Movement on the UVic campus today!
          </span>
        </div>

        <div className='flex flex-col px-6 lg:px-14'>
          <span className='text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold px-2 xl:px-0 xl:pt-4'>
            Username *
          </span>
          <Input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder=''
            size='small'
            type='text'
            variant='outline'
          />

          <span className='text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6'>
            Password *
          </span>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder=''
            size='small'
            type='password'
            variant='outline'
          />

          <span className='text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6'>
            Confirm Password *
          </span>
          <Input
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            placeholder=''
            size='small'
            type='password'
            variant='outline'
          />

          <span className='text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6'>
            Postal Code *
          </span>
          <Input
            onChange={(e) => {
              setUserLocation(e.target.value);
            }}
            placeholder=''
            size='small'
            type='text'
            variant='outline'
          />
        </div>

        <div className='flex flex-col justify-center items-center pt-4'>
          <div>
            <span className='text-rt-dark-blue font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]'>
              Already have an account?{" "}
            </span>
            <button
              className='text-rt-dark-blue underline font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]'
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </button>
          </div>

          <div className='py-2 pb-5 sm:p-5 lg:p-2 xl:p-4 self-center'>
            <button
              className='bg-pri-blue relative px-4 rounded-md text-white text-lg font-semibold p-3'
              onClick={onCreate}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
