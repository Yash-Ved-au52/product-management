// File: src/pages/Login.jsx
import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input,
  Heading, useToast, Text, Link, InputGroup, InputLeftElement, Flex
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons';
import axios from '../utils/axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { username, password });
      dispatch(setToken(res.data.token));
      toast({ title: 'Login successful!', status: 'success', duration: 3000 });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Login failed',
        description: err.response?.data?.message || 'Try again',
        status: 'error',
        duration: 3000
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('https://images.unsplash.com/photo-1607082349250-53d4b8efb4c2')"
      bgSize="cover"
      bgPosition="center"
    >
      <Box
        bg="whiteAlpha.900"
        p={8}
        rounded="2xl"
        shadow="lg"
        maxW="sm"
        w="full"
        mx={4}
        backdropFilter="blur(10px)"
      >
        <Heading mb={6} textAlign="center" color="blue.700">
          Welcome Back
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.500" />
              </InputLeftElement>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </InputGroup>
          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.500" />
              </InputLeftElement>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full" mb={4}>
            Login
          </Button>

          <Text textAlign="center" fontSize="sm">
            Don&apos;t have an account?{' '}
            <Link color="blue.500" onClick={() => navigate('/register')}>
              Register
            </Link>
          </Text>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
