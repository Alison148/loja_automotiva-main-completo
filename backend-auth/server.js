const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Rota de login simplificada
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return res.json({
      token: 'fake_token_123456',
      email
    });
  } else {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
});

// Porta fixa
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
