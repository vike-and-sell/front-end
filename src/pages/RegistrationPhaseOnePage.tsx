import { Input } from '@chakra-ui/react';

export default function RegistrationPhaseOnePage() {
    return (
        <>
            <div className="flex flex-col justify-evenly h-full">
                <div className="flex flex-col px-3 pb-20">
                    <span className="text-center text-xl md:text-3xl font-bold">Join the Green Movement on the UVic campus today!</span>
                </div>

                <div className="flex flex-col px-6 xl:px-14">
                    <span className="text-xl sm:text-[27px] font-semibold pt-4">Email Address*</span>
                    <Input variant='outline' type='text' placeholder=''/>   
                </div> 

                <div className="flex flex-col justify-center items-center">
                    <div className="flex-col justify-center items-center">
                        <span className="font-semibold md:font-bold text-md sm:text-2xl">Already have an account? </span>
                        <button className="underline text-md sm:text-2xl">Sign In</button> 
                    </div>

                    <div className="p-5 self-center">
                        <button className="bg-pri-blue relative px-4 rounded-md text-white text-lg sm:text-2xl font-semibold p-3">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}