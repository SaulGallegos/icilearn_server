const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
  const token = req.header('auth-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token requerido',
    });
  }

  try {
    const { id, email } = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.id = id;
    req.email = email;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }
};

module.exports = {
  validarJWT,
};
