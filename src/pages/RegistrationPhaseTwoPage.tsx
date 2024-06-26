import { Input } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'react-router-dom';


export default function RegistrationPhaseTwoPage() {

    const { jwt } = useParams();
    const [search, setSearch] = useSearchParams();

    const tr = search.get('jwt')
    console.log(jwt)
    return (
        <>
            <div className="flex flex-col justify-evenly h-full"> 
                <div className="flex flex-col">
                    <span className="text-rt-dark-blue px-3 text-center text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold mb-auto">
                        Join the Green Movement on the UVic campus today! {tr}

                    </span> 
                </div>

                <div className="flex flex-col px-6 lg:px-14">
                    <span className="text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold px-2 xl:px-0 xl:pt-4">
                        Username *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6">
                        Password *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6">
                        Confirm Password *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>

                    <span className="text-rt-dark-blue text-md sm:text-lg md:text-xl lg:text-lg font-bold pt-4 px-2 xl:px-0 xl:pt-6">
                        Postal Code *
                    </span>
                    <Input variant='outline' type='text' placeholder='' size='small'/>              
                </div>    

                <div className="flex flex-col justify-center items-center pt-4">
                    <div>
                        <span className="text-rt-dark-blue font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]">
                            Already have an account?{' '}
                        </span>
                        <button className="text-rt-dark-blue underline font-semibold md:font-bold text-sm md:text-lg lg:text-[16px]">
                            Sign In
                        </button> 
                    </div>

                    <div className="py-2 pb-5 sm:p-5 lg:p-2 xl:p-4 self-center">
                        <button className="bg-pri-blue relative px-4 rounded-md text-white text-lg font-semibold p-3">
                            Sign Up
                        </button>
                    </div>
                </div>                    
            </div>
        </>
    );
}