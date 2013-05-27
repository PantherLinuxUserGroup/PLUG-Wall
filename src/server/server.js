var http = require('http');
var url = require('url');

function start(route, boards, port) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;

        route(boards, pathname, req, res);
    }

    http.createServer(onRequest).listen(port);

    console.log("Server is running on http://0.0.0.0:" + port + "/");
}

exports.start = start;
