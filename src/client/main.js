(function(window) {

    var node;

    window.initBoard = function(id, feed) {

        node = document.getElementById(id);

        // check if valid DOM node
        if(!node) {
            throw new Error("[PLUG-Wall] Not a valid HTML element id");
        }

        node.className = "plug-board";

        xhr({
              method: 'GET',
              url: feed
            }, handleResponse);

    };
    
    function handleResponse(response) {
        var posts = response;
    }

    function xhr(options , callback) {
        var req = new XMLHttpRequest();
        req.open(options.method, options.url, true);
        req.onload = callback;

        req.send(options.data);

    }


})(window);
