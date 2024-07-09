import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomeLayout from "./layout/HomeLayout";
import RegistrationLayout from "./layout/RegistrationLayout";
import RecomendationsPage from "./pages/RecomendationsPage";
import IndividualListingPage from "./pages/IndividualListingsPage";
import Chat from "./pages/chat";
import BrowsePage from "./pages/BrowsePage";
import Create from "./pages/CreateListing";
import Edit from "./pages/EditListing";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import RegistrationPhaseOnePage from "./pages/RegistrationPhaseOnePage";
import RegistrationPhaseTwoPage from "./pages/RegistrationPhaseTwoPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./utils/AuthContext";
import MyListings from "./pages/MyListings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ChakraProvider>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<HomeLayout></HomeLayout>}>
                  <Route
                    path='*'
                    element={<ErrorPage> Page Not Found</ErrorPage>}
                  />
                  <Route index element={<Navigate to='/browse/1' replace />} />
                  <Route
                    path='recomendations/:page'
                    element={<RecomendationsPage />}
                  />
                  <Route
                    path='browse/:page'
                    element={<BrowsePage></BrowsePage>}
                  ></Route>
                  <Route
                    path='listing/:listingID'
                    element={<IndividualListingPage></IndividualListingPage>}
                  ></Route>
                  <Route path='chat' element={<Chat></Chat>} />
                  <Route
                    path='mylistings/:page'
                    element={<MyListings></MyListings>}
                  />
                  <Route path='create' element={<Create></Create>}></Route>
                  <Route path='edit/:listingID' element={<Edit></Edit>}></Route>
                  <Route path='chat' element={<Chat></Chat>} />
                </Route>
              </Route>

              <Route path='login' element={<LoginPage></LoginPage>}></Route>
              <Route
                path='unverified/recover'
                element={<RecoverPasswordPage></RecoverPasswordPage>}
              ></Route>

              <Route
                path='unverified'
                element={<RegistrationLayout></RegistrationLayout>}
              >
                <Route
                  path='signup'
                  index
                  element={
                    <RegistrationPhaseOnePage></RegistrationPhaseOnePage>
                  }
                ></Route>
                <Route
                  path='signup-token/:jwt'
                  element={
                    <RegistrationPhaseTwoPage></RegistrationPhaseTwoPage>
                  }
                ></Route>
                <Route
                  path='reset/:jwt'
                  element={<NewPasswordPage></NewPasswordPage>}
                ></Route>
              </Route>
            </Routes>
          </ChakraProvider>
        </AuthProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
