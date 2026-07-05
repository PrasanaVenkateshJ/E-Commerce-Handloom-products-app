const express = require('express');
const router = express.Router();
const { uploadProduct ,getAllProducts, getProductById } = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware'); // create this next

router.post('/upload', verifyToken, uploadProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);

module.exports = router;
