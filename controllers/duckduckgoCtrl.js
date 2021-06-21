const ddg = require('duckduckgo-images-api');

exports.search_get = (req, res, next) => {
  const searchTerm = req.query.q;
  ddg
    .image_search({ query: searchTerm, moderate: true })
    .then((result) => {
      let randomHit = Math.floor(Math.random() * Math.floor(result.length)); //image_search returns 200 results
      // console.log(result[randomHit]);
      res.status(200).json({ src: result[randomHit].image });
    })
    .catch((error) => {
      next(error);
    });
};
