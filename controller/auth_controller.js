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

export { login };
