import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
  Text,
  Heading,
  HStack,
  Icon
} from '@chakra-ui/react';
import {
  AddIcon,
  EditIcon,
  ArrowBackIcon,
  CloseIcon
} from '@chakra-ui/icons';

import {
  addProduct,
  updateProduct,
  fetchProducts
} from '../redux/productSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const productToEdit = location.state || null;

  const { loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    price: '',
    stock: '',
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        sku: productToEdit.sku,
        category: productToEdit.category,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
      setEditingId(productToEdit._id);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFields = () => {
    setFormData({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: '',
    });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    const { name, sku, category, price, stock } = formData;

    if (!name || !sku || !category || !price || !stock) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const skuRegex = /^[a-zA-Z0-9-]+$/;
    if (!skuRegex.test(sku)) {
      toast({
        title: 'SKU should only contain letters, numbers, and hyphens',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = { name, sku, category, price, stock };

    try {
      if (editingId) {
        await dispatch(updateProduct({ id: editingId, data })).unwrap();
        toast({
          title: 'Product updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await dispatch(addProduct(data)).unwrap();
        toast({
          title: 'Product added',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      dispatch(fetchProducts());
      resetFields();
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: err || 'Error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      p={8}
      bg="white"
      boxShadow="md"
      borderRadius="xl"
      maxW="lg"
      mx="auto"
      mt={8}
    >
      <Heading mb={6} fontSize="2xl" textAlign="center" color="teal.600">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </Heading>

      <VStack spacing={4} align="stretch">
        {['name', 'sku', 'category', 'price', 'stock'].map((field) => (
          <FormControl key={field} isRequired>
            <FormLabel textTransform="capitalize">{field}</FormLabel>
            <Input
              placeholder={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              focusBorderColor="teal.500"
            />
          </FormControl>
        ))}

        <HStack spacing={4} justify="center" pt={4}>
          <Button
            colorScheme="teal"
            leftIcon={editingId ? <EditIcon /> : <AddIcon />}
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={editingId ? 'Updating' : 'Adding'}
          >
            {editingId ? 'Update' : 'Add'}
          </Button>

          {editingId && (
            <Button
              onClick={resetFields}
              colorScheme="gray"
              leftIcon={<CloseIcon />}
            >
              Cancel
            </Button>
          )}

          <Button
            onClick={handleBack}
            colorScheme="blue"
            leftIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </HStack>

        {loading && (
          <Spinner size="lg" color="teal.500" alignSelf="center" mt={4} />
        )}
        {error && (
          <Text color="red.500" mt={2} textAlign="center">
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default AddProduct;
