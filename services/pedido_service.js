import Pedido from "../models/servico_model.js"
import { QueryTypes } from "sequelize"
import sequelize from "../config/connection.js"

let pedidoService = {}

pedidoService.Deletar = async function(num_pedido) {
    try{
        return {
            status: "Deleção do pedido de número: " + num_pedido + " executada com sucesso!",
            result: await Pedido.destroy({
                where: {
                    num_pedido: num_pedido
                }
            })
        }
    } catch (e) {
        throw e;
    }
}

pedidoService.Todos = async function(){
    try {
        return await sequelize.query(
            "SELECT produto.nome_produto, produto.qtde_produto AS QtdeAtual, pedido.* FROM pedido INNER JOIN produto on pedido.cod_produto = produto.cod_produto;", {
                type: QueryTypes.SELECT
            })
    } catch (e) {
        throw e;
    }
}

pedidoService.Inserir = async function(pedido) {
    try{
        return await Pedido.create(pedido)
    } catch (e) {
        throw e;
    }
 
}

pedidoService.ObterPorNumPedido = async function(num_pedido){
    try {
        return (await sequelize.query("SELECT * FROM pedido WHERE num_pedido=?;", {
            replacements: [num_pedido],
            type: QueryTypes.SELECT,
        }))[0]
    } catch (e) {
        throw e
    }
}

export {pedidoService}