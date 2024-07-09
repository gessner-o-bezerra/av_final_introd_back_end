const express = require('express');
const router = express.Router();
const users = require('./users'); // Importe a lista de usuários



const generateId = () => {
  return messages.length+1;
};
let msgUsers = users.otherExport;
let messages = [];

// Funções de validação
const validateMessage = (message) => {
  if (!message.title) return 'Por favor, verifique se passou o título.';
  if (!message.description) return 'Por favor, verifique se passou a descrição.';
  return null;
};

// Endpoint de criação de mensagem
router.post('/message', (req, res) => {
  const { email, title, description } = req.body;

  // Validação dos dados da mensagem
  const errorMessage = validateMessage({ title, description });
  if (errorMessage) {
    return res.status(400).send(errorMessage);
  }

  // Verificar se o email está cadastrado
  const user = msgUsers.find(user => user.email === email);
  if (!user) {
    return res.status(404).send('Email não encontrado, verifique ou crie uma conta');
  }

  // Criação da nova mensagem
  const newMessage = {
    id: generateId(),
    title,
    description,
    userId: user.id
  };

  messages.push(newMessage);

  res.status(201).send(`Mensagem criada com sucesso! ${JSON.stringify(newMessage)}`);
});

// Endpoint de leitura de mensagens
router.get('/message/:email', (req, res) => {
  const { email } = req.params;

  // Verificar se o email está cadastrado
  const user = msgUsers.find(user => user.email === email);
  if (!user) {
    return res.status(404).send('Email não encontrado, verifique ou crie uma conta');
  }

  // Filtrar mensagens do usuário
  const userMessages = messages.filter(message => message.userId === user.id);

  res.status(200).send(`Seja bem-vinde! ${JSON.stringify(userMessages)}`);
});

// Endpoint de atualização de mensagem
router.put('/message/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Encontrar a mensagem
  const message = messages.find(message => message.id === parseInt(id));
  if (!message) {
    return res.status(404).send('Por favor, informe um id válido da mensagem');
  }

  // Atualizar a mensagem
  if (title) message.title = title;
  if (description) message.description = description;

  res.status(200).send(`Mensagem atualizada com sucesso! ${JSON.stringify(message)}`);
});

// Endpoint de exclusão de mensagem
router.delete('/message/:id', (req, res) => {
  const { id } = req.params;

  // Encontrar o índice da mensagem
  const messageIndex = messages.findIndex(message => message.id === parseInt(id));
  if (messageIndex === -1) {
    return res.status(404).send('Mensagem não encontrada, verifique o identificador em nosso banco');
  }

  // Remover a mensagem
  messages.splice(messageIndex, 1);

  res.status(200).send('Mensagem apagada com sucesso');
});

module.exports = router;
