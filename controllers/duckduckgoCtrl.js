const url = require('url');
const ddg = require('duckduckgo-images-api');
const { search } = require('../app');

exports.search_get = (req, res, next)=> {
    reqURL = url.parse(req.url, true);
    const searchTerm = reqURL.query.q;
    ddg.image_search({query:searchTerm, moderate:true})
    .then(result => {
        randomHit = Math.floor(Math.random() * Math.floor(result.length)); //image_search returns 200 results
        // console.log(result[randomHit]);
        res.status(200).json({src: result[randomHit].image});
    })
    .catch(error => {
        next(error);
    });
}