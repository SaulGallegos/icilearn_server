import Informacion from '../models/informacion';
import Level from '../models/nivel';
import Pregunta from '../models/pregunta';
import Recurso from '../models/recursos';

export const getLevels = async (req, res) => {
  const levels = await Level.findAll();

  res.json({
    ok: true,
    niveles: levels,
  });
};

export const getLevel = async (req, res) => {
  const { nivel } = req.params;

  const level = await Level.findAll({ where: { nivel: nivel } });

  if (level.length < 0) {
    return res.json({
      ok: false,
      msg: 'Nivel no encontrado',
    });
  }

  const information = await Informacion.findAll({ where: { nivel: nivel } });
  const questions = await Pregunta.findAll({ where: { nivel: nivel } });
  const resources = await Recurso.findAll({ where: { nivel: nivel } });

  res.json({
    ok: true,
    nivel: level,
    informacion: information,
    preguntas: questions,
    recursos: resources,
  });
};
