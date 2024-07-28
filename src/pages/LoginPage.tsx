import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import LoginHeading from "../components/LoginHeading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { InverseBlueButton } from "../components/Button";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [statusBool, setStatusBool] = useState<boolean | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    if (auth && auth.user) {
      navigate("/");
    }
  }, [auth, auth?.user]);

  const onSignIn = async () => {
    if (auth) {
      try {
        setIsLoading(true);
        await auth.loginUser(username, password);
        setIsLoading(false);
        setStatusBool(null);
      } catch {
        setIsLoading(false);
        setStatusBool(true);
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return (
    <>
      <main className="flex flex-col sm:flex-row h-screen">
        {/* white logo box  */}
        <LoginHeading></LoginHeading>

        {/* blue inputs box */}
        <div className="bg-pri-blue flex flex-col justify-center items-center gap-0 sm:gap-3 sm:flex-1 sm:order-1 sm:h-full h-2/3 overflow-clip">
          <div className="flex flex-col px-10 gap-3">
            <span className="text-white text-xl sm:text-2xl md:text-4xl font-bold flex self-start sm:py-1">
              Sign In
            </span>
            <span className="text-white text-sm sm:text-lg md:text-xl font-bold">
              Sign In and Lead Green with other UVic Students
            </span>

            {statusBool ? (
              <div className="text-dark-red font-bold text-center text-xs sm:text-sm">
                The credentials you entered do not match our records.
              </div>
            ) : (
              ""
            )}

            <FormControl>
              <FormLabel fontSize={[16, 19, 25, 27]} textColor="white">
                Username
              </FormLabel>
              <Input
                data-cy="username-input"
                size={["sm", "md", "md", "md"]}
                bg="white"
                type="text"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={[16, 19, 25, 27]} textColor="white">
                Password
              </FormLabel>
              <Input
                data-cy="password-input"
                size={["sm", "md", "md", "md"]}
                bg="white"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
          </div>

          <div className="p-4">
            <InverseBlueButton
              data-cy="signin-button"
              clickHandle={onSignIn}
              isDisabled={isLoading}
              title="Sign In"
            ></InverseBlueButton>
          </div>

          <div className="pb-0 sm:pb-1">
            <span className="text-white text-sm font-bold">
              Don't have an account?{" "}
            </span>
            <button
              className="text-white text-sm  underline"
              onClick={() => {
                navigate("/unverified/signup");
              }}
            >
              Create One
            </button>
          </div>
          <div className="">
            <span className="text-white text-sm font-bold">
              Forget password?{" "}
            </span>
            <button
              className="text-white text-sm  underline"
              onClick={() => {
                navigate("/unverified/recover");
              }}
            >
              Recover it
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
