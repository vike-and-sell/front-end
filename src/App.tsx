import { ChakraProvider } from "@chakra-ui/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import HomeLayout from "./layout/HomeLayout";
import RegistrationLayout from "./layout/RegistrationLayout";
import RecomendationsPage from "./pages/RecomendationsPage";
import Chat from "./pages/chat";
import LoginPage from './pages/LoginPage';
import RecoverPasswordPage from "./pages/RecoverPasswordPage";
import RegistrationPhaseOnePage from "./pages/RegistrationPhaseOnePage";
import RegistrationPhaseTwoPage from "./pages/RegistrationPhaseTwoPage";
import NewPasswordPage from "./pages/NewPasswordPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HomeLayout></HomeLayout>}>
      <Route index element={<Navigate to='/recomendations/1' replace />} />
      <Route path='recomendations/:page' element={<RecomendationsPage />} />
      <Route path='chat' element={<Chat></Chat>} />

      <Route path='login' element = {<LoginPage></LoginPage>}></Route>
      <Route path='unverified/recover' element = {<RecoverPasswordPage></RecoverPasswordPage>}></Route> 
      <Route path='unverified' element={<RegistrationLayout></RegistrationLayout>}>
        <Route path='signup'
          index element = {<RegistrationPhaseOnePage></RegistrationPhaseOnePage>}>
        </Route>
        <Route path='signup-token' 
          element = {<RegistrationPhaseTwoPage></RegistrationPhaseTwoPage>}
        ></Route>
        <Route path="reset"
          element={<NewPasswordPage></NewPasswordPage>}
        ></Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>
  );
}

export default App;