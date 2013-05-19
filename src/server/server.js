var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;

        route(handle, pathname, req, res);
    }

    http.createServer(onRequest).listen(1337);
}

exports.start = start;
console.log("Server is running");
