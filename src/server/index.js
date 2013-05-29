var server = require('./server');
var router = require('./router');
var Board = require('./board');
var storageFactory = require('./storage');
var config = require('./config.json');

var boards = {};

for (var i = 0; i < config.boards.length; i++) {
    var storage = storageFactory[config.boards[i].storage];
    boards[config.boards[i].name] = new Board(config.boards[i].name, storage);
}

server.start(router.route, boards, config.port);
