var redis = require("redis");
var client = redis.createClient();

function storeMessage(name, message, user) {
    var post = {};
    post.message = message;
    post.user = user;
    post.date = new Date();

    client.type(name, function(error, type) {
        if (type != "list") client.del(name);
        client.rpush(name, JSON.stringify(post));
    });

}

function getMessage(name, callback) {
    var posts = [];
    client.lrange(name, 0, -1, function (error, items) {
        if (!error) {
            for (var i = 0; i < items.length; i++) {
                posts[i] = JSON.parse(items[i]);
            }
        }
        callback(undefined, posts);
    });

}

exports.storeMessage = storeMessage;
exports.getMessage = getMessage;

