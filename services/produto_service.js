import Produto from "../models/produto_model.js"
import { pedidoService } from "./pedido_service.js"
import { QueryTypes } from "sequelize"
import sequelize from "../config/connection.js"


let produtoService = {}

produtoService.Todos = async function(){
    try {
        return await Produto.findAll()
    } catch (e) {
        throw e
    }
}

produtoService.Inserir = async function(produto) {
    try{
        let result = await Produto.create(produto)

        if (produto.qtde_produto < 7){
            let novoPedido = {
                cod_produto: result.cod_produto,
                qtde_pedido: ObterQtdeNecessaria(produto.qtde_produto)
            }

            pedidoService.Inserir(novoPedido)

            return {
                status: `Inserção Efetuada com sucesso e Pedido realizado no valor de ${novoPedido.qtde_pedido} unidades!`,
                result: result
            }
        }    

        return {
            status: "Inserção Efetuada com sucesso!",
            result: result
        }
    } catch (e) {
        throw e
    }
 
}

produtoService.Atualizar = async function(produtoNovo, cod_produto){
    try{
        let produtoOriginal = await produtoService.ObterPorCodigo(cod_produto)

        if (!produtoOriginal)
            throw "O produto original para o cod_produto informado não foi encontrado."

        let { nome_produto, qtde_produto} = produtoNovo
        let result = await Produto.update({
            nome_produto: !nome_produto ? undefined : nome_produto,
            qtde_produto: !qtde_produto ? undefined : qtde_produto
        },{
            where: {
                cod_produto: cod_produto
            }
        })

        if (produtoNovo.qtde_produto < 7){
            let novoPedido = {
                cod_produto: produtoOriginal.cod_produto,
                qtde_pedido: ObterQtdeNecessaria(produtoNovo.qtde_produto)
            }

            pedidoService.Inserir(novoPedido)

            return {
                status: `Atualização Efetuada com sucesso e Pedido realizado no valor de ${novoPedido.qtde_pedido} unidades para o Produto de Código: ${produtoOriginal.cod_produto}!`,
                result: result
            }

        }

        return {

            status: `Atualização da produto de Nome: ${produtoAtualizada.nome_produto}, Código: ${cod_produto}`,
            result: result 
        }
    } catch (e) {
        throw e
    }
}

produtoService.Deletar = async function (cod_produto){
    try {
        return {

            status: "A exclusao do produto com código: " + cod_produto + " foi efetuada",
            result: await Produto.destroy({
                where: {
                    cod_produto: cod_produto
                }
            }) 
        }
    } 
    catch (e) {
        throw e
    }
}

produtoService.ObterPorCodigo = async function(cod_produto){
    try {
        return (await sequelize.query("SELECT * FROM produto WHERE cod_produto=?;", {
            replacements: [cod_produto],
            type: QueryTypes.SELECT,
        }))[0]
    } catch (e) {
        throw e
    }
}

produtoService.ObterPorCategoria = async function(id_categoria){
    try {
        return await sequelize.query("SELECT * FROM produto WHERE id_categoria=?;", {
            replacements: [id_categoria],
            type: QueryTypes.SELECT,
        })
    } catch (e) {
        throw e
    }
}

produtoService.ObterPorQtdePedido = async function(qtde_produto){
    try {
        return await sequelize.query("SELECT produto.*, pedido.qtde_pedido FROM produto LEFT JOIN pedido ON produto.cod_produto = pedido.cod_produto WHERE pedido.qtde_pedido =?;", {
                replacements: [qtde_produto],
                type: QueryTypes.SELECT,
        })
    } catch (e) {
        throw e
    }
}

function ObterQtdeNecessaria(qtdeProduto){
    if (qtdeProduto <= 3)
        return 4

    return 3
}

export {produtoService}