import Product from '../models/Product.js';

// Create Product
export const createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, stock } = req.body;
    const userId = req.user._id; // User is authenticated, so we can use req.user._id

    const product = new Product({
      name,
      sku,
      category,
      price,
      stock,
      createdBy: userId,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Products of a User
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id });  // Fetch products for the logged-in user
    
    // console.log(products);
    res.json(products);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    console.log(product);

    if (!product || product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.createdBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    await Product.deleteOne({ _id: req.params.id }); // ⬅️ Use this instead of product.remove()
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
