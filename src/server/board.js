function handler(request, response) {
    switch(request.method) {
        case 'POST':
            //Handle a message post
            break;
        case 'GET':
            // Retrieve messages
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end("GET request");
            break;
    }
}

exports.handler = handler;
