import bcryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/generar-jwt';
import Profesor from '../models/profesor';

export const getProfesores = async (req, res) => {
  const profesores = await Profesor.findAll();

  res.json(profesores);
};

export const getProfesor = async (req, res) => {
  const { id } = req.params;
  const profesor = await Profesor.findByPk(id);

  res.json(profesor);
};

export const crearProfesor = async (req, res) => {
  const { body } = req;

  // Email no repetido
  const emailExistente = await Profesor.findAll({
    where: { email: body.email },
  });
  if (emailExistente.length > 0) {
    return res.json({ ok: false, msg: 'El email ya existe' });
  }

  // Crypt password
  const salt = bcryptjs.genSaltSync();
  body.password = bcryptjs.hashSync(body.password, salt);

  const profesor = await Profesor.create(body);

  // JWT
  const jwt = await generarJWT(profesor.id, profesor.email);

  res.json({ ok: true, token: jwt, profesor });
};

export const loginProfesor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const profesor = await Profesor.findOne({ where: { email: email } });

    const validPass = bcryptjs.compareSync(password, profesor.password);
    if (!profesor || !validPass) {
      return res.status(400).json({
        ok: false,
        msg: 'Email o contraseña incorrecta',
      });
    }

    // JWT
    const jwt = await generarJWT(profesor.id, profesor.email);

    return res.json({ ok: true, token: jwt, profesor });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: 'Email o contraseña incorrecta',
    });
  }
};

export const editarProfesor = async (req, res) => {};

export const eliminarProfesor = async (req, res) => {};
