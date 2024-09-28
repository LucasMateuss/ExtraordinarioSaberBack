import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import Usuario from "./usuario_model.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_categoria: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "Id_Usuario",
      },
    },
  },
  {
    tableName: "categoria",
    timestamps: false,
  }
);

Categoria.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default Categoria;
