import jwt from "jsonwebtoken";
import Usuario from "../models/usuario_model.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Autenticação falhou. Usuário não encontrado." });
    }

    if (password !== user.senha) {
      return res
        .status(401)
        .json({ message: "Autenticação falhou. Senha incorreta." });
    }

    console.log("SECRET:", user);
    const token = jwt.sign(
      { id: user.Id_Usuario, email: user.email, admin: user.Administrador },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor.", error });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Recebendo dados de registro:", req.body);

    const existingUser = await Usuario.findOne({ where: { email: email } });
    if (existingUser) {
      console.log("Usuário já existe:", existingUser);
      return res.status(400).json({ message: "Usuário já existe." });
    }

    console.log("Usuário não encontrado, criando novo usuário...");

    const newUser = await Usuario.create({
      email: email,
      senha: password,
      Administrador: 1,
    });

    console.log("Usuário criado com sucesso:", newUser);

    const token = jwt.sign(
      {
        id: newUser.Id_Usuario,
        email: newUser.email,
        admin: newUser.Administrador,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(201)
      .json({ token, message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro no servidor.", error });
  }
};

export { login, register };
