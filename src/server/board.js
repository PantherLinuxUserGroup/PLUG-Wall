/*
 * Board constructor
 */
function Board(name, config) {

    //initialize board and posts
    this.name = name;
    this.config = config;

}

Board.prototype.getMessages = function(response) {
    // Retrieve messages
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("GET request");
};

Board.prototype.postMessage = function(request, response) {

}

module.exports = Board;
