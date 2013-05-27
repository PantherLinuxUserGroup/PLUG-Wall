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
        }
    } else {
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route = route;
