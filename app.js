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
app.use('/', (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
})

// app.use(cookieParser());
// app.use(validateCookies);


app.get('/', (req, res, next) => {
  let responseText = 'Hello World!<br>';
  req.responseText = responseText;
  next();
}, (req, res, next) => {
  req.responseText += `<small>Requested at: ${req.requestTime}</small>`;
  next();
}, (req, res, next) => {
  res.send(req.responseText);
});

app.get('/', (req, res) => {
  res.send('Siuuuu');
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});