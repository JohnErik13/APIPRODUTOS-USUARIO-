
const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

// Rotas de categorias
router.get('/listar', categoriaController.listarCategoria);
router.post('/novo', categoriaController.criarCategoria);
//router.put('/:codigo', categoriaController.atualizarCategoria);
//router.delete('/:codigo', categoriaController.deletarCategoria);
router.put('/atualizar/:codigo', categoriaController.atualizarCategoria);
router.delete('/excluir/:codigo', categoriaController.deletarCategoria);

module.exports = router;




