import express from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../helpers/validar-campos';
import { validarJWT } from '../helpers/validar-jwt';

import {
  getUsuarios,
  getUsuario,
  crearUsuario,
  loginUsuario,
  editarUsuario,
  eliminarUsuario,
  levelUp,
  setDiagnostic,
  eliminarCuenta,
} from '../controllers/usuario';
import { userExists } from '../middleware/userExists';

const router = express.Router();

router.get('/:id', [validarJWT, userExists, validarCampos], getUsuario);

router.get('/', [validarJWT, validarCampos], getUsuarios);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('El email es obligatorio'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('La contraseña es obligatoria'),

    validarCampos,
  ],
  loginUsuario
);

router.post(
  '/',
  [
    check('email').isEmail().withMessage('El email es obligatorio'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('La contraseña es obligatoria'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  '/diagnostico-completado',
  [validarJWT, validarCampos],
  setDiagnostic
);

router.put('/levelup', [validarJWT, validarCampos], levelUp);

router.put(
  '/:id',
  [
    validarJWT,
    check('email').isEmail().withMessage('El email es obligatorio'),
    check('nombre').not().isEmpty().withMessage('El nombre es obligatorio'),
    check('apellidos')
      .not()
      .isEmpty()
      .withMessage('Los apellidos son obligatorios'),
    validarCampos,
  ],
  editarUsuario
);

router.delete('/eliminar-cuenta', [validarJWT, validarCampos], eliminarCuenta);

router.delete('/:id', [validarJWT, userExists, validarCampos], eliminarUsuario);

export default router;
