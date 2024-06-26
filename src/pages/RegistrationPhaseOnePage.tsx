import { Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../utils/AuthContext';

export default function RegistrationPhaseOnePage() {

    const [email, setEmail] =  useState<string>("")

    const { user, requestAccount } = useAuth()

    const handleCreate= async() =>{
        requestAccount(email, "http://localhost:5173/unverified/signup-token/jwt?=")
    }
    
    return (
        <>
            <div className="flex flex-col justify-evenly h-full">
                <div className="flex flex-col px-3 pb-20">
                    <span className="text-rt-dark-blue text-center text-xl md:text-2xl font-bold">Join the Green Movement on the UVic campus today!</span>
                </div>

                <div className="flex flex-col px-6 lg:px-10 xl:px-14">
                    <span className="text-rt-dark-blue text-lg md:text-xl font-bold pt-4">Email Address*</span>
                    <Input 
                        variant='outline' 
                        type='text' 
                        placeholder='' 
                        onChange={(e) =>{setEmail(e.target.value)}}/>   
                </div> 

                <div className="flex flex-col justify-center items-center">
                    <div className="flex-col justify-center items-center">
                        <span className="text-rt-dark-blue font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]">Already have an account? </span>
                        <button className="text-rt-dark-blue underline font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]">Sign In</button> 
                    </div>

                    <div className="p-5 self-center">
                        <button className="bg-pri-blue relative px-4 rounded-md text-white text-lg sm:text-xl font-semibold p-3" onClick={handleCreate}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}