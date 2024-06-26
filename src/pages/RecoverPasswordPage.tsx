import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import LoginHeading from "../components/LoginHeading";
import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export default function RecoverPasswordPage() {

    const [email, setEmail] =  useState<string>("")

    const { requestReset } = useAuth()

    const handleReset = ()=> {
        requestReset(email, "http://localhost:5173/unverified/reset/jwt?=")
    }
    return (
        <>
            <main className="flex flex-col sm:flex-row h-screen">
                {/* white logo box  */}
                <LoginHeading></LoginHeading>
                
                {/* blue inputs box */}
                <div className="bg-pri-blue flex flex-col justify-center items-center sm:gap-3 sm:flex-1 sm:order-1 sm:h-screen h-2/3">
                    <div className="flex flex-col px-14 gap-2">
                        
                        <span className="text-white text-xl md:text-4xl font-bold flex self-start py-2">Forgot Password</span>
                        <span className="text-white text-md md:text-xl font-semibold">Please enter your email address to receive instructions on how to reset your password</span>

                        <span className="text-white text-xl font-bold pt-4">Email Address</span>
                        <InputGroup>
                            <Input 
                                bg='#ffffff'
                                placeholder=''
                                onChange={(e) =>{setEmail(e.target.value)}}
                                type='email' 
                                
                            />
                            <InputRightAddon className='text-pri-blue font-semibold'>@uvic.ca</InputRightAddon>
                        </InputGroup>
                    </div>

                    <div className="p-5 flex gap-16">
                        <button 
                            className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3"
                            onClick={handleReset}>
                            Send Email
                        </button>
                        <button className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3">
                            Cancel
                        </button>
                    </div>
                    
                </div>
            </main>
        </>
    );
}