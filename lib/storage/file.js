var fs = require('fs');
/*
 * Basic API for storing and retrieving posts in simple files
 */
function storeMessage(name, message, user) {

    getMessage(name, function(err, data) {
        if(err) {
          console.error("File error: " + err);
        }
        
        var post = {};
        post.message = message;
        post.user = user;
        post.date = new Date();
        data.push(post);

        fs.writeFile( name, JSON.stringify(data), 'utf8', function(err) {
            if(err) {
                console.error("File error: "  + err);
                return;
            }
            // Data was written
        });
    });


}

function getMessage(name, callback) {
    fs.readFile( name, 'utf8', function(err, data) {
        if(err) {
            if(err.errno = 34) {
                callback(undefined, []);
                return
            }
            callback(err);
            return;
        }
        callback(err, JSON.parse(data));
    });
}

exports.storeMessage = storeMessage;
exports.getMessage = getMessage;
