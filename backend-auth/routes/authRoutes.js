const express = require('express');
const router = express.Router();

// Rota de login (qualquer e-mail e senha serão aceitos)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return res.json({
      token: 'fake_token_123456',
      email: email
    });
  } else {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
});

// Rota de cadastro (simulada)
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    return res.status(201).json({
      message: 'Usuário registrado com sucesso (simulado)',
      email: email
    });
  } else {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }
});

module.exports = router;
