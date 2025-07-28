const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieValidator = require('./cookieValidator');
const PORT = 3000;

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}

const requestTime = function (req, res, next) {
  req.requestTime = (new Date()).toString();
  next();
}

async function validateCookies (req, res, next) {
  await (cookieValidator(req.cookies));
  next();
}

app.use(myLogger);
app.use(requestTime);

app.use(cookieParser());
app.use(validateCookies);


// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});