const Product = require('../models/Product');
const Artisan = require('../models/Artisan');

// ✅ Upload product
exports.uploadProduct = async (req, res) => {
  try {
    const artisanId = req.user.id;

    const artisan = await Artisan.findById(artisanId);
    if (!artisan || !artisan.isApproved) {
      return res.status(403).json({ message: 'You are not approved by the admin yet' });
    }

    const { name, description, price, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      artisan: artisanId,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product uploaded" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update product
exports.updateProduct = async (req, res) => {
  try {
    const artisanId = req.user.id;

    const artisan = await Artisan.findById(artisanId);
    if (!artisan || !artisan.isApproved) {
      return res.status(403).json({ message: 'You are not approved by the admin yet' });
    }

    const updated = await Product.findOneAndUpdate(
      { _id: req.params.id, artisan: artisanId },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Product not found or not yours' });
    }

    res.json({ message: 'Product updated', product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const artisanId = req.user.id;

    const artisan = await Artisan.findById(artisanId);
    if (!artisan || !artisan.isApproved) {
      return res.status(403).json({ message: 'You are not approved by the admin yet' });
    }

    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      artisan: artisanId,
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found or not yours' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('artisan', 'name email');
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('artisan', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
