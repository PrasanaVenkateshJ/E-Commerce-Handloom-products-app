const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const artisanSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'artisan' },
  isApproved: { type: Boolean, default: false }
});


// 🔐 Encrypt password before saving
artisanSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Password match method
artisanSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Artisan = mongoose.model('Artisan', artisanSchema);

module.exports = Artisan;
