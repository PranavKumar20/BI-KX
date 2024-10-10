const express = require('express');
const CryptoData = require('../models/CryptoData');
const User = require('../models/User');

const router = express.Router();

// Middleware to validate API key
const validateApiKey = async (req, res, next) => {
  const apiKey = req.header('api-key');
  const user = await User.findOne({ apiKeys: apiKey });

  if (!apiKey || !user) {
    return res.status(403).json({ msg: 'Invalid or missing API key' });
  }
  next();
};

// /api/v1/stats: Get latest stats for a cryptocurrency
router.get('/stats', [validateApiKey], async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ msg: 'Coin query parameter is required' });
  }

  try {
    const latestData = await CryptoData.findOne({ coin }).exec();

    if (!latestData || latestData.data.length === 0) {
      return res.status(404).json({ msg: 'No data found for the requested coin' });
    }

    // Extract the latest entry from the data array
    const latestEntry = latestData.data[latestData.data.length - 1];

    res.json({
      price: latestEntry.usd,
      marketCap: latestEntry.usd_market_cap,
      "24hChange": latestEntry.usd_24h_change
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// /api/v1/deviation: Get price deviation for the last 100 records
router.get('/deviation', [validateApiKey], async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ msg: 'Coin query parameter is required' });
  }

  try {
    const cryptoData = await CryptoData.findOne({ coin }).exec();

    if (!cryptoData || cryptoData.data.length < 2) {
      return res.status(404).json({ msg: 'Not enough data to calculate deviation' });
    }

    // Get the last 100 records or as many as available
    const dataRecords = cryptoData.data.slice(-100);

    // Extract USD prices from the records
    const prices = dataRecords.map(record => record.usd);

    if (prices.length < 2) {
      return res.status(404).json({ msg: 'Not enough data to calculate deviation' });
    }

    // Calculate the mean (average) price
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate the variance and standard deviation
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance).toFixed(2);

    res.json({ deviation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
