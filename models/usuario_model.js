import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const Usuario = sequelize.define(
  "Usuario",
  {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    Administrador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

export default Usuario;
