import bcryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/generar-jwt';
import Usuario from '../models/usuario';

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll();

  if (!usuarios) {
    return res.status(404).json({
      ok: false,
      msg: 'No hay usuarios',
      usuarios: [],
    });
  }

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
    return res.status(400).json({ ok: false, msg: 'El email ya existe' });
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
    if (!usuario) {
      return res.status(400).json({ ok: false, msg: 'Email no encontrado' });
    }

    const validPass = bcryptjs.compareSync(password, usuario.password);
    if (!validPass) {
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

export const editarUsuario = async (req, res) => {
  const { id } = req;
  const { body } = req;

  const usuario = await Usuario.findByPk(id);

  try {
    usuario.set({
      nombre: body.nombre,
      apellidos: body.apellidos,
      email: body.email,
    });
    await usuario.save();
    return res.json({ ok: true, usuario });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Error al editar usuario',
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    await Usuario.destroy({ where: { id: id }, force: true });
    return res.json({ ok: true, msg: 'Usuario eliminado' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error al eliminar el usuario',
    });
  }
};

export const levelUp = async (req, res) => {
  const { id } = req;
  const usuario = await Usuario.findByPk(id);

  try {
    usuario.nivel = usuario.nivel + 1;
    await usuario.save();
    return res.json({ ok: true, usuario });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error al actualizar el nivel',
    });
  }
};

export const setDiagnostic = async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount < 0 || amount > 10) {
    return res.status(400).json({
      ok: false,
      msg: 'Amount no valida',
    });
  }
  const usuario = await Usuario.findByPk(req.id);
  try {
    usuario.testCompletado = true;
    if (amount >= 8) {
      usuario.nivel = 3;
    } else if (amount >= 5) {
      usuario.nivel = 2;
    } else {
      usuario.nivel = 1;
    }
    await usuario.save();
    return res.json({ ok: true, usuario });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error al actualizar el diagnostico',
    });
  }
  // set testCompletado true
  // set nivel
};

export const eliminarCuenta = async (req, res) => {
  const { id } = req;

  try {
    await Usuario.destroy({ where: { id: id }, force: true });
    return res.json({ ok: true, msg: 'Usuario eliminado' });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Hubo un error al eliminar el usuario',
    });
  }
};

// update password
