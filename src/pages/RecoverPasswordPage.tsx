import { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import LoginHeading from "../components/LoginHeading";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [statusBool, setStatusBool] = useState<boolean | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const handleReset = async () => {
    if (isValid) {
      setStatusBool(null);
      if (auth) {
        try {
          toast({
            title: "Sending email",
            status: "loading",
            duration: 10000,
            isClosable: true,
          });
          const response = await auth.requestReset(
            email + "@uvic.ca",
            `${location.origin}/unverified/reset/jwt?=`
          );

          if (response.status != 200) {
            throw new Error("Could not send password reset email");
          }
          toast.closeAll();
          toast({
            title: "Password reset email sent!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } catch (error) {
          toast.closeAll();
          toast({
            title: "Error, invalid email",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } else {
      setStatusBool(true);
    }
  };

  function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9]+$/;

    return emailRegex.test(email) && !email.endsWith("@uvic.ca");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsValid(validateEmail(email));
    setIsEmailTouched(true);
  };

  return (
    <>
      <main className='flex flex-col sm:flex-row h-screen'>
        {/* white logo box  */}
        <LoginHeading></LoginHeading>

        {/* blue inputs box */}
        <div className='bg-pri-blue flex flex-col justify-center items-center sm:gap-3 sm:flex-1 sm:order-1 sm:h-screen h-2/3'>
          <div className='flex flex-col px-14 gap-2'>
            <span className='text-white text-xl md:text-4xl font-bold flex self-start py-2'>
              Forgot Password
            </span>
            <span className='text-white text-md md:text-xl font-semibold pb-3'>
              Please enter your email address to receive instructions on how to
              reset your password
            </span>

            {statusBool ? (
              <div data-cy='error-msg' className='text-white px-6 text-center'>
                This Email is Not Linked to an Account. Please enter a valid
                email try again.
              </div>
            ) : (
              ""
            )}

            <FormControl isRequired isInvalid={!isValid && isEmailTouched}>
              <FormLabel fontSize={[19, 19, 25, 27]} textColor='white'>
                Email Address
              </FormLabel>
              <InputGroup>
                <Input
                  data-cy='email-input'
                  bg='white'
                  type='email'
                  value={email}
                  onChange={handleInputChange}
                />
                <InputRightAddon className='text-pri-blue font-semibold'>
                  @uvic.ca
                </InputRightAddon>
              </InputGroup>
              {!isValid && isEmailTouched ? (
                <FormErrorMessage data-cy='form-error-msg' textColor='white'>
                  Must Be a Valid UVic Email
                </FormErrorMessage>
              ) : (
                <FormHelperText></FormHelperText>
              )}
            </FormControl>
          </div>

          <div className='p-5 flex gap-16'>
            <button
              data-cy='send-email-button'
              className='bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3'
              onClick={handleReset}
            >
              Send Email
            </button>
            <button
              data-cy='cancel-button'
              className='bg-white relative px-4 rounded-md text-pri-blue font-semibold p-3'
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
