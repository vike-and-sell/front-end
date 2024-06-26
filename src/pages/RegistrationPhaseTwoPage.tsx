import { Input } from '@chakra-ui/react';

export default function RegistrationPhaseOnePage() {
    return (
        <>
            <div className="flex text-rt-dark-blue flex-col justify-evenly h-full"> 
                <div className="flex flex-col">
                    <span className="text-center text-base md:text-2xl font-bold mb-auto">
                        Join the Green Movement on the UVic campus today!
                    </span> 
                </div>

                <div className="flex flex-col px-6">
                    <span className="text-sm sm:text-base font-semibold px-2 xl:px-11">
                        Username *
                    </span>
                    <Input 
                        size='sm'
                        type='text' 
                        placeholder=''
                        variant='outline'    
                    />

                    <span className="text-sm sm:text-base font-semibold pt-3 px-2 xl:px-11">
                        Password *
                    </span>
                    <Input
                        placeholder=''
                        size='sm'
                        type='password'
                        variant='outline' 
                    />

                    <span className="text-sm sm:text-base font-semibold pt-3 px-2 xl:px-11">
                        Confirm Password *
                    </span>
                    <Input 
                        variant='outline' 
                        type='text' 
                        placeholder='' 
                        size='sm'/>

                    <span className="text-sm sm:text-base font-semibold pt-3 px-2 xl:px-11">
                        Postal Code *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='sm'/>              
                </div>    

                <div className="flex flex-col justify-center items-center pt-4">
                    <div>
                        <span className="font-semibold text-md sm:text-lg">
                            Already have an account?{' '}
                        </span>
                        <button className="underline text-md sm:text-lg">
                            Sign In
                        </button> 
                    </div>

                    <div className="py-2 px-8 pb-5 sm:p-5 lg:p-2 xl:p-8 self-center">
                        <button className="bg-pri-blue relative py-1 px-4 rounded-md text-white text-lg font-semibold">
                            Sign Up
                        </button>
                    </div>
                </div>                    
            </div>
        </>
    );
}