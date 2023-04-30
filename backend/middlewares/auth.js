const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
// const token = req.cookies.jwt;

  const { authorization } = req.headers;

  if (!authorization.startsWith('Bearer')) {
    return next(new AuthError(
      'Необходима авторизацияZ!',
    ));
  }

  const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthError('Необходима авторизация!'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
