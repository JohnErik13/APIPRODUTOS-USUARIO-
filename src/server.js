require('dotenv').config(); // Carrega as variáveis do arquivo .env para o process.env
const express = require('express');
const routes = require('./routes'); // Importa automaticamente o routes/index.js
const prisma = require('../database/prisma');

const app = express(); 

app.use(express.json());//habilita o Json no express para ele receber JS
// Carrega todas as rotas principais da API
app.use(routes);


const PORT = process.env.PORT;
app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);

  try {
    await prisma.$connect();
    console.log('🗄️  Conectado ao banco de dados MySQL com sucesso!');
  } catch (error) {
    console.error('❌ Falha ao conectar no MySQL. Verifique se o serviço está ligado!');
    console.error(error.message);
  }
});