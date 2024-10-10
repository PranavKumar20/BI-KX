const axios = require('axios');
const CryptoData = require('../models/CryptoData');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
const API_KEY = process.env.CG_API_KEY;

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': API_KEY,
      },
    });

    const data = response.data;
    const time_of_request = new Date();
    const coins = ['bitcoin', 'ethereum', 'matic-network'];
    for (const coin of coins) {
      const coinData = data[coin];
      const existingCoinData = await CryptoData.findOne({ coin });
      if (existingCoinData) {
        existingCoinData.data.push({
          usd: coinData.usd,
          usd_market_cap: coinData.usd_market_cap,
          usd_24h_change: coinData.usd_24h_change,
          time_of_request,
        });
        await existingCoinData.save();
      } else {
        const newCoinData = new CryptoData({
          coin,
          data: [{
            usd: coinData.usd,
            usd_market_cap: coinData.usd_market_cap,
            usd_24h_change: coinData.usd_24h_change,
            time_of_request,
          }],
        });
        await newCoinData.save();
      }
    }

    console.log('Crypto data updated successfully');
  } catch (err) {
    console.error('Error fetching crypto data:', err.message);
  }
};

module.exports = { fetchCryptoData };
