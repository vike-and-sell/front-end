import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/chat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />}>
      <Route path='dash' element={<Dashboard></Dashboard> } />
      <Route path='chat' element={<Chat></Chat> } />
    </Route>
    
  )
);

function App() {
  return (
    
    <ChakraProvider>
      <RouterProvider router={router}></RouterProvider> 
    </ChakraProvider>
  )
}

export default App
