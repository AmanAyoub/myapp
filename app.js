const express = require('express');
const app = express();
const PORT = 3000;

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}

const requestTime = function (req, res, next) {
  req.requestTime = (new Date()).toString();
  next();
}

app.use(myLogger);
app.use(requestTime);

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});