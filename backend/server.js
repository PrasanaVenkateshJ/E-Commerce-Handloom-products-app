const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);       
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,            
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('✅ MongoDB Connected');

    const User = require('./models/User');
const bcrypt = require('bcryptjs');

(async () => {
  const existingAdmin = await User.findOne({ email: 'admin@123.com' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@123.com',
      password: hashedPassword,
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin user created');
  }
})();

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
