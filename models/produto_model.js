import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';
import Categoria from './categoria_model.js';

const Produto = sequelize.define('Produto', {
  cod_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_produto: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  qtde_produto: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
        key: 'id_categoria',
        model: Categoria
    }
  }
}, {
  tableName: 'produto',
  timestamps: false
});

export default Produto;