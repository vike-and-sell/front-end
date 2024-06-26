import {FormControl,  FormErrorMessage, FormLabel, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import LoginHeading from "../components/LoginHeading";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function LoginPage() {
    const [username, setUsername] =  useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [statusBool, setStatusBool] = useState<boolean | null>()

    const navigate = useNavigate()

    const { user, loginUser } = useAuth()

    useEffect(()=> {
        if(user){
            navigate('/')
        }
    }, [])

    const onSignIn = async() =>{
        loginUser(username, password)
    }

    return (
        <>
            <main className="flex flex-col sm:flex-row h-screen">
                {/* white logo box  */}
                <LoginHeading></LoginHeading>
                
                {/* blue inputs box */}
                <div className="bg-pri-blue flex flex-col justify-center items-center sm:gap-3 sm:flex-1 sm:order-1 sm:h-full h-2/3 overflow-clip">
                    <div className="flex flex-col px-14 gap-2">
                        
                        <span className="text-white text-4xl font-bold flex self-start py-2">Sign In</span>
                        <span className="text-white text-xl font-bold">Sign In and Lead Green with other UVic Students</span>
                        {statusBool? ("The credentials you entered do not match our records.") : ("") }
                        <span className="text-white text-xl font-bold pt-4">Username</span>
                        <InputGroup>
                            <Input 
                                bg='#ffffff'
                                onChange={(e) =>{setUsername(e.target.value)}}
                                placeholder=''
                                type='email' 
                            />
                            <InputRightAddon className='text-pri-blue font-semibold'>@uvic.ca</InputRightAddon>
                        </InputGroup>
                
                        <span className="text-white text-xl font-bold pt-4">Password</span>
                        <Input
                            bg='#ffffff' 
                            onChange={(e) =>{setPassword(e.target.value)}}
                            placeholder=''
                            type='password' 
                        />
                    </div>

                    <div className="p-5">
                        <button 
                            className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3"
                            onClick={onSignIn}
                            >
                            Sign In
                        </button>
                    </div>
                    
                    <div className="pb-1">
                       <span className="text-white font-bold">Don't have an account? </span>
                        <button className="text-white underline">Create One</button> 
                    </div>
                    <div className="">
                        <span className="text-white font-bold">Forget password? </span>
                        <button className="text-white underline">Recover it</button>
                    </div>
                    
                </div>
            </main>
        </>
    );
}