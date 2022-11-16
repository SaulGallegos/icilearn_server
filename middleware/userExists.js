import Usuario from '../models/usuario';

const { response } = require('express');

export const userExists = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Usuario no existe',
    });
  }
};
