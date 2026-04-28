require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const botRoutes = require('./routes/botRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('🚀 API rodando na porta 3000');
});