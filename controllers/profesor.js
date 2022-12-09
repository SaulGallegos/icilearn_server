import bcryptjs from "bcryptjs";

import { generarJWT } from "../helpers/generar-jwt";
import Profesor from "../models/profesor";
import Usuario from "../models/usuario";

export const getProfesores = async (req, res) => {
  const profesores = await Profesor.findAll();

  if (!profesores) {
    return res.status(400).json({
      status: false,
      msg: "No hay profesores",
      profesores,
    });
  }

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
    return res.json({ ok: false, msg: "El email ya existe" });
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
        msg: "Email o contraseña incorrecta",
      });
    }

    // JWT
    const jwt = await generarJWT(profesor.id, profesor.email);

    return res.json({ ok: true, token: jwt, profesor });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: "Email o contraseña incorrecta",
    });
  }
};

export const editarProfesor = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const profesor = await Profesor.findByPk(id);
  if (!profesor) {
    return res.status(404).json({
      ok: false,
      msg: "Profesor no encontrado",
    });
  }

  try {
    profesor.set({
      nombre: body.nombre,
      apellidos: body.apellidos,
      email: body.email,
    });
    await profesor.save();
    return res.json({ ok: true, profesor });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: "Error al editar profesor",
    });
  }
};

export const eliminarProfesor = async (req, res) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor) {
      return res.status(404).json({
        ok: false,
        msg: "Profesor no encontrado",
      });
    }
    await Profesor.destroy({ where: { id: id }, force: true });
    return res.json({ ok: true, msg: "Profesor eliminado" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: "Error al editar Profesor",
    });
  }
};

export const eliminarCuenta = async (req, res) => {
  const { id } = req;

  try {
    const profesor = await Profesor.findByPk(id);
    console.log(profesor);
    await Profesor.destroy({ where: { id: id }, force: true });
    return res.json({ ok: true, msg: "Profesor eliminado" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      ok: false,
      msg: "Hubo un error al eliminar el Profesor",
    });
  }
};

export const dashboard = async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: ["nombre", "apellidos", "testCompletado", "nivel", "email"],
  });

  if (usuarios.length < 1) {
    return res.status(400).json({
      status: false,
      msg: "No hay alumnos",
      usuarios: [],
    });
  }
  res.json({ status: true, usuarios, total_alumnos: usuarios.length });
};

/*export const dashboard = async (req, res) => {
  const usuarios = await Usuario.findAll();

  if (usuarios.length < 1) {
    return res.status(400).json({
      status: false,
      msg: "No hay alumnos",
      usuarios: [],
    });
  }
  res.json({ status: true, usuarios });
};*/
