const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  registerArtisan,
  loginArtisan,
  loginAdmin,
  approveArtisan
} = require('../controllers/authController');

router.post('/register/user', registerUser);
router.post('/login/user', loginUser);
router.post('/register/artisan', registerArtisan);
router.post('/login/artisan', loginArtisan);
router.put('/approve/artisan/:artisanId', approveArtisan);
router.post('/login/admin', loginAdmin);

module.exports = router;
