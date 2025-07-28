const express = require('express');
const app = express();
const PORT = 3000;

const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
}

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});