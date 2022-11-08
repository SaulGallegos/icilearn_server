import bcryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/generar-jwt';
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

  // Crypt password
  const salt = bcryptjs.genSaltSync();
  body.password = bcryptjs.hashSync(body.password, salt);
  body.nivel = 0;
  body.testCompletado = 0;

  const usuario = await Usuario.create(body);

  // JWT
  const jwt = await generarJWT(usuario.id, usuario.email);

  res.json({ ok: true, token: jwt, usuario });
};

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email: email } });

    const validPass = bcryptjs.compareSync(password, usuario.password);
    if (!usuario || !validPass) {
      return res.status(400).json({
        ok: false,
        msg: 'Email o contraseña incorrecta',
      });
    }

    // JWT
    const jwt = await generarJWT(usuario.id, usuario.email);

    return res.json({ ok: true, token: jwt, usuario });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Email o contraseña incorrecta',
    });
  }
};

export const editarUsuario = async (req, res) => {};

export const eliminarUsuario = async (req, res) => {};
