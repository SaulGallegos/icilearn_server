import express from 'express';

import {
  getUsuarios,
  getUsuario,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from '../controllers/usuario';

const router = express.Router();

router.get('/', getUsuarios);

// TODO validar campos
router.get('/:id', getUsuario);

router.post('/', crearUsuario);

export default router;
