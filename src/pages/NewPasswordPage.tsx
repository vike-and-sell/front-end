import { Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
// gap-4 sm:gap-16 lg:gap-3 xl:gap-12
export default function NewPasswordPage() {

    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")

    const location = useLocation();

    const { verifyReset } = useAuth()

    const token = new URLSearchParams(location.search).toString().substring(1);

    const onReset = ()=> {
        verifyReset(token, password)
    }

    console.log(token)

    return (
        <>
            <div className="flex flex-col justify-evenly h-full"> 
                <div className="flex flex-col">
                    <span className="px-3 text-center text-2xl md:text-3xl font-bold mb-auto">
                        Create a New Password
                    </span> 
                </div>

                <div className="flex flex-col px-8">
                    <span className="text-md sm:text-lg md:text-2xl font-semibold pt-3 lg:px-9">
                        Old Password *
                    </span>
                    <div className="lg:px-10">
                        <Input variant='outline' type='text' placeholder='' size='small'/>
                    </div>
                
                    <span className="text-md sm:text-lg md:text-2xl font-semibold pt-9 lg:px-9">
                        New Password *
                    </span>
                    <div className="lg:px-10">
                        <Input 
                            onChange={(e) => {setPassword(e.target.value)}} 
                            size='small'
                            type='text'
                            variant='outline'

                            />
                    </div>

                    <span className="text-md sm:text-lg md:text-2xl font-semibold pt-9 lg:px-9">
                        Confirm Password *
                    </span>
                    <div className="lg:px-10">
                        <Input 
                            onChange={(e) => {setPasswordCheck(e.target.value)}} 
                            size='small'
                            type='text'
                            variant='outline'/>
                    </div>              
                </div>    

                <div className="flex flex-col justify-center items-center pb-5 self-center">
                        <button 
                            className="bg-pri-blue relative px-4 rounded-md text-white text-xl md:text-2xl font-semibold p-3"
                            onClick={onReset}>
                            Reset Password
                        </button>
                </div>                    
            </div>
        </>
    );
}