const UsuariosController = require('../controllers/UsusariosController');

// Criando o meu roteador
const UsuariosRouter = require('express').Router();

// Criando as rotas...
UsuariosRouter.get('/entrar', UsuariosController.showEntrar);

// Exportando o roteador criado
module.exports = UsuariosRouter;