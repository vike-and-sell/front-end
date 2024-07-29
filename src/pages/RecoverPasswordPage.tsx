import { useState } from 'react';
import { Input,
        InputGroup,
        InputRightAddon,
        FormControl,
        FormLabel,
        FormErrorMessage
    } from '@chakra-ui/react';
import LoginHeading from "../components/LoginHeading";
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from "react-router-dom";

export default function RecoverPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const emailRegex = /^(?!.*\.\.)[^\s@]+$/;
    const isValid = emailRegex.test(email) && !email.endsWith("@uvic.ca");
    const isEmpty = email === "";
    const hasAtSymbol = /@/.test(email);
    const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
    const [statusBool, setStatusBool] = useState<boolean | null>(null);
    const auth = useAuth()
    const navigate = useNavigate();

    const handleReset = ()=> {
        if(isValid){
            setEmail(email + "@uvic.ca");
            setStatusBool(null);
            if (auth){
                auth.requestReset(email, `${location.origin}/unverified/reset/jwt?=`) 
            }
            
        } else {
            setStatusBool(true);
        } 
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        setIsEmailTouched(true);
    };

    return (
        <>
            <main className="flex flex-col sm:flex-row h-screen">
                {/* white logo box  */}
                <LoginHeading></LoginHeading>
                
                {/* blue inputs box */}
                <div className="bg-pri-blue flex flex-col justify-center items-center sm:gap-3 sm:flex-1 sm:order-1 sm:h-screen h-2/3">
                    <div className="flex flex-col px-14 gap-2">
                        
                        <span className="text-white text-xl md:text-4xl font-bold flex self-start py-2">Forgot Password</span>
                        <span className="text-white text-md md:text-xl font-semibold pb-3">Please enter your email address to receive instructions on how to reset your password</span>

                        {statusBool? (<div className="text-white px-6 text-center">
                                        This email is not linked to an account. Please enter a valid email and try again.
                                      </div>) : ("") }

                        <FormControl isRequired isInvalid={(!isValid || isEmpty || hasAtSymbol) && isEmailTouched}>
                            <FormLabel fontSize={[19,19,25,27]} textColor='white'>Email Address</FormLabel>
                            <InputGroup>
                                <Input 
                                    bg='white'
                                    type='email'
                                    value={email} 
                                    onChange={handleInputChange}
                                />
                                <InputRightAddon className='text-pri-blue font-semibold'>@uvic.ca</InputRightAddon>
                            </InputGroup>
                            {hasAtSymbol ? (
                                <FormErrorMessage textColor='white'>Please only enter your Netlink ID</FormErrorMessage>
                            ): isEmpty ? (
                                <FormErrorMessage textColor='white'>Please enter your Netlink ID</FormErrorMessage>
                            ): !isValid ? (
                                <FormErrorMessage textColor='white'>Please ensure you have entered your Netlink ID correctly</FormErrorMessage>
                            ):(
                                ("")
                            )}
                        </FormControl>  
                    </div>

                    <div className="p-5 flex gap-16">
                        <button 
                            className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3"
                            onClick={handleReset}>
                            Send Email
                        </button>
                        <button className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3"
                                onClick={() => {
                                    navigate(`/login`);
                                  }}>
                            Cancel
                        </button>
                    </div>
                    
                </div>
            </main>
        </>
    );
}
