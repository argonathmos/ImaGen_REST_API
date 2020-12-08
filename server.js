const http = require('http');
const app = require('./app');

const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

const server = http.createServer(app); // createServer() takes a request listener as an argument: a function that will execute for every incoming requests.
server.on('error', serverErrorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address: 'port ' + port;
    console.log('Listening on ' + bind);
});
server.listen(port);

/* Normalize a port into a number, string, or false */

function normalizePort(val) {
    let port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
        return val;
    }
  
    if (port >= 0) {
      // port number
        return port;
    }
  
    return false;
};

/* Event listener for HTTP server "error" event */
function serverErrorHandler(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
};
