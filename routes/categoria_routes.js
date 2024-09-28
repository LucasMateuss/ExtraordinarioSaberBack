import express from "express";
import { categoria } from "../controller/categoria_controller.js";
import verifyJWT from "../middleware/auth_middleware.js";

let categoriaRouter = express.Router();

/**
 * @swagger
 * /categoria:
 *   get:
 *     summary: Retorna todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
categoriaRouter.get("/", verifyJWT, categoria.Todos);

/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Insere uma nova categoria
 *     tags: [Categorias]
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
 *     responses:
 *       201:
 *         description: Categoria criada
 */
categoriaRouter.post("/", verifyJWT, categoria.Inserir);

/**
 * @swagger
 * /categoria/{id_categoria}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
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
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */
categoriaRouter.put("/:id_categoria", verifyJWT, categoria.Atualizar);

/**
 * @swagger
 * /categoria/{id_categoria}:
 *   delete:
 *     summary: Deleta uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Categoria deletada
 */
categoriaRouter.delete("/:id_categoria", verifyJWT, categoria.Deletar);

/**
 * @swagger
 * /categoria/{id_categoria}:
 *   get:
 *     summary: Retorna uma categoria pelo ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id_categoria
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada
 */
categoriaRouter.get("/:id_categoria", verifyJWT, categoria.ObterPorCodigo);

export { categoriaRouter };
