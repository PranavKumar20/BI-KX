const mongoose = require('mongoose');

const cryptoDataSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  data: [
    {
      usd: { type: Number, required: true },
      usd_market_cap: { type: Number, required: true },
      usd_24h_change: { type: Number, required: true },
      time_of_request: { type: Date, required: true },
    }
  ]
});

module.exports = mongoose.model('CryptoData', cryptoDataSchema);
