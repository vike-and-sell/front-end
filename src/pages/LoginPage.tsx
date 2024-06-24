import { Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import LoginHeading from "../components/LoginHeading";

export default function LoginPage() {
    return (
        <>
            <main className="flex flex-col sm:flex-row h-screen overflow-scroll">
                {/* white logo box  */}
                <LoginHeading></LoginHeading>
                
                {/* blue inputs box */}
                <div className="bg-pri-blue flex flex-col justify-center items-center sm:gap-3 sm:flex-1 sm:order-1 sm:h-full h-2/3 overflow-clip">
                    <div className="flex flex-col px-14 gap-2">
                        
                        <span className="text-white text-4xl font-bold flex self-start py-2">Sign In</span>
                        <span className="text-white text-xl font-bold">Sign In and Lead Green with other UVic Students</span>

                        <span className="text-white text-xl font-bold pt-4">Email Address</span>
                        <InputGroup>
                            <Input variant='filled' type='email' placeholder=''/>
                            <InputRightAddon className='text-pri-blue font-semibold'>@uvic.ca</InputRightAddon>
                        </InputGroup>
                
                        <span className="text-white text-xl font-bold pt-4">Password</span>
                        <Input variant='filled' type='text' placeholder=''/>
                    </div>

                    <div className="p-5">
                        <button className="bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3">
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