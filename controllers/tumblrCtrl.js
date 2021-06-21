const tumblr = require('tumblr.js');
const axios = require('axios');
const HTMLParser = require('node-html-parser');
// 1 - GET Tumblr posts based on tag (received fro the front end as query param q)
// we add ' photo' in order to have more specific result

// 2 - Sort tumblr returned posts and make sure at least one of them is of type:'photo' (tumblr posts can be anything from music, video, text, image etc...)

// 3 - Select one random post of type photo from the 20 posts of different type returned by Tumblr

// 4 - We get only a link to a "permalink" page

// 5 - Fetch this link with Axios

// 6 - parse the HTML string returned by axios in order to access the actual image

// 7 - return a JSON containing the image at a good width (last on in the srcset value list)

// Note: data from tumblr is not perfect so the chances of getting relevant results are higher for generic searchTerm

exports.search_get = (req, res, next) => {
  const searchTerm = req.query.q;
  const client = new tumblr.createClient({
    credentials: {
      consumer_key: process.env.TUMBLR_CONSUMER_KEY,
    },
    returnPromises: true,
  });
  client
    .taggedPosts(searchTerm) // as this method is based on user tag, adding photo allows more specific result
    .then((result) => {
      // is there a type:'photo' post from the 20 posts returned:
      // TODO - Time out if there is no 'photo' from the posts that were fetched
      let randomHit = Math.floor(Math.random() * Math.floor(result.length));
      while (result[randomHit].type !== 'photo') {
        randomHit = Math.floor(Math.random() * Math.floor(result.length));
      }
      // TODO - fix errors:
      // 1: the result doesn't have an image_permalink property
      // 2: Axios unable to fetch page even if permalink (security certificate ?)
      console.log(result[randomHit].image_permalink);

      // Getting the image URL from the permalink page above
      axios
        .get(result[randomHit].image_permalink)
        .then((response) => {
          const root = HTMLParser.parse(response.data);
          const srcSetValues = root
            .querySelector('img')
            .getAttribute('srcSet')
            .split(',');
          const highestSrcSetWidth = srcSetValues[srcSetValues.length - 1];
          const imgUrl = highestSrcSetWidth
            .split(' ')
            .filter((str) => str.startsWith('http'))[0];
          console.log(imgUrl);

          res.status(200).json({ src: imgUrl });
        })
        .catch((error) => {
          console.log('Error parsing HTML from permalink page.');
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};
