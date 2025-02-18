const express = require('express');
const router = express.Router();
const users = require('../users/users'); // Importe a lista de usuários
const { validateMessage } = require('../middleware/validation');
const { v4: uuidv4 }  = require('uuid') ;



// const generateId = () => {
//   return messages.length+1;
// };

let msgUsers = users.otherExport;
let messages = [];


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
    id: uuidv4(),
    title,
    description,
    userId: user.id
  };

  messages.push(newMessage);

  res.status(201).json({
    message: 'Mensagem criada com sucesso!',
    data: newMessage
  });
});

// Endpoint de leitura de mensagens
router.get('/message/:userId', (req, res) => {
  const { userId } = req.params;

  const { page, perPage } = req.query;

  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(perPage) || 10;

  // Verificar se o email está cadastrado
  const user = msgUsers.find(user => user.id === userId);
  if (!user) {
    return res.status(404).send('Email não encontrado, verifique ou crie uma conta');
  }

  // Filtrar mensagens do usuário
  const userMessages = messages.filter(message => message.userId === user.id);


  
  const startIndex = (currentPage - 1) * itemsPerPage
  
  const endIndex = startIndex + itemsPerPage

  const paginatedNotes = userMessages.slice(startIndex, endIndex)

  const totalItems = userMessages.length // quantidade de notas no array

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  res.status(200).json({
    userMessages: paginatedNotes,
    totalPages,
    currentPage
  })
});

// Endpoint de atualização de mensagem
router.put('/message/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Encontrar a mensagem
  const message = messages.find(message => message.id === id);
  if (!message) {
    return res.status(404).send('Por favor, informe um id válido da mensagem');
  }

  // Atualizar a mensagem
  if (title) message.title = title;
  if (description) message.description = description;

  res.status(200).json({
    message: 'Mensagem atualizada com sucesso!',
    data: message
  });
});

// Endpoint de exclusão de mensagem
router.delete('/message/:id', (req, res) => {
  const { id } = req.params;

  // Encontrar o índice da mensagem
  const messageIndex = messages.findIndex(message => message.id === id);
  if (messageIndex === -1) {
    return res.status(404).send('Mensagem não encontrada, verifique o identificador em nosso banco');
  }

  // Remover a mensagem
  messages.splice(messageIndex, 1);

  res.status(200).send('Mensagem apagada com sucesso');
});

module.exports = router;
