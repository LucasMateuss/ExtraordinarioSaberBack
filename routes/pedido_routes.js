import express from "express";
import { pedido } from "../controller/pedido_controller.js";
import verifyJWT from "../middleware/auth_middleware.js";

let pedidoRouter = express.Router();

/**
 * @swagger
 * /pedido:
 *   get:
 *     summary: Retorna todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
pedidoRouter.get("/", pedido.Todos);

/**
 * @swagger
 * /pedido/{num_pedido}:
 *   get:
 *     summary: Retorna um pedido pelo número
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: num_pedido
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 */
pedidoRouter.get("/:num_pedido", pedido.ObterPorCodigo);

/**
 * @swagger
 * /pedido/{num_pedido}:
 *   delete:
 *     summary: Deleta um pedido pelo número
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: num_pedido
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pedido deletado
 */
pedidoRouter.delete("/:num_pedido", verifyJWT, pedido.Deletar);

export { pedidoRouter };
