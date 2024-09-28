import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const Categoria = sequelize.define('Categoria', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_categoria: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'categoria',
  timestamps: false
});

export default Categoria;