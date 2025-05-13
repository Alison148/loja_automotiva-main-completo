const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
app.use('/api/auth', authRoutes);

// Porta fixa
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
