const express = require("express");
const router = express.Router();
const { hashPassword, comparePassword } = require("../hash");
const users = [];

const generateId = () => {
  return users.length + 1;
};

//CREATE
router.post("/user", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    // Se já existe admim cadastrado com esse username
    const existingUser = users.find((user) => user.username === username);

    if (existingUser) {
      return response.status(400).json({ message: "Usuário já existe." });
    }

    const user = {
      id: generateId(),
      userName,
      password: hashedPassword,
    };

    // Salvar o usuário com a senha hasheada no banco de dados
    // Aqui é um exemplo de como você pode fazer isso
    users.push(user);

    return res.status(201).send("Usuário criado com sucesso.");
  } catch (error) {
    return res.status(500).send("Erro ao criar usuário.");
  }
});

// Endpoint para login de usuário
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  // Encontrar o usuário no banco de dados
  // Aqui é um exemplo de como você pode fazer isso
  const user = users.find(u => u.userName === userName);

  if (!user) {
    return res.status(404).send("Usuário não encontrado.");
  }

  try {
    const isMatch = await comparePassword(password, user.password);

    if (isMatch) {
      return res.status(200).send("Login bem-sucedido.");
    } else {
      return res.status(400).send("Senha incorreta.");
    }
  } catch (error) {
    return res.status(500).send("Erro ao fazer login.");
  }
});

module.exports = router;
