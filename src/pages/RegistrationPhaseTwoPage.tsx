import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { useState } from 'react';
import { Input,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText
    } from '@chakra-ui/react';

export default function RegistrationPhaseTwoPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const usernameRegex = /^[a-zA-Z0-9_@]*$/;
    const isValidUserSymbols = usernameRegex.test(username);
    const isValidUserLen = username.length >= 6 && username.length <= 20;
    const [isUserTouched, setIsUserTouched] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{1,}$/;
    const isValidPassSymbols = passwordRegex.test(password) || password.length === 0;
    const isValidPassLen = password.length >= 8;
    const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);

    const [confPassword, setConfPassword] = useState<string>("");
    const isValidConfPassword = confPassword === password;
    const [isConfPasswordTouched, setIsConfPasswordTouched] = useState<boolean>(false);

    const [userLocation, setUserLocation] = useState("");
    const locationRegex = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;
    const isValidLocation = locationRegex.test(userLocation);
    const [isLocationTouched, setIsLocationTouched] = useState<boolean>(false);

    const [statusBool, setStatusBool] = useState<boolean | null>(null);
    const auth = useAuth();
    const location = useLocation();

    const token = new URLSearchParams(location.search).toString().substring(1);

    const onSignUp = async() =>{
        if(isValidPassLen && isValidPassSymbols && 
            isValidUserLen && isValidUserSymbols &&
            isValidConfPassword && isValidLocation){
                if (auth){
                    auth.verifyAccount(token, username, password , userLocation.substring(0,3))
                }
              
            setStatusBool(null);
            console.log('Sign up successful');
        } else {
            setStatusBool(true);
        }
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
                    <FormControl isRequired isInvalid={(!isValidUserSymbols || !isValidUserLen) && isUserTouched}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Username</FormLabel>
                        <Input 
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUserTouched(true);
                          }}
                        />
                        {!isValidUserSymbols && isUserTouched ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Only use alphanumeric or '_' or '@' characters</FormErrorMessage>
                        ): !isValidUserLen && isUserTouched ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must be 6-20 characters</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl> 

                    <FormControl isRequired isInvalid={(!isValidPassSymbols || !isValidPassLen) && isPasswordTouched}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Password</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='password'
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setIsPasswordTouched(true);
                          }}
                        />
                        {!isValidPassSymbols && isPasswordTouched ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>
                              Must contain at least 1 of each character: uppercase, lowercase, number, special
                              </FormErrorMessage>
                        ):!isValidPassLen && isPasswordTouched ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must be at aleast 8 characters</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl> 

                    <FormControl isRequired isInvalid={!isValidConfPassword && isConfPasswordTouched}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Confirm Password</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='password'
                          value={confPassword}
                          onChange={(e) => {
                            setConfPassword(e.target.value);
                            setIsConfPasswordTouched(true);
                          }}
                        />
                        {!isValidConfPassword && isConfPasswordTouched ? (
                            <FormErrorMessage fontSize={['xs', 'sm']}>Must match password entered above</FormErrorMessage>
                        ):(
                            <FormHelperText fontSize={['xs', 'sm']}></FormHelperText>
                        )}
                    </FormControl> 
   
                    <FormControl isRequired isInvalid={!isValidLocation && isLocationTouched}>
                        <FormLabel fontSize={[16,19,25,18]} textColor='rt-dark-blue'>Postal Code</FormLabel>
                        <Input
                          size={['sm', 'md', 'md','small']}
                          variant='outline'
                          type='text'
                          value={userLocation}
                          onChange={(e) => {
                            setUserLocation(e.target.value.toUpperCase());
                            setIsLocationTouched(true);
                          }}
                        />
                        {!isValidLocation && isLocationTouched ?(
                            <FormErrorMessage fontSize={['xs', 'sm']}>Enter a valid postal code</FormErrorMessage>
                        ):(
                            ('')
                        )}
                    </FormControl> 
                </div>    

                <div className='flex flex-col justify-center items-center pt-1 sm:pt-2 lg:pt-0 xl:pt-2'>
                    <div>
                        <span className='text-rt-dark-blue font-semibold md:font-bold text-[13px] md:text-lg lg:text-[16px]'>
                            Already have an account?{' '}
                        </span>
                        <button className='text-rt-dark-blue underline font-semibold md:font-bold text-[13px] md:text-lg lg:text-[16px]'
                                onClick={() => {
                                    navigate(`/login`);
                                }}
                        >
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
