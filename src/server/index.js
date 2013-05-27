var server = require('./server');
var router = require('./router');
var board = require('./board');
var config = require('./config.json');

// handle the board
var handle = {};

for (var i = 0; i < config.boards.length; i++) {
    handle[config.boards[i]] = board.handler;
}

server.start(router.route, handle, config.port);
