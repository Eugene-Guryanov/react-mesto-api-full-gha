require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { loginValidation, userValidation } = require('./middlewares/validation');
// eslint-disable-next-line import/no-unresolved, import/extensions
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
// app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'localhost:3000', 'https://localhost:3000', 'https://project.nomoredomains.monster'], credentials: true, maxAge: 3600 }));
const allowedCors = [
  'http://localhost:3001',
  'project.nomoredomains.monster',
  'localhost:3000',
  'https://project.nomoredomains.monster',
  'http://project.nomoredomains.monster',
];
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
    return;
  }
  next();
});
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);
app.use('/', auth, userRouter);
app.use('/', auth, cardRouter);

app.use('*', auth, () => {
  throw new NotFoundError('По указаному url ничего нет');
});

app.use(errors());

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
