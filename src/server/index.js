var server = require('./server');
var router = require('./router');
var Board = require('./board');
var config = require('./config.json');

var boards = {};

for (var i = 0; i < config.boards.length; i++) {
    boards[config.boards[i]] = new Board();
}

server.start(router.route, boards, config.port);
