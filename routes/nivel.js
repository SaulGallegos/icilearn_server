import express from 'express';
import { check } from 'express-validator';

import { validarCampos } from '../helpers/validar-campos';
import { validarJWT } from '../helpers/validar-jwt';

import { getLevel, getLevels } from '../controllers/nivel';

const router = express.Router();

router.get('/', [validarJWT, validarCampos], getLevels);

router.get(
  '/:nivel',
  [
    validarJWT,
    check('nivel', 'El nivel es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  getLevel
);

export default router;
