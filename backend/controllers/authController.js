const User = require('../models/User');
const Artisan = require('../models/Artisan');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register User (with role: 'user')
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: 'user' });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // 🔑 Include role in token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Register Artisan (default role: artisan)
exports.registerArtisan = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📥 Received password:", password);
    //const hashed = await bcrypt.hash(password, 10);
    //const artisan = new Artisan({ name, email: email.toLowerCase(), password: hashed, role: 'artisan' });
    const artisan = new Artisan({ name, email: email.toLowerCase(), password, role: 'artisan' });
    await artisan.save();
    res.status(201).json({ message: 'Artisan registered, pending approval' });
    

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Login Artisan
exports.loginArtisan = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Login attempt:', email, password);

    const artisan = await Artisan.findOne({ email });
    console.log('👤 Artisan found:', artisan);
    console.log("🆚 Comparing with hash:", artisan?.password);

    if (!artisan || !artisan.isApproved) {
      return res.status(401).json({ error: 'Not approved or invalid' });
    }

    const isMatch = await bcrypt.compare(password, artisan.password);
    console.log('🔍 Password match:', isMatch);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: artisan._id, role: artisan.role }, process.env.JWT_SECRET);
    res.json({ token, role: artisan.role });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
};




// ✅ Admin Login (reuses loginUser logic)
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, role: 'admin' }); // only allow role: admin
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET);
    res.json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin approves artisan
exports.approveArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const artisan = await Artisan.findById(artisanId);
    if (!artisan) return res.status(404).json({ error: "Artisan not found" });

    artisan.isApproved = true;
    await artisan.save();

    res.json({ message: "Artisan approved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
