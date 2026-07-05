const Artisan = require('../models/Artisan');

// ✅ Get all unapproved artisans
const getUnapprovedArtisans = async (req, res) => {
  try {
    const unapproved = await Artisan.find({ role: 'artisan', isApproved: false });
    res.json(unapproved);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Approve artisan by ID
const approveArtisan = async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id);
    if (!artisan) return res.status(404).json({ message: 'Artisan not found' });

    artisan.isApproved = true;
    await artisan.save();
    res.json({ message: 'Artisan approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Export all
module.exports = {getUnapprovedArtisans,approveArtisan,};
