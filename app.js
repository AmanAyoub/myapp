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

app.set('view engine', 'pug');

app.use(express.static('images'));

app.use(myLogger);
app.use(requestTime);
app.use('/', (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  next();
})

// app.use(cookieParser());
// app.use(validateCookies);


app.get('/', (req, res, next) => {
  res.render('index', { title: 'My App', time: req.requestTime });
});

app.get('/', (req, res) => {
  res.send('Siuuuu');
});

app.get('/account', (req, res) => {
  res.render('account', {
    profilePicture: 'aman.png',
    name: 'Aman Ayoub',
    email: 'aman.ayoub16@gmail.com',
    githublink: 'https://github.com/AmanAyoub',
    bio: "I'm a future web developer.",
    twitterLink: "https://x.com/amanullah_ayoub"
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});