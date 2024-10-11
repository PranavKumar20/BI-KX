const express = require('express');
const CryptoData = require('../models/CryptoData');
const User = require('../models/User');

const router = express.Router();

const validateApiKey = async (req, res, next) => {
  const apiKey = req.header('api-key');
  const user = await User.findOne({ apiKeys: apiKey });

  if (!apiKey || !user) {
    return res.status(403).json({ msg: 'Invalid or missing API key' });
  }
  next();
};

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
    const dataRecords = cryptoData.data.slice(-100);
    const prices = dataRecords.map(record => record.usd);
    if (prices.length < 2) {
      return res.status(404).json({ msg: 'Not enough data to calculate deviation' });
    }
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
    const deviation = Math.sqrt(variance).toFixed(2);

    res.json({ deviation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
