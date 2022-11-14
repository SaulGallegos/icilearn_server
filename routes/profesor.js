import express from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../helpers/validar-campos';
import { validarJWT } from '../helpers/validar-jwt';

import {
  getProfesores,
  getProfesor,
  crearProfesor,
  loginProfesor,
  editarProfesor,
  eliminarProfesor,
} from '../controllers/profesor';

  
  const router = express.Router();
  
  router.get('/',[validarJWT,validarCampos], getProfesores);

  router.get('/:id',[validarJWT, validarCampos], getProfesor);
  
  router.post(
    '/login',
    [
      check('email').isEmail().withMessage('El email es obligatorio'),
      check('password')
        .not()
        .isEmpty()
        .withMessage('La contraseña es obligatoria'),
  
      validarCampos,
    ]
    ,loginProfesor);
  
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
    ]
    ,crearProfesor);
  
  export default router;
  