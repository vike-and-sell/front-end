import { ChakraProvider } from "@chakra-ui/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import ReccomendationsPage from "./pages/ReccomendationsPage";
import IndividualListingPage from "./pages/IndividualListingsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout></HomeLayout>}>
      <Route element={<ReccomendationsPage></ReccomendationsPage>}></Route>
      <Route
        index
        element={<IndividualListingPage></IndividualListingPage>}
      ></Route>
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
