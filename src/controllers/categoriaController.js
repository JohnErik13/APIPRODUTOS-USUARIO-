
const CategoriaModel = require('../models/categoriaModel');

const categoriaController = {

    // Criar categoria
    criarCategoria: async (req, res) => {
        try {
            const { codigo, descricao } = req.body;

            if (!codigo || !descricao) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Os campos codigo e descricao são obrigatórios!"
                });
            }

            const codigoConvertido = Number(codigo);
            const descricaoMaiuscula = String(descricao).toUpperCase();

            const novaCategoria = await CategoriaModel.create({
                data: {
                    codigo: codigoConvertido,
                    descricao: descricaoMaiuscula
                }
            });

            return res.status(201).json({
                sucesso: true,
                categoria: novaCategoria
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },

    // Listar categorias
    listarCategoria: async (req, res) => {
        try {
            const categoria = await CategoriaModel.findMany();

            return res.status(200).json({
                sucesso: true,
                categoria
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },

    // Atualizar categoria
    atualizarCategoria: async (req, res) => {
        try {
            const { codigo } = req.params;
            const { descricao } = req.body;

            if (!descricao) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "O campo descricao é obrigatório!"
                });
            }

            const codigoConvertido = Number(codigo);
            const descricaoMaiuscula = String(descricao).toUpperCase();

            const categoriaAtualizada = await CategoriaModel.update({
                where: {
                    codigo: codigoConvertido
                },
                data: {
                    descricao: descricaoMaiuscula
                }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: "Categoria atualizada com sucesso!",
                categoria: categoriaAtualizada
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },

    // Deletar categoria
    deletarCategoria: async (req, res) => {
        try {
            const { codigo } = req.params;

            const categoriaDeletada = await CategoriaModel.delete({
                where: {
                    codigo: Number(codigo)
                }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: "Categoria excluída com sucesso!",
                categoria: categoriaDeletada
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }

};

module.exports = categoriaController;
