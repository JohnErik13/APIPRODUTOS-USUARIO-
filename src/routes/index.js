
const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const categoriaRoutes = require('./categoriaRoutes');

// Associação das rotas
router.use('/produtos', produtoRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/categoria', categoriaRoutes);

module.exports = router;


