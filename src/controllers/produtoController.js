const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarPoduto: (req, res) =>{
        const { codigo, nome, quantidade, preco} = req.body;
        // validação simples dos campos obrigatórios
        if(!codigo || !nome || !quantidade || !preco){
            returnres.status(400).json({
                sucesso:false,
                mensagem: "Todos os campos (codigo, nome, quantidade, preco) são obrigatórios!"
            })
        }
         // transformar  e calcular os dados
         const nomeMaiusculo = String(nome).toUpperCase();
         const qtde = Number(quantidade);
         const valorPreco = Number(preco);
         const valorTotal = quantidade * valorPreco;
        
        // transformar  e calcular os dados
    const novoProdutos ={
        codigo,
        nome: nomeMaiusculo,
        quantidade: quantidade,
        preco: valorPreco,
        total: valorTotal,
        criadoEm: new Date().toISOString()
        }
        // Chama o Model para persistir no arquivo JSON
        const produtoSalvo = produtoModel.salvar(novoProdutos);

        // Retorna a resposta HTTP 201 (Created)
        return res.status(201).json({
            sucesso:true,
            mensagem: " Produto cadastrado com sucesso",
            produto: produtoSalvo
        })
    },
    listarProdutos: (req, res) =>{
        const produtos = produtoModel.buscarTodos();
        return res.json({
            sucesso: true,
            total: produtos.length,
            produtos
        })
    }
}
module.exports = produtoController;

// Controller controla as regras do negocio