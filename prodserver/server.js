const compression = require('compression');
const express = require('express');
const path = require('path');

const shouldCompress = function(request, response) {
  if (request.header['x-no-compression']) { return false; }
  return compression.filter(request, response)
}

const forceSSL = function(request, response, next) {
  if (request.headers['x-forwarded-proto'] !== 'https') {
    return response.redirect(
      ['https://', request.get('Host'), request.url].join('')
    );
  }
  next();
}

const wwwRedirect = function(request, response, next) {
  if (request.headers.host.slice(0, 4) === 'www.') {
    var newHost = request.headers.host.slice(4);
    return response.redirect(301, request.protocol + '://' + newHost + request.originalUrl);
   }
   next();
}

var app = express();

app.set('trust proxy', true);
app.use(wwwRedirect);
app.use(forceSSL);
app.use(compression({filter: shouldCompress}));

app.use(express.static(__dirname));
app.get('/*', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'));
});

var port = process.env.PORT || 8888;

app.listen(port);

console.log("Serving from port", port)
