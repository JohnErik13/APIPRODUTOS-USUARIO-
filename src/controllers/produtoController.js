const CategoriaModel = require('../models/categoriaModel');
const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarPoduto: async (req, res) =>{
        const { codigo, nome, quantidade, preco} = req.body;
        // validação simples dos campos obrigatórios
        if(!codigo || !nome || !quantidade || !preco){
            return res.status(400).json({
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
    const novoProdutos = await produtoModel.create({
        data: { // json
        codigo,
        nome: nomeMaiusculo,
        quantidade: qtde,
        preco: valorPreco,
        total: valorTotal
        }
    });
        
        // Retorna a resposta HTTP 201 (Created)
        return res.status(201).json({
            sucesso:true,
            mensagem: " Produto cadastrado com sucesso no MySQL",
            produto: novoProdutos
        })
    },
    listarProdutos: async (req, res) =>{
        try {
            const produtos = await produtoModel.findMany();
            return res.json({
                sucesso: true,
                total: produtos.length,
                produtos
            })
        } catch (error) {
            return res.status(500).json({sucesso: false, error: error.message})
        }
        
    }
        
                           
       
    
}
module.exports = produtoController;

// Controller controla as regras do negocio