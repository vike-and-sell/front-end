import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { Input,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText
    } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

export default function RegistrationPhaseOnePage() {
    const [email, setEmail] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
    const [statusBool, setStatusBool] = useState<boolean | null>(null);

    const navigate = useNavigate();
    const { requestAccount } = useAuth();

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.endsWith('@uvic.ca');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsEmpty(newEmail === '');
        setIsValid(validateEmail(newEmail));
    };

    const handleCreate = () =>{
        if(isValid && !isEmpty){
            setStatusBool(null);
            requestAccount(email, "http://localhost:5173/unverified/signup-token/jwt?=");
        } else {
            setStatusBool(true);
        } 
    }

    return (
        <>
            <div className="flex flex-col justify-evenly h-full">
                <div className="flex flex-col px-3 pb-20">
                    <span className="text-rt-dark-blue text-center text-xl md:text-2xl font-bold">
                      Join the Green Movement on the UVic campus today!
                    </span>
                </div>

                {statusBool? (<div className="text-red px-6 text-center">
                                        Invalid email address. Please try again.
                                      </div>) : ("") }

                <div className="flex flex-col px-6 pb-5 xl:px-14">
                    <FormControl isRequired isInvalid={isEmpty || !isValid}>
                        <FormLabel fontSize={[19,19,25,27]} textColor='rt-dark-blue'>Email Address</FormLabel>
                        <Input 
                          variant='outline'
                          type='email'
                          value={email}
                          onChange={handleInputChange} />
                        {isEmpty ? (
                            <FormErrorMessage>Email Address Required</FormErrorMessage>
                        ): !isValid ?(
                            <FormErrorMessage>Must Be a Valid UVic Email Address</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl>  
                </div> 

        <div className='flex flex-col justify-center items-center'>
          <div className='flex-col justify-center items-center'>
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

          <div className='p-5 self-center'>
            <button
              className='bg-pri-blue relative px-4 rounded-md text-white text-lg sm:text-xl font-semibold p-3'
              onClick={handleCreate}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
