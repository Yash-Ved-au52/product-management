import { useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  HStack,
  useToast,
  Icon,
  Tag,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';
import { EditIcon, DeleteIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const resultAction = await dispatch(deleteProduct(id));
    if (deleteProduct.fulfilled.match(resultAction)) {
      toast({
        title: 'Product deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Failed to delete product',
        description: resultAction.payload,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (product) => {
    navigate('/AddProduct', { state: product });
  };

  return (
    <Box p={6} maxW="5xl" mx="auto">
      <Heading mb={6} textAlign="center" color="teal.600">
        Product Dashboard
      </Heading>

      <Box textAlign="center" mb={6}>
        <Link to="/AddProduct">
          <Button colorScheme="teal" size="md">
            + Add Product
          </Button>
        </Link>
      </Box>

      {loading && <Text textAlign="center">Loading...</Text>}
      {error && (
        <Text textAlign="center" color="red.500">
          Error: {error}
        </Text>
      )}

      {products.length === 0 && !loading ? (
        <Text textAlign="center">No products found.</Text>
      ) : (
        <VStack spacing={5} align="stretch">
          {products.map((product) => (
            <Box
              key={product._id}
              bg="white"
              boxShadow="md"
              borderRadius="lg"
              p={5}
              _hover={{ boxShadow: 'lg' }}
            >
              <HStack justify="space-between" mb={3}>
                <HStack>
                  <Icon as={InfoOutlineIcon} color="teal.500" boxSize={5} />
                  <Text fontSize="lg" fontWeight="semibold">
                    {product.name}
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  ₹{product.price}
                </Text>
              </HStack>

              <HStack spacing={3} mb={2} wrap="wrap">
                <Tag colorScheme="teal" variant="subtle">
                  Category: {product.category}
                </Tag>
                <Tag colorScheme="orange" variant="subtle">
                  Stock: {product.stock}
                </Tag>
                <Text fontSize="sm" color="gray.600">
                  SKU: {product.sku}
                </Text>
              </HStack>

              <HStack mt={4} spacing={4}>
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="red"
                  variant="solid"
                  size="sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default Dashboard;
