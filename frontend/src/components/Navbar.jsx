// src/components/Navbar.jsx
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; // import the logout action

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // proper logout
    navigate('/login'); // redirect to login
  };

  return (
    <Box as="header" bg="teal.500" py={4} boxShadow="md">
      <Flex justify="space-between" align="center" maxW="1200px" mx="auto" px={4}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="white"
          fontFamily="'Pacifico', cursive"
        >
          Store Manager
        </Text>

        <Button colorScheme="red" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
