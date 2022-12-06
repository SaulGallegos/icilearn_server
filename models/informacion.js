import { DataTypes } from 'sequelize';

import { db } from '../database/index';

const Informacion = db.define(
  'Informacion',
  {
    nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    posicion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    informacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export default Informacion;
