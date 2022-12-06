import { DataTypes } from 'sequelize';

import { db } from '../database/index';

const Recurso = db.define('Recursos', {
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recurso_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Recurso;
