import connect from "../config/connection.js";
import { produtoService } from "../services/produto_service.js";

let produto = {};

produto.Todos = async function (req, res) {
  try {
    let produtos = await produtoService.Todos();
    res.send(produtos);
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.Inserir = async function (req, res) {
  try {
    res.send(await produtoService.Inserir(req.body));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.Atualizar = async function (req, res) {
  try {
    let cod_produto = req.params.cod_produto;
    res.send(await produtoService.Atualizar(req.body, cod_produto));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.Deletar = async function (req, res) {
  try {
    let cod_produto = req.params.cod_produto;
    res.send(await produtoService.Deletar(cod_produto));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.ObterPorCodigo = async function (req, res) {
  try {
    let cod_produto = req.params.cod_produto;
    res.send(await produtoService.ObterPorCodigo(cod_produto));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.ObterPorCategoria = async function (req, res) {
  try {
    let id_categoria = req.params.id_categoria;
    res.send(await produtoService.ObterPorCategoria(id_categoria));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

produto.ObterPorQtdePedido = async function (req, res) {
  try {
    let qtde_produto = req.params.qtde_produto;
    res.send(await produtoService.ObterPorQtdePedido(qtde_produto));
  } catch (e) {
    res.status(500).json({
      erro: e,
    });

    console.log("erro: ", e);
  }
};

export { produto };
