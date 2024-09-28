import Categoria from "../models/categoria_model.js";
import { QueryTypes } from "sequelize";
import sequelize from "../config/connection.js";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario_model.js";

const getUserFromToken = async (req) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    throw new Error("Token is missing");
  }

  const decoded = jwt.verify(token, process.env.SECRET);
  if (!decoded) {
    throw new Error("Invalid token");
  }

  const user = await Usuario.findByPk(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

let categoria = {};

categoria.Todos = async function (req, res) {
  try {
    const user = await getUserFromToken(req);
    let categorias = await Categoria.findAll({
      where: { id_usuario: user.Id_Usuario },
    });
    res.send(categorias);
  } catch (e) {
    res.status(500).json({
      erro: e.message,
    });
    console.log("erro: ", e);
  }
};

categoria.Inserir = async function (req, res) {
  try {
    const user = await getUserFromToken(req);
    let categoria = {
      ...req.body,
      id_usuario: user.Id_Usuario,
    };
    let result = await Categoria.create(categoria);
    res.send({
      status: "Inserção Efetuada com sucesso!",
      result: result,
    });
  } catch (e) {
    res.status(500).json({
      erro: e.message,
    });
    console.log("erro: ", e);
  }
};

categoria.Atualizar = async function (req, res) {
  try {
    const user = await getUserFromToken(req);
    let id_categoria = req.params.id_categoria;
    let { nome_categoria } = req.body;

    let categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
        id_usuario: user.Id_Usuario,
      },
    });

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria não encontrada ou não pertence a este usuário",
      });
    }

    let result = await Categoria.update(
      { nome_categoria: nome_categoria },
      { where: { id_categoria: id_categoria } }
    );

    res.send({
      status: `Atualização da categoria de Nome: ${nome_categoria}, Código: ${id_categoria}`,
      result: result,
    });
  } catch (e) {
    res.status(500).json({
      erro: e.message,
    });
    console.log("erro: ", e);
  }
};

categoria.Deletar = async function (req, res) {
  try {
    const user = await getUserFromToken(req);
    let id_categoria = req.params.id_categoria;

    let categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
        id_usuario: user.Id_Usuario,
      },
    });

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria não encontrada ou não pertence a este usuário",
      });
    }

    let result = await Categoria.destroy({
      where: { id_categoria: id_categoria },
    });

    res.send({
      status:
        "A exclusão da categoria com código: " +
        id_categoria +
        " foi efetuada!",
      result: result,
    });
  } catch (e) {
    res.status(500).json({
      erro: e.message,
    });
    console.log("erro: ", e);
  }
};

categoria.ObterPorCodigo = async function (req, res) {
  try {
    const user = await getUserFromToken(req);
    let id_categoria = req.params.id_categoria;

    let categoria = await Categoria.findOne({
      where: {
        id_categoria: id_categoria,
        id_usuario: user.Id_Usuario,
      },
    });

    if (!categoria) {
      return res.status(404).json({
        message: "Categoria não encontrada ou não pertence a este usuário",
      });
    }

    res.send(categoria);
  } catch (e) {
    res.status(500).json({
      erro: e.message,
    });
    console.log("erro: ", e);
  }
};

export { categoria };
