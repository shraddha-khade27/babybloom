const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// @desc    Fetch all products (only visible ones for storefront)
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Both explicitly true or undefined (legacy items) are considered visible
    const products = await Product.find({ isVisible: { $ne: false } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch all products (INCLUDING hidden - meant for Admin panel)
// @route   GET /api/products/admin-all
// @access  Private/Admin
router.get('/admin-all', protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, subCategory, description, stock } = req.body;
    let imagePath = '';

    if (req.file) {
      imagePath = `/${req.file.path.replace(/\\/g, '/')}`; // Normalize path for windows
    }

    const product = new Product({
      name,
      price,
      category,
      subCategory,
      description,
      stock,
      image: imagePath || '/placeholder.png',
      isVisible: true
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, subCategory, description, stock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      product.subCategory = subCategory || product.subCategory;
      product.description = description || product.description;
      product.stock = stock || product.stock;

      if (req.file) {
        product.image = `/${req.file.path.replace(/\\/g, '/')}`;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Toggle product visibility (Stock toggle)
// @route   PUT /api/products/:id/visibility
// @access  Private/Admin
router.put('/:id/visibility', protect, admin, async (req, res) => {
  try {
    const { isVisible } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isVisible = isVisible;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;