import { DataTypes } from 'sequelize';

import { db } from '../database/index';

const Nivel = db.define('Niveles', {
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Nivel;
