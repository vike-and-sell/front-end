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
    <>
      <Route path='/' element={<HomeLayout></HomeLayout>}>
        <Route
          index
          element={<ReccomendationsPage></ReccomendationsPage>}
        ></Route>
      </Route>
      <Route path='chat' element={<Chat></Chat> } />
    </>
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
