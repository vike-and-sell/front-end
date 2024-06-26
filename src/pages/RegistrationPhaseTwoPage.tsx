import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';
import { Input,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText
    } from '@chakra-ui/react';

export default function RegistrationPhaseTwoPage() {
    const [username, setUsername] = useState<string>("");
    const [isValidUserSymbols, setIsValidUserSymbols] = useState<boolean>(false);
    const [isValidUserLen, setIsValidUserLen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [isValidPassSymbols, setIsValidPassSymbols] = useState<boolean>(true);
    const [isValidPassLen, setIsValidPassLen] = useState<boolean>(false);
    const [confPassword, setConfPassword] = useState<string>("");
    const [isValidConfPassword, setIsValidConfPassword] = useState<boolean>(false);
    const [userLocation, setUserLocation] = useState("");
    const [isEmptyLocation, setIsEmptyLocation] = useState<boolean>(true);
    const [statusBool, setStatusBool] = useState<boolean | null>(null);
    const { verifyAccount } = useAuth();
    const location = useLocation();

    const token = new URLSearchParams(location.search).toString().substring(1);

    const onSignUp = async() =>{
        if(isValidPassLen && isValidPassSymbols && 
            isValidUserLen && isValidUserSymbols &&
            isValidConfPassword && !isEmptyLocation){
              verifyAccount(token, username, password , userLocation)
            setStatusBool(null);
            console.log('Sign-in successful');
        } else {
            setStatusBool(true);
        }
    }

    function validateUsername(username: string){
        setIsValidUserLen(username.length >= 6 && username.length <= 20);

        const usernameRegex = /^[a-zA-Z0-9_@]*$/;
        setIsValidUserSymbols(usernameRegex.test(username));
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);
        validateUsername(newUsername);
    };

    function validatePassword(password: string){
        setIsValidPassLen(password.length >= 8);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{1,}$/;
        setIsValidPassSymbols(passwordRegex.test(password) || password.length === 0);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfPassword = e.target.value;
        setConfPassword(newConfPassword);
        setIsValidConfPassword(newConfPassword === password);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const location = e.target.value;
        setUserLocation(location);
        setIsEmptyLocation(location === "");
    }

    return (
        <>
            <div className='flex flex-col justify-evenly h-full'> 
                <div className='flex flex-col'>
                    <span className='text-rt-dark-blue px-3 text-center text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold mb-auto'>
                        Join the Green Movement on the UVic campus today!
                    </span> 
                </div>

                {statusBool? (<div className="text-red px-5 text-center text-xs sm:text-sm">
                                        Invalid Input. Please see input fields for requirements and try again.
                                      </div>) : ("") }

                <div className='flex flex-col px-6 sm:gap-1 lg:gap-0 xl:gap-2'>
                    <FormControl isRequired isInvalid={!isValidUserSymbols || !isValidUserLen}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Username</FormLabel>
                        <Input 
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={username}
                          onChange={handleUsernameChange}
                        />
                        {!isValidUserSymbols ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Only use alphanumeric or '_' or '@' characters</FormErrorMessage>
                        ): !isValidUserLen ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must be 6-20 characters</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl> 

                    <FormControl isRequired isInvalid={!isValidPassSymbols || !isValidPassLen}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Password</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        {!isValidPassSymbols ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>
                              Must contain at least 1 of each character: uppercase, lowercase, number, special
                              </FormErrorMessage>
                        ):!isValidPassLen ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must be at aleast 8 characters</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl> 

                    <FormControl isRequired isInvalid={!isValidConfPassword}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Confirm Password</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={confPassword}
                          onChange={handleConfPasswordChange}
                        />
                        {!isValidConfPassword ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must match password entered above</FormErrorMessage>
                        ):(
                            <FormHelperText fontSize={['xs', 'sm']}></FormHelperText>
                        )}
                    </FormControl> 
   
                    <FormControl isRequired isInvalid={isEmptyLocation}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Postal Code</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={userLocation}
                          onChange={handleLocationChange}
                        />
                        {isEmptyLocation ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Location Required</FormErrorMessage>
                        ):(
                            <FormHelperText fontSize={['xs', 'sm']}></FormHelperText>
                        )}
                    </FormControl> 
                </div>    

                <div className='flex flex-col justify-center items-center pt-1 sm:pt-2 lg:pt-0 xl:pt-2'>
                    <div>
                        <span className='text-rt-dark-blue font-semibold md:font-bold text-[13px] md:text-lg lg:text-[16px]'>
                            Already have an account?{' '}
                        </span>
                        <button className='text-rt-dark-blue underline font-semibold md:font-bold text-[13px] md:text-lg lg:text-[16px]'>
                            Sign In
                        </button> 
                    </div>

                    <div className='py-2 pb-5 sm:p-5 lg:p-2 xl:p-4 self-center'>
                        <button
                          className='bg-pri-blue relative px-4 rounded-md text-white text-lg font-semibold p-3'
                          onClick={onSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>                    
            </div>
        </>
    );
}
