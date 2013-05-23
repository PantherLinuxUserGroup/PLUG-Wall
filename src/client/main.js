(function(window) {

    var node;

    window.initBoard = function(id, feed) {

        node = document.getElementById(id);

        // check if valid DOM node
        if(!node) {
            throw new Error("[PLUG-Wall] Not a valid HTML element id");
        }

        node.className = "pBoard";

        node.appendChild(document.createTextNode("A post"));

    };


})(window);
