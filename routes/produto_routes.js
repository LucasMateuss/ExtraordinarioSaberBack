import express from "express";
import { produto } from "../controller/produto_controller.js";
import verifyJWT from "../middleware/auth_middleware.js";

let produtoRouter = express.Router();

/**
 * @swagger
 * /produto:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
produtoRouter.get("/", produto.Todos);

/**
 * @swagger
 * /produto:
 *   post:
 *     summary: Insere um novo produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               categoria:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produto criado
 */
produtoRouter.post("/", verifyJWT, produto.Inserir);

/**
 * @swagger
 * /produto/{cod_produto}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cod_produto
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 */
produtoRouter.put("/:cod_produto", verifyJWT, produto.Atualizar);

/**
 * @swagger
 * /produto/{cod_produto}:
 *   delete:
 *     summary: Deleta um produto pelo código
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cod_produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto deletado
 */
produtoRouter.delete("/:cod_produto", verifyJWT, produto.Deletar);

/**
 * @swagger
 * /produto/{cod_produto}:
 *   get:
 *     summary: Retorna um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: cod_produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 */
produtoRouter.get("/:cod_produto", produto.ObterPorCodigo);

/**
 * @swagger
 * /produto/categoria/{id_categoria}:
 *   get:
 *     summary: Retorna produtos por categoria
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produtos encontrados
 */
produtoRouter.get("/categoria/:id_categoria", produto.ObterPorCategoria);

/**
 * @swagger
 * /produto/qtde/{qtde_produto}:
 *   get:
 *     summary: Retorna produtos por quantidade no pedido
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: qtde_produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produtos encontrados
 */
produtoRouter.get("/qtde/:qtde_produto", produto.ObterPorQtdePedido);

export { produtoRouter };
