import { protect } from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';

router.route('/me')
  .get(protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

router.route('/profile')
  .put(protect, async (req, res) => {
    try {
      const updatableFields = ['name', 'phone', 'course', 'year', 'section'];
      const updateData = {};
      
      // Only allow specific fields to be updated
      updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).select('-password');
      
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.route('/account')
  .put(protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const { currentPassword, newPassword, newEmail } = req.body;

      // Email update
      if (newEmail && newEmail !== user.email) {
        user.email = newEmail;
      }

      // Password update
      if (newPassword) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
        user.password = newPassword;
      }

      await user.save();
      const userData = user.toObject();
      delete userData.password;
      
      res.json(userData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }); 