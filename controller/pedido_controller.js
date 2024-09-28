import {pedidoService} from "../services/pedido_service.js" // Service de pedidos

let pedido = {}

pedido.Todos = async function(req, res){
    try {
        res.send(await pedidoService.Todos())
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

pedido.ObterPorCodigo = async function(req, res){
    try {
        let num_pedido = req.params.num_pedido
        res.send(await pedidoService.ObterPorNumPedido(num_pedido))
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

pedido.Deletar = async function(req, res){
    try {
        let num_pedido = req.params.num_pedido
        res.send(await pedidoService.Deletar(num_pedido))
    } catch (e){
        res.status(500).json({
            erro: e
        })

        console.log("erro: ", e)
    }
}

export {pedido}