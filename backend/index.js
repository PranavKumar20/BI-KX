const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { fetchCryptoData } = require('./services/cryptoService');
const authRoutes = require('./routes/auth');
const apiKeyRoutes = require('./routes/genApiKey');
const cryptoApiRoutes = require('./routes/cryptoAPI');
const apiKeys = require('./routes/apiKeys');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI);
cron.schedule('0 */2 * * *', fetchCryptoData);
// cron.schedule('*/30 * * * * *', fetchCryptoData);

app.get('/', (req, res) => {
  res.send('hii there');
});


app.use('/auth', authRoutes);
app.use('/api/v1', apiKeyRoutes);
app.use('/api/v1', cryptoApiRoutes);
app.use('/api/v1', apiKeys)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
