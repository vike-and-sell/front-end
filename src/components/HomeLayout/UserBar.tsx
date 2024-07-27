import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../utils/AuthContext";
import { Text, Tooltip } from "@chakra-ui/react";

export default function UserBar() {
  const auth = useAuth();

  const logout = () => {
    if (auth) {
      auth.logoutUser();
    }
  };

  return (
    <>
      {auth != null && (
        <div className="flex items-center">
          <Text className="border-slate-300 border-2 p-2 rounded-lg hidden lg:block lg:rounded-e-none lg:border-e-0">
            {auth.user?.username}
          </Text>
          <Tooltip label="Sign Out">
            <button
              className="bg-pri-blue border-pri-blue border-2 p-3 rounded-lg text-white lg:border-s-0 lg:border-e-2 lg:rounded-s-none"
              onClick={logout}
            >
              <FaSignOutAlt />
            </button>
          </Tooltip>
        </div>
      )}
    </>
  );
}
