var moment = require('moment');

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
            return;
        }

        // Nasty cloning - Prevents global message data modification
        msgs=JSON.parse(JSON.stringify(messages));
        for (i = 0; i < msgs.length; i++)
        {
            msgs[i].date = moment(msgs[i].date).calendar();
        }

        var body = JSON.stringify(msgs);
        response.writeHead(200, {
                          'Content-Type': 'application/json',
                          'Content-Length': Buffer.byteLength(body),
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Headers': 'X-Requested-With'
                          });
        response.end(body);
    });
};

Board.prototype.postMessage = function(request, response) {
    var self = this;
    request.content = "";
    request.addListener("data", function(chunk) {
        request.content += chunk.toString();
    });

    request.addListener("end", function() {
	var msg;
        try {
            var post = JSON.parse(request.content);
        }catch(err) {
            console.error("Bad request:" + err);
            msg = '{"status":"error"}';
            response.writeHead(500, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(msg),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With'
            });
            response.end(msg);
            return;
        }

	if(!post.message) {
	    msg = '{"status":"error", "toString":"No message body found."}'
	    response.writeHead(400, {
		'Content-Type': 'application/json',
		'Content-Length': Buffer.byteLength(msg),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With'
	    });
	    response.end(msg);
	    return;
	}
        self.storage.storeMessage(self.name, post.message, post.user || "Anonymous");
        msg = '{"status": "success"}';
        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(msg),
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        });
        response.end(msg);
    });
}

module.exports = Board;
