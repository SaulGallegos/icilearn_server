import Usuario from '../models/usuario';

export const register = async (req, res) => {
  const usuarios = await Usuario.findAll();

  res.json(usuarios);
};
