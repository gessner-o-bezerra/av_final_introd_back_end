const bcrypt = require('bcrypt');

// Função para hashear a senha
const hashPassword = async (password) => {
  const saltRounds = 10; // Número de rounds para gerar o salt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Função para verificar a senha
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePassword };
