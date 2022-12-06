import { DataTypes } from 'sequelize';

import { db } from '../database/index';

const Pregunta = db.define('Preguntas', {
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  posicion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  opciones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  opcion_correcta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Pregunta;
