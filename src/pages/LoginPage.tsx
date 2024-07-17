import {FormControl,
        FormErrorMessage,
        FormHelperText,
        FormLabel,
        Input 
} from '@chakra-ui/react';
import LoginHeading from "../components/LoginHeading";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState<string>("")
    const [isValidUserSymbols, setIsValidUserSymbols] = useState<boolean>(false);
    const [isValidUserLen, setIsValidUserLen] = useState<boolean>(false);
    const [isUserTouched, setIsUserTouched] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("")
    const [isValidPassSymbols, setIsValidPassSymbols] = useState<boolean>(true);
    const [isValidPassLen, setIsValidPassLen] = useState<boolean>(false);
    const [isPasswordTouched, setIsPasswordTouched] = useState<boolean>(false);
    const [statusBool, setStatusBool] = useState<boolean | null>()

    const navigate = useNavigate()

    const auth = useAuth()

    useEffect(()=> {
        //checkUserStatus()
        if(auth && auth.user){
            navigate('/')
        }
    }, [auth, auth?.user])

    const onSignIn = async() =>{
        if(isValidPassLen && isValidPassSymbols && isPasswordTouched &&
            isValidUserLen && isValidUserSymbols && isUserTouched 
        ){
            if (auth){
                await auth.loginUser(username, password)
                setStatusBool(null);
                console.log('Sign-in successful');
            }
            
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
        setIsUserTouched(true);
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
        setIsPasswordTouched(true);
        validatePassword(newPassword);
    };

    return (
        <>
            <main className="flex flex-col sm:flex-row h-screen">
                {/* white logo box  */}
                <LoginHeading></LoginHeading>
                
                {/* blue inputs box */}
                <div className="bg-pri-blue flex flex-col justify-center items-center gap-0 sm:gap-3 sm:flex-1 sm:order-1 sm:h-full h-2/3 overflow-clip">
                    <div className="flex flex-col px-10 gap-3">
                        
                        <span className="text-white text-xl sm:text-2xl md:text-4xl font-bold flex self-start sm:py-1">Sign In</span>
                        <span className="text-white text-sm sm:text-lg md:text-xl font-bold">Sign In and Lead Green with other UVic Students</span>

                        {statusBool? (<div className="text-white text-center text-xs sm:text-sm">
                                        The credentials you entered do not match our records.
                                      </div>) : ("") }

                        <FormControl isRequired isInvalid={(!isValidUserSymbols || !isValidUserLen) && isUserTouched}>
                            <FormLabel fontSize={[16,19,25,27]} textColor='white'>Username</FormLabel>
                            <Input size={['sm', 'md', 'md','md']} bg='white' type='text' value={username} onChange={handleUsernameChange} />
                            {!isValidUserSymbols && isUserTouched ? (
                                <FormErrorMessage fontSize={['xs', 'sm']} textColor='white'>Only use alphanumeric or '_' or '@' characters</FormErrorMessage>
                            ): !isValidUserLen && isUserTouched ? (
                                <FormErrorMessage fontSize={['xs', 'sm']} textColor='white'>Must be 6-20 characters</FormErrorMessage>
                            ):(
                                <FormHelperText></FormHelperText>
                            )}
                        </FormControl> 

                        <FormControl isRequired isInvalid={(!isValidPassSymbols || !isValidPassLen) && isPasswordTouched}>
                            <FormLabel fontSize={[16,19,25,27]} textColor='white'>Password</FormLabel>
                            <Input size={['sm', 'md', 'md','md']} bg='white' type='password' value={password} onChange={handlePasswordChange} />
                            {!isValidPassSymbols && isPasswordTouched ? (
                                <FormErrorMessage fontSize={['xs', 'sm']} textColor='white'>Must contain at least 1 of each character: uppercase, lowercase, number, special</FormErrorMessage>
                            ):!isValidPassLen && isPasswordTouched ? (
                                <FormErrorMessage fontSize={['xs', 'sm']} textColor='white'>Must be at aleast 8 characters</FormErrorMessage>
                            ):(
                                <FormHelperText></FormHelperText>
                            )}
                        </FormControl> 
                    </div>

                    <div className="p-4">
                        <button 
                            className="bg-white relative px-4 rounded-md text-pri-blue text-sm sm:text-md font-semibold p-3"
                            onClick={onSignIn}
                            >
                            Sign In
                        </button>
                    </div>
                    
                    <div className="pb-0 sm:pb-1">
                       <span className="text-white text-sm font-bold">Don't have an account? </span>
                        <button className="text-white text-sm  underline" onClick={()=>{navigate("/unverified/signup")}}>Create One</button> 
                    </div>
                    <div className="">
                        <span className="text-white text-sm font-bold">Forget password? </span>
                        <button className="text-white text-sm  underline" onClick={()=>{navigate("/unverified/recover")}}>Recover it</button>
                    </div>
                    
                </div>
            </main>
        </>
    );
}