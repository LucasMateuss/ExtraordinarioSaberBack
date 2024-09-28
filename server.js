import { config } from "dotenv-safe";
config();
import express from "express";
import ConfigurarRotas from "./routes/router.js";
import http from "http";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js", "./controller/*.js"], // Caminho para os arquivos que contêm anotações
};
const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", await ConfigurarRotas());

const server = http.createServer(app);
server.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});
