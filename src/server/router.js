function route(boards, pathname, request, response) {
    // check if pathname is to be handled
    if( boards[pathname] ) {
        var board = boards[pathname];
        switch(request.method) {
            case 'GET':
                board.getMessages(response);
                break;
            case 'POST':
                board.postMessage(request, response);
                break;
            case 'OPTIONS':
                response.writeHead(200, {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
                      "Access-Control-Allow-Credentials": false,
                      "Access-Control-Max-Age": '86400',
                      "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
                });
               response.end(); 
            default:
                response.writeHead(405, {"Content-Type": "text/plain"});
                response.write("405 Method not allowed");
                response.end();
        }
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
