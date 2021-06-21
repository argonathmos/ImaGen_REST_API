const express = require('express');
const app = express();
const pixabayCtrl = require('./controllers/pixabayCtrl');
const duckduckgoCtrl = require('./controllers/duckduckgoCtrl');
const tumblrCtrl = require('./controllers/tumblrCtrl');

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Method', 'GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/pixabay', pixabayCtrl.search_get);
app.get('/duckduckgo', duckduckgoCtrl.search_get);
app.get('/tumblr', tumblrCtrl.search_get);

/* Error Handling */
app.use((req, res, next) => {
  const error = new Error(
    'Endpoint Not Found! Please refer to API documentation for valid enpoint.'
  );
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status);
  res.json({ error: { status: error.status, message: error.message } });
});

app.listen(4444, () => console.log('✨ImaGen API listening on port: 4444 ✨'));
