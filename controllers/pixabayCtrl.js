const url = require('url');

exports.search_get = (req, res, next)=> {
    reqURL = url.parse(req.url, true);
    console.log(typeof(reqURL));
    console.log(reqURL);
    console.log(typeof(reqURL.search));
    console.log(reqURL.search);
    
    console.log(typeof(reqURL.query));
    console.log(reqURL.query.q);
    res.json({msg: 'My REST API is on fire!'});
}