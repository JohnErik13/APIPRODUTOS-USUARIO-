const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota POST
// produtos/novo
router.post('/novo', produtoController.criarPoduto);
router.get('/listar', produtoController.listarProdutos);


module.exports = router;