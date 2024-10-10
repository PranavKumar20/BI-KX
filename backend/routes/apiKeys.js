const express = require('express');
const User = require('../models/User');
const { authenticateJWT } = require('../middleware/middleware');

const router = express.Router();

router.get('/apikeys', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ apiKeys: user.apiKeys });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
