(function(window) {

    var node;

    window.initBoard = function(id, feed) {

        node = document.getElementById(id);

        // check if valid DOM node
        if(!node) {
            throw new Error("[PLUG-Wall] Not a valid HTML element id");
        }

        node.className = "plug-board";

        node.appendChild(document.createTextNode("A post"));

    };

    function xhr(options , callback) {
        var req = new XMLHttpRequest();
        req.open(options.method, options.url, true);
        req.onload = callback;

        xhr.send(options.data);

    }


})(window);
