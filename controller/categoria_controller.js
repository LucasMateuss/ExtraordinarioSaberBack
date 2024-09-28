import Categoria from "../models/categoria_model.js"
import { QueryTypes } from "sequelize"
import sequelize from "../config/connection.js"


let categoria = {}

categoria.Todos = async function(req, res){
    try {
        let categorias = await Categoria.findAll();
        res.send(categorias)
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

categoria.Inserir = async function(req, res) {
    try{
        let categoria = req.body
        let result = await Categoria.create(categoria)
        res.send({
            status: "Inserção Efetuada com sucesso!",
            result: result
 
 
        })
    } catch (e) {
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

categoria.Atualizar = async function(req,res){
    try{
        let id_categoria = req.params.id_categoria
        let { nome_categoria } = req.body
        let result = await Categoria.update({
            nome_categoria: !nome_categoria ? undefined : nome_categoria
        },{
            where: {
                id_categoria: id_categoria
            }
        })

        res.send({

            status: `Atualização da categoria de Nome: ${nome_categoria}, Código: ${id_categoria}`,
            result: result 
        })
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

categoria.Deletar = async function (req, res){
    try {
        
        let id_categoria = req.params.id_categoria

        let result = await Categoria.destroy({
            where: {
                id_categoria: id_categoria
            }
        })

        res.send({

            status: "A exclusao da categoria com código: " + id_categoria + " foi efetuada!",
            result: result 
        })
        } 
    catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

categoria.ObterPorCodigo = async function(req, res){
    try {

        let id_categoria = req.params.id_categoria
        let categoria = (await sequelize.query("SELECT * FROM categoria WHERE id_categoria=?;", {
            replacements: [id_categoria],
            type: QueryTypes.SELECT,
        }))[0]

        res.send(categoria)
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

export {categoria}