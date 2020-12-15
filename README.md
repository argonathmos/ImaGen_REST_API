# ImaGen_REST_API

## Node.js / Express REST API
This API uses: 
### Public APIs
- PIXABAY API: https://pixabay.com/api/docs/
- TUMBLR API: https://www.tumblr.com/docs/en/api/v2

### NPM packages
- tumblr.js: (client for the api) https://www.npmjs.com/package/tumblr.js- 
- duckduckgo-images-api: https://www.npmjs.com/package/duckduckgo-images-api

## Three endpoints (GET only):
 - /pixabay
 - /duckduckgo
 - /tumblr
 
Ex: https://imagen-rest-api.herokuapp.com/pixabay?q=mountain

### Returns:
`
{ src: 'https://pixabay.com/get/55e5d4414c54b10ff3d8992cc620327d133ddfe24e5077497d2f78d3934cc4_640.jpg' }
`
### Error Handling:
` 
{error: 
	{
		status: 404 ,
		message: "Endpoint Not Found! Please refer to API documentation for valid enpoint." 
	}

}
`

I am hosting the API on heroku to power some demo projects. 
You can use it for testing and learning purposes, be aware that with heroku free tier, the app goes to sleep :sleeping: if not active so it takes a while on the first request to wake it up. 
Please also be mindful of rate limits. 
If you intend to use this api in your own project, copy the code, get your personal API keys for pixabay and tumblr and host it where you want !  :cowboy_hat_face: 	
