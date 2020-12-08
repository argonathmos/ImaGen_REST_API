const express = require('express');
const app = express();
const url = require('url');
const pixabayCtrl = require('./controllers/pixabayCtrl');

app.get('/pixabay', pixabayCtrl.search_get);

/* Error Handling */
app.use((req, res, next) => {
    const error = new Error('Endpoint Not Found! Please refer to API documentation for valid enpoint.');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    if(!error.status){
        error.status = 500;
    }
    // console.log(error);
    res.status(error.status);
    res.json({error: {status: error.status, message: error.message} });
})

module.exports = app;