require('dotenv').config(); // Carrega as variáveis do arquivo .env para o process.env
const express = require('express');
const routes = require('./routes') // Importa automaticamente o routes/index.js
const app = express(); 

app.use(express.json());//habilita o Json no express para ele receber JS
// Carrega todas as rotas principais da API
app.use(routes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)  //` aqui se utiliza a crase`
})
// app.listen(PORT, function nome () {
// })