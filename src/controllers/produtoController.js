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
        
    },
    atualizar: async (req, res) => {
        try {
            const codigo = Number(req.params.codigo);
            const { nome, quantidade, preco } = req.body;

            const existente = await produtosModel.findUnique({ where: { codigo } });
            if (!existente) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Produto com código ${codigo} não encontrado.`
                });
            }

            const qtde = quantidade !== undefined ? Number(quantidade) : existente.quantidade;
            const valorPreco = preco !== undefined ? Number(preco) : Number(existente.preco);

            if (Number.isNaN(qtde) || Number.isNaN(valorPreco) || qtde < 0 || valorPreco < 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Quantidade e preço devem ser números maiores ou iguais a zero."
                });
            }

            const nomeFinal = nome !== undefined ? String(nome).toUpperCase() : existente.nome;

            const produtoAtualizado = await produtosModel.update({
                where: { codigo },
                data: {
                    nome: nomeFinal,
                    quantidade: qtde,
                    preco: valorPreco,
                    total: qtde * valorPreco
                }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: "Produto atualizado com sucesso!",
                produto: produtoAtualizado
            });
        } catch (error) {
            return res.status(500).json({ sucesso: false, error: error.message });
        }
    },
    excluir: async (req, res) => {
        try {
            const codigo = Number(req.params.codigo);

            const existente = await produtosModel.findUnique({ where: { codigo } });
            if (!existente) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: `Produto com código ${codigo} não encontrado.`
                });
            }

            await produtosModel.delete({ where: { codigo } });

            return res.status(200).json({
                sucesso: true,
                mensagem: "Produto excluído com sucesso!",
                produto: existente
            });
        } catch (error) {
            return res.status(500).json({ sucesso: false, error: error.message });
        }
    }
                             
       
    
}
module.exports = produtoController;

// Controller controla as regras do negocio