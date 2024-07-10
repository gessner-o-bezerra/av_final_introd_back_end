const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { validateUser, validateLogin } = require('../middleware/validation');
const { hashPassword, comparePasswords } = require('../hash/hash');

const generateId = () => {
  return users.length + 1;
};



let users = [];

// Funções de validação


// Endpoint de criação de conta
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validação dos dados do usuário
  const errorMessage = validateUser({ name, email, password });
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  // Verificar se o email já está cadastrado
  if (users.some(user => user.email === email)) {
    return res.status(400).send('Email já cadastrado, insira outro.');
  }

  // Criação do novo usuário
  const hashedPassword = await hashPassword(password, 10);
  const newUser = {
    id: generateId(),
    name,
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).send(`Seja bem vindo ${name}! Pessoa usuária registrada com sucesso!`);
});

// Endpoint de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validação dos dados de login
  const errorMessage = validateLogin({email, password});
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  // Verificar se o email está cadastrado
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(404).send('Email não encontrado no sistema, verifique ou crie uma conta');
  }

  // Verificar a senha
  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Senha inválida');
  }

  res.status(200).send(`Seja bem vindo ${user.name}! Pessoa usuária logada com sucesso!`);
});

module.exports = {
  router: router, // Exporta o router do Express
  otherExport: users // Outros valores que podem ser exportados
};
