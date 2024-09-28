import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const Pedido = sequelize.define('Pedido', {
  num_pedido: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cod_produto: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  qtde_pedido: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'pedido',
  timestamps: false
});

export default Pedido;