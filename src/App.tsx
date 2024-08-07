import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomeLayout from "./layout/HomeLayout";
import RegistrationLayout from "./layout/RegistrationLayout";
import RecommendationsPage from "./pages/RecommendationsPage";
import IndividualListingPage from "./pages/IndividualListingsPage";
import Chat from "./pages/chat";
import Settings from "./pages/SettingsPage";
import BrowsePage from "./pages/BrowsePage";
import Create from "./pages/CreateListing";
import Edit from "./pages/EditListing";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import RegistrationPhaseOnePage from "./pages/RegistrationPhaseOnePage";
import RegistrationPhaseTwoPage from "./pages/RegistrationPhaseTwoPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import VerificationSuccess from "./pages/VerificationSuccess";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./utils/AuthContext";
import MyListings from "./pages/MyListings";
import SearchResultsPage from "./pages/SearchResultsPage";
import CharityPage from "./pages/CharityPage";
import MyHistory from "./pages/MyHistory";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ChakraProvider>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomeLayout />}>
                  <Route
                    path="*"
                    element={<ErrorPage> Page Not Found</ErrorPage>}
                  />
                  <Route index element={<Navigate to="/recommendations/1" />} />
                  <Route
                    path="recommendations/:page"
                    element={<RecommendationsPage />}
                  />
                  <Route path="browse/:page" element={<BrowsePage />} />
                  <Route
                    path="listing/:listingID"
                    element={<IndividualListingPage />}
                  />
                  <Route path="chat" element={<Chat />} />
                  <Route path="mylistings/:page" element={<MyListings />} />
                  <Route path="myprofile/:option?/:page?" element={<MyHistory/>} />
                  <Route path="create" element={<Create />} />
                  <Route path="edit/:listingID" element={<Edit />} />
                  <Route path="charity" element={<CharityPage />} />
                  <Route
                    path="charity/:charityName"
                    element={<CharityPage />}
                  />
                  <Route
                    path="search/:searchString/:page"
                    element={<SearchResultsPage />}
                  />
                  <Route path="settings" element={<Settings/>} />
                </Route>
              </Route>

              <Route path="login" element={<LoginPage />} />
              <Route
                path="unverified/recover"
                element={<RecoverPasswordPage />}
              />

              <Route path="unverified" element={<RegistrationLayout />}>
                <Route
                  path="signup"
                  index
                  element={<RegistrationPhaseOnePage />}
                />
                <Route
                  path="signup-token/:jwt"
                  element={<RegistrationPhaseTwoPage />}
                />
                <Route path="success" element={<VerificationSuccess />} />
                <Route path="reset/:jwt" element={<NewPasswordPage />} />
              </Route>
            </Routes>
          </ChakraProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
