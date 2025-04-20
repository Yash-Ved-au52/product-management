// File: src/pages/Register.jsx
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useToast,
  Text,
  InputGroup,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import axios from "../utils/axios";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { username, password });
      toast({
        title: "Registered successfully!",
        status: "success",
        duration: 3000,
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err.response?.data?.message || "Try again",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgImage="url('https://images.unsplash.com/photo-1665652475985-37e285aeff53?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
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
        <Heading mb={6} textAlign="center" color="green.600">
          Create Account
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl mb={4} isRequired>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AtSignIcon color="gray.500" />
              </InputLeftElement>
              <Input
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Button type="submit" colorScheme="green" width="full" mt={2}>
            Register
          </Button>
        </form>

        <Text mt={4} textAlign="center" fontSize="sm">
          Already have an account?{" "}
          <RouterLink to="/" style={{ color: "#3182CE" }}>
            Login
          </RouterLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;
