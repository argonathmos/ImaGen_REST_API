const url = require('url');
const tumblr = require('tumblr.js');
const axios = require('axios');
// const util = require('util');

// 1 - GET Tumblr posts based on tag (received fro the front end as query param q)
// we add ' photo' in order to have more specific result 

// 2 - Sort tumblr returned posts and make sure at least one of them is of type:'photo' (tumblr posts can be anything from music, video, text, image etc...)

// 3 - Select one random post of type photo from the 20 posts of different type returned by Tumblr

// 4 - We get only a link to a "permalink" page

// 5 - Fetch this link with Axios 

// 6 - parse the HTML string returned by axios in order to access the actual image

// 7 - return a JSON containing the image at a medium width (around 500w to 640w)

// Note: data from tumblr is not perfect so the chances of getting relevant results are higher for generic searchTerm


exports.search_get = (req, res, next)=> {
    reqURL = url.parse(req.url, true);
    const searchTerm = reqURL.query.q;
    const client = new tumblr.createClient({
        credentials:{
            consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        },
        returnPromises: true,
    });
    
    client.taggedPosts(searchTerm) // as this method is based on user tag, adding photo allows more specific result
    .then(result =>{
        // is there a type:'photo' post from the 20 posts returned:
        let photo = false;
        for(let post of result){
            if(post.type ==='photo'){
                photo = true;
                // console.log('IMAGE FOUND !!!');
            }
        }

        if(photo){
            randomHit = Math.floor(Math.random() * Math.floor(result.length));
            // console.log(result[randomHit].type);
            while(result[randomHit].type !=='photo'){
                randomHit = Math.floor(Math.random() * Math.floor(result.length));
                // console.log(result[randomHit].type);
            }
            // console.log(result[randomHit], null, 2);// 20 by defaults
            
            // console.log(result[randomHit].image_permalink);
            // Getting the image data from the permalink page above
            axios.get(result[randomHit].image_permalink)
            .then(resp => {
                // console.log(resp.data);
                const indexOfFirst = resp.data.indexOf('<img');
                const indexOfSecond = resp.data.indexOf('<img', (indexOfFirst + 1));
                const imgElem =resp.data.substring(indexOfSecond);
                // console.log(imgElem);

                const srcsetAttr = imgElem.substring(imgElem.indexOf('srcSet'),imgElem.indexOf('/>'));
                // console.log(srcsetAttr); 

                const srcsetAttrValue = srcsetAttr.substring(srcsetAttr.indexOf('"') + 1, srcsetAttr.indexOf('"', (srcsetAttr.indexOf('"') +1 )));
                const srcsetAttrValueList = srcsetAttrValue.split(',');
                const imgUrl = srcsetAttrValueList[srcsetAttrValueList.length - 1].trim().split(' ')[0];
                // console.log(imgUrl);

                res.status(200).json({src: imgUrl});
                
                
            })
            .catch(error => {
                console.log(error);
                
            })
            
        }else{
            // tumblr api returns correctly but we couldn't obtain and image (this is considered as an error for our app)
            next(error);
        }
    })
    .catch(error => {
        next(error);
    })
    
}