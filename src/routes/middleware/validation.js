// funções de validação

const validateUser = (user) => {
  if (!user.name) return 'Por favor, verifique se passou o nome.';
  if (!user.email) return 'Por favor, verifique se passou o email.';
  if (!user.password) return 'Por favor, verifique se passou a senha.';
  return null;
};

const validateLogin = (user) => {
  if (!user.email) return 'Insira um e-mail válido';
  if (!user.password) return 'Insira uma senha válida';
  return null;
};

const validateMessage = (message) => {
  if (!message.title) return 'Por favor, verifique se passou o título.';
  if (!message.description) return 'Por favor, verifique se passou a descrição.';
  return null;
};

module.exports = {validateLogin, validateUser, validateMessage};