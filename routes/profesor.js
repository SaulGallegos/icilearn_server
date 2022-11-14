import express from 'express';

import {
  getProfesores,
  getProfesor,
  crearProfesor,
  loginProfesor,
  editarProfesor,
  eliminarProfesor,
} from '../controllers/profesor';
  
  const router = express.Router();
  
  router.get('/', getProfesores);

  router.get('/:id', getProfesor);
  
  router.post('/login', loginProfesor);
  
  router.post('/', crearProfesor);
  
  export default router;
  