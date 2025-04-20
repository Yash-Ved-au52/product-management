import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/register']; // pages where navbar shouldn't be shown

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
