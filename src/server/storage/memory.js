var boards = {};

function storeMessage(name, message, user) {
    if( !boards[name] ) {
        boards[name] = [];
    }

    var post = {};
    post.message = message;
    post.user = user;
    post.date = new Date();

    boards[name].push(post);

}

function getMessage(name, callback) {
    if( !boards[name] ) {
        callback(undefined, []);
        return;
    }
    callback(undefined, boards[name]);

}

exports.storeMessage = storeMessage;
exports.getMessage = getMessage;
