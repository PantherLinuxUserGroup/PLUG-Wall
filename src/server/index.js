var server = require('./server');
var router = require('./router');

var handle = {};

server.start(router.route, handle);
