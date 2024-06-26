import { Input } from '@chakra-ui/react';

export default function RegistrationPhaseOnePage() {
    return (
        <>
            <div className="flex text-rt-dark-blue flex-col justify-evenly h-full">
                <div className="flex flex-col px-3 pb-20">
                    <span className="text-center text-base md:text-2xl font-bold">Join the Green Movement on the UVic campus today!</span>
                </div>

                <div className="flex flex-col px-6 xl:px-14">
                    <span className="text-base sm:text-[19px] font-semibold pt-4 mb-3">Email Address*</span>
                    <Input variant='outline' type='text' placeholder=''/>   
                </div> 

                <div className="flex flex-col justify-center items-center">
                    <div className="flex-col justify-center items-center">
                        <span className="font-semibold text-md sm:text-lg">Already have an account? </span>
                        <button className="underline text-md sm:text-lg">Sign In</button> 
                    </div>

                    <div className="p-5 self-center">
                        <button className="bg-pri-blue relative py-2 px-6 rounded-md text-white text-lg sm:text-base font-semibold ">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}