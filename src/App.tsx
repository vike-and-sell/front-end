import { ChakraProvider } from "@chakra-ui/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomeLayout from "./layout/HomeLayout";
import ReccomendationsPage from "./pages/ReccomendationsPage";
import Chat from './pages/chat';
import MyListing from "./pages/MyListing";
import Edit from "./pages/edit";
import Create from "./pages/create";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomeLayout></HomeLayout>}>
        <Route
          index
          element={<ReccomendationsPage></ReccomendationsPage>}
        ></Route>
        <Route path='my-listing' element={<MyListing></MyListing>}/>
        <Route path='create' element={<Create></Create>}/>
        <Route path='edit/:listingID' element={<Edit></Edit>}/>
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