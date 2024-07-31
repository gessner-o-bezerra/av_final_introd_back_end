const express = require('express');
const cors = require('cors'); // Importação do cors
const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json()); // Middleware para parsear JSON
app.use(cors()); // Middleware para habilitar CORS

// Importa os módulos de rotas
const messageRouter = require('./routes/message/messages');
const usersModule = require('./routes/users/users');

// Acessando o router do Express
const usersRouter = usersModule.router;

// Rota inicial
app.get('/', (req, res) => {
  res.status(200).send('Bem vindo à aplicação 8080');
});

// Monta os roteadores nos caminhos base
app.use('/messages', messageRouter);
app.use('/users', usersRouter);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
