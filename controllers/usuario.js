import Usuario from '../models/usuario';

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();

  res.json(usuarios);
};

export const getUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  res.json(usuario);
};

export const crearUsuario = async (req, res) => {
  const { body } = req;

  // Email no repetido
  const emailExistente = await Usuario.findAll({
    where: { email: body.email },
  });
  if (emailExistente.length > 0) {
    return res.json({ ok: false, msg: 'El email ya existe' });
  }

  // TODO crypt password
  // TODO Crear JWT

  const usuario = await Usuario.create(body);
  res.json({ ok: true, usuario });
};

export const editarUsuario = async (req, res) => {};

export const eliminarUsuario = async (req, res) => {};
