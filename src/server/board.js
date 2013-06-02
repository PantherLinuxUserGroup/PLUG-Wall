/*
 * Board constructor
 */
function Board(name, storage, config) {

    //initialize board and posts
    this.name = name;
    this.storage = storage;
    this.config = config;

}

Board.prototype.getMessages = function(response) {
    // Retrieve messages
    this.storage.getMessage(this.name, function(err, messages) {
        if( err ) {
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.end("ERROR 500");
        }
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(messages));
    });
};

Board.prototype.postMessage = function(request, response) {
    var self = this;
    request.content = "";
    request.addListener("data", function(chunk) {
        request.content += chunk.toString();
    });

    request.addListener("end", function() {
        try {
            var post = JSON.parse(request.content);
        }catch(err) {
            console.error("Bad request:" + err);
            return;
        }
        self.storage.storeMessage(self.name, post.message, post.user);
    });

}

module.exports = Board;
