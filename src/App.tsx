import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Chat from './pages/chat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Home />}>
      <Route path='dash' element={<Dashboard />} />
      <Route path='chat' element={<Chat />} />
    </Route>
    
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />  
    </ChakraProvider>
  )
}

export default App
