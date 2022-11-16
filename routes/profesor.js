import express from "express";
import { check } from "express-validator";

import { validarCampos } from "../helpers/validar-campos";
import { validarJWT } from "../helpers/validar-jwt";
import { profeExists } from "../middleware/profeExists";

import {
  getProfesores,
  getProfesor,
  crearProfesor,
  loginProfesor,
  editarProfesor,
  eliminarProfesor,
  eliminarCuenta,
} from "../controllers/profesor";

const router = express.Router();

router.get("/", [validarJWT, validarCampos], getProfesores);

router.get("/:id", [validarJWT, profeExists, validarCampos], getProfesor);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña es obligatoria"),

    validarCampos,
  ],
  loginProfesor
);

router.post(
  "/",
  [
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("La contraseña es obligatoria"),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellidos", "Los apellidos son obligatorios").not().isEmpty(),
    validarCampos,
  ],
  crearProfesor
);

router.put(
  "/:id",
  [
    validarJWT,
    check("email").isEmail().withMessage("El email es obligatorio"),
    check("nombre").not().isEmpty().withMessage("El nombre es obligatorio"),
    check("apellidos")
      .not()
      .isEmpty()
      .withMessage("Los apellidos son obligatorios"),
    validarCampos,
  ],
  editarProfesor
);

router.delete("/eliminar-cuenta", [validarJWT, validarCampos], eliminarCuenta);

router.delete("/:id", [validarJWT, validarCampos], eliminarProfesor);

export default router;
