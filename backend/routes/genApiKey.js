const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/middleware');

const router = express.Router();

router.post('/genApiKey', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const apiKey = `APIKEY-${crypto.randomBytes(16).toString('hex')}`;
    user.apiKeys.push(apiKey);
    await user.save();
    res.json({ msg: 'API key generated successfully', apiKey });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
