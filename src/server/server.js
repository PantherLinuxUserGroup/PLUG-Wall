var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;

        route(handle, pathname, req, res);
    }

    var port = 1337;
    http.createServer(onRequest).listen(port);

    console.log("Server is running on http://0.0.0.0:" + port + "/");
}

exports.start = start;
