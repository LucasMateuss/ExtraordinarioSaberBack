import { authRouter } from "./auth_routes.js";
import { categoriaRouter } from "./categoria_routes.js";
import express from "express";
import verifyJWT from "../middleware/auth_middleware.js";

let ConfigurarRotas = async () => {
  try {
    let router = express.Router();

    router.use("/token", authRouter);
    router.use("/categoria", verifyJWT, categoriaRouter);
    router.use("/", authRouter);

    return router;
  } catch (e) {
    console.log(e);
  }
};

export default ConfigurarRotas;
