import { ChakraProvider } from "@chakra-ui/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";

import HomeLayout from "./layout/HomeLayout";
import RecomendationsPage from "./pages/RecomendationsPage";
import IndividualListingPage from "./pages/IndividualListingsPage";
import Chat from "./pages/chat";
import BrowsePage from "./pages/BrowsePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HomeLayout></HomeLayout>}>
      <Route index element={<Navigate to='/recomendations/1' replace />} />
      <Route path='recomendations/:page' element={<RecomendationsPage />} />
      <Route path='browse/:page' element={<BrowsePage></BrowsePage>}></Route>
      <Route
        path='listing/:listingID'
        element={<IndividualListingPage></IndividualListingPage>}
      ></Route>
      <Route path='chat' element={<Chat></Chat>} />
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
