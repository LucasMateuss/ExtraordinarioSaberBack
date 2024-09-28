import express from "express";
import { login } from "../controller/auth_controller.js";

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

export { authRouter };
