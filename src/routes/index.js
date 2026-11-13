const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');

// Criando Rota para usuários
const usuarioRoutes = require('./usuarioRoutes');

// Associa o prefixo /produtos ao arquivo produtoRoutes
router.use('/produtos', produtoRoutes);
router.use('/usuario', usuarioRoutes);


// Associação com a rota /usuarios
module.exports = router;
