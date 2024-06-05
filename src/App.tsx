import { ChakraProvider } from '@chakra-ui/react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HomeLayout></HomeLayout>}></Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider>
      <h1>hello</h1>
    </ChakraProvider>
  );
}

export default App;
