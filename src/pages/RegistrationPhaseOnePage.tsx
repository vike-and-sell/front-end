import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';
import { Input,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText
    } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { PriBlueButton } from '../components/Button';

export default function RegistrationPhaseOnePage() {
    const [email, setEmail] = useState<string>("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email) && email.endsWith('@uvic.ca');
    const isEmpty = email === ""
    const [isTouched, setIsTouched] = useState<boolean>(false);
    const [statusBool, setStatusBool] = useState<boolean | null>(null);
    const [successBool, setSuccessBool] = useState<boolean>(false);

    const navigate = useNavigate();
    const auth = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsTouched(true);
    };

    const handleCreate = () =>{
      try{
        if (auth){
          auth.requestAccount(email, `${location.origin}/unverified/signup-token/jwt?=`);
        }
        setStatusBool(null);
        setSuccessBool(true);
      } catch {
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
                
                {successBool ? (<div className='text-rt-dark-blue px-6 text-center'>
                                        Success! Check your email for a registration link.
                                      </div>) : ("")}

                <div className="flex flex-col px-6 pb-5 xl:px-14">
                    <FormControl isRequired isInvalid={(isEmpty || !isValid) && isTouched}>
                        <FormLabel fontSize={[19,19,25,27]} textColor='rt-dark-blue'>Email Address</FormLabel>
                        <Input 
                          variant='outline'
                          type='email'
                          value={email}
                          onChange={handleInputChange} />
                        {isEmpty && isTouched ? (
                            <FormErrorMessage>Email Address Required</FormErrorMessage>
                        ): !isValid && isTouched ?(
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
            <PriBlueButton
              isDisabled={!isValid || isEmpty}
              clickHandle={handleCreate}
              title='Sign Up'>
            </PriBlueButton>
          </div>
        </div>
      </div>
    </>
  );
}
