import { useState } from 'react';
import { Input,
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText
    } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function NewPasswordPage() {
    // const [OldPassword, setOldPassword] = useState('');
    // const [isValidOldPassword, setIsValidOldPassword] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [isValidPassSymbols, setIsValidPassSymbols] = useState<boolean>(true);
    const [isValidPassLen, setIsValidPassLen] = useState<boolean>(false);
    const [confPassword, setConfPassword] = useState<string>("");
    const [isValidConfPassword, setIsValidConfPassword] = useState<boolean>(false);
    const [statusBool, setStatusBool] = useState<boolean | null>()

    const location = useLocation();

    const { verifyReset } = useAuth()

    const token = new URLSearchParams(location.search).toString().substring(1);

    const onReset = ()=> {
        if(isValidPassLen && isValidPassSymbols && isValidConfPassword){
            setStatusBool(null);
            verifyReset(token, password)
        } else {
            setStatusBool(true);
        }
    }

    // const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const oldPassword = e.target.value;
    //     setOldPassword(oldPassword);
    //     // call endpoint to get password, placeholder below
    //     const storedPassword = '';
    //     setIsValidOldPassword(oldPassword === storedPassword);
    // };

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

    return (
        <>
            <div className="flex flex-col justify-evenly h-full"> 
                <div className="flex flex-col">
                    <span className="px-3 text-center text-2xl md:text-3xl font-bold mb-auto">
                        Create a New Password
                    </span> 
                </div>

                {statusBool? (<div className="text-red px-6 text-center">
                                Invalid Input. Please see input fields for requirements and try again.
                              </div>) : ("") 
                }

                <div className='flex flex-col px-8 gap-6'>
                    {/* <FormControl isRequired isInvalid={!isValidOldPassword}>
                        <FormLabel fontSize={[16,19,25,27]} textColor='rt-dark-blue'>Old Password</FormLabel>
                        <Input variant='outline' type='password' value={OldPassword} onChange={handleOldPasswordChange} />
                        {!isValidConfPassword ? (
                            <FormErrorMessage>Incorrect Password</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl>   */}
                
                    <FormControl isRequired isInvalid={!isValidPassSymbols || !isValidPassLen}>
                        <FormLabel fontSize={[16,19,25,27]} textColor='rt-dark-blue'>New Password</FormLabel>
                        <Input variant='outline' type='password' value={password} onChange={handlePasswordChange} />
                        {!isValidPassSymbols ? (
                            <FormErrorMessage>Must contain at least 1 of each character: uppercase, lowercase, number, special</FormErrorMessage>
                        ):!isValidPassLen ? (
                            <FormErrorMessage>Must be at aleast 8 characters</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl> 

                    <FormControl isRequired isInvalid={!isValidConfPassword}>
                        <FormLabel fontSize={[16,19,25,27]} textColor='rt-dark-blue'>Confirm Password</FormLabel>
                        <Input variant='outline' type='password' value={confPassword} onChange={handleConfPasswordChange} />
                        {!isValidConfPassword ? (
                            <FormErrorMessage>Must match password entered above</FormErrorMessage>
                        ):(
                            <FormHelperText></FormHelperText>
                        )}
                    </FormControl>            
                </div>    

                <div className="flex flex-col justify-center items-center pb-5 self-center">
                        <button className="bg-pri-blue relative px-4 rounded-md text-white text-xl md:text-2xl font-semibold p-3"
                                onClick={onReset}
                        >
                            Reset Password
                        </button>
                </div>                    
            </div>
        </>
    );
}