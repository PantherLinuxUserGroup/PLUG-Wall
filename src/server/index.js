var server = require('./server');
var router = require('./router');
var board = require('./board');

// handle the board
var handle = {};
handle['/board/'] = board.handler; 

server.start(router.route, handle);
