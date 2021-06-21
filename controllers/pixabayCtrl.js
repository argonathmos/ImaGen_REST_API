const url = require('url');
const axios = require('axios');

exports.search_get = (req, res, next) => {
  let reqURL = url.parse(req.url, true);
  const searchTerm = reqURL.query.q;

  axios
    .get('https://pixabay.com/api/', {
      params: {
        key: process.env.PIXABAY_API_KEY,
        q: searchTerm,
        image_type: 'photo',
      },
    })
    .then((response) => {
      let randomHit = Math.floor(
        Math.random() * Math.floor(response.data.hits.length)
      );
      res.status(200).json({ src: response.data.hits[randomHit].webformatURL });
      // Never send the response object to the browser as it contains the api key only send back the response.data.
    })
    .catch((error) => {
      next(error);
    });
};
