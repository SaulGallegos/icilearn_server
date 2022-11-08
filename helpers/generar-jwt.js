const jwt = require('jsonwebtoken');

const generarJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: '24h',
      },
      (err, token) => {
        if (err) {
          reject('Error al gnerar token de autenticación');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generarJWT,
};
