const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota POST
// produtos/novo
router.post('/novo', produtoController.criarPoduto);


module.exports = router;