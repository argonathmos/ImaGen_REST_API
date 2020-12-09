const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const pixabayCtrl = require('./controllers/pixabayCtrl');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Method', 'GET'); 
        return res.status(200).json({});
    }
    next();
})

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