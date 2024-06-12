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