import express from 'express';

import {
  getUsuarios,
  getUsuario,
  crearUsuario,
  loginUsuario,
  editarUsuario,
  eliminarUsuario,
} from '../controllers/usuario';

const router = express.Router();

router.get('/', getUsuarios);

// TODO validar campos
router.get('/:id', getUsuario);

router.post('/login', loginUsuario);

router.post('/', crearUsuario);

export default router;
