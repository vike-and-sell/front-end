import { Input } from '@chakra-ui/react';

export default function RegistrationPhaseOnePage() {
    return (
        <>
            <div className="flex flex-col justify-evenly h-full"> 
                <div className="flex flex-col">
                    <span className="px-3 text-center text-xl md:text-3xl lg:text-2xl xl:text-3xl font-bold mb-auto">
                        Join the Green Movement on the UVic campus today!
                    </span> 
                </div>

                <div className="flex flex-col px-6">
                    <span className="text-md sm:text-lg md:text-2xl lg:text-xl font-semibold px-2 xl:px-11">
                        Username *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-md sm:text-lg md:text-2xl lg:text-xl font-semibold pt-3 px-2 xl:px-11">
                        Password *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-md sm:text-lg md:text-2xl lg:text-xl font-semibold pt-3 px-2 xl:px-11">
                        Confirm Password *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-md sm:text-lg md:text-2xl lg:text-xl font-semibold pt-3 px-2 xl:px-11">
                        Postal Code *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>              
                </div>    

                <div className="flex flex-col justify-center items-center pt-4">
                    <div>
                        <span className="font-bold text-md sm:text-lg md:text-xl lg:text-[16px]">
                            Already have an account?{' '}
                        </span>
                        <button className="underline text-md sm:text-lg md:text-xl lg:text-[16px]">
                            Sign In
                        </button> 
                    </div>

                    <div className="py-2 px-8 pb-5 sm:p-5 lg:p-2 xl:p-8 self-center">
                        <button className="bg-pri-blue relative px-4 rounded-md text-white text-lg font-semibold p-3">
                            Sign Up
                        </button>
                    </div>
                </div>                    
            </div>
        </>
    );
}