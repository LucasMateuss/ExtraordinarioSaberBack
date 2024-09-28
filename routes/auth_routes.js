import express from "express";
import { login, register } from "../controller/auth_controller.js";

let authRouter = express.Router();

/**
 * @swagger
 * /token/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Falha na autenticação
 */
authRouter.post("/login", login);

/**
 * @swagger
 * /token/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do usuário
 *               email:
 *                 type: string
 *                 description: Endereço de email do usuário
 *               password:
 *                 type: string
 *                 description: Senha para a conta do usuário
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Usuário já existe
 *       500:
 *         description: Erro no servidor
 */
authRouter.post("/register", register);

export { authRouter };
