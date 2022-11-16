import Profesor from "../models/profesor";

const { response } = require("express");

export const profeExists = async (req, res = response, next) => {
  const { id } = req.params;

  try {
    const profesor = await Profesor.findByPk(id);
    if (!profesor) {
      return res.status(404).json({
        ok: false,
        msg: "Profesor no encontrado",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Profesor no existe",
    });
  }
};
