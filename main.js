(function(window) {

    var node,
        url;
    var headerNode = document.createElement("div");
    var postsNode = document.createElement("div");
    var form = document.createElement("div");
    var topCon = document.createElement("div");
    var botCon = document.createElement("div");
    var label = document.createElement("label");
    var errorLabel = document.createElement("div");
    var username = document.createElement("input");
    var text = document.createElement("textarea");
    var send = document.createElement("button");

    headerNode.className = "plug-header";
    postsNode.className = "plug-posts";
    form.className = "plug-form";
    username.className = "plug-name";
    text.className = "plug-text";
    send.className = "plug-button";
    errorLabel.className = "plug-error";

    label.appendChild(document.createTextNode("Name:"));
    send.appendChild(document.createTextNode("Send"));

    topCon.appendChild(label);
    topCon.appendChild(username);
    topCon.appendChild(text);
    topCon.appendChild(errorLabel);

    botCon.appendChild(send);

    form.appendChild(topCon);
    form.appendChild(botCon);

    send.onclick = sendPost;


    window.initBoard = function(id, feed) {

        node = document.getElementById(id);
        url = feed;

        // check if valid DOM node
        if(!node) {
            throw new Error("[PLUG-Wall] Not a valid HTML element id");
        }

        var splitUrl = feed.split('/');
        var name = document.createElement("h1");
        name.appendChild(document.createTextNode("#" + splitUrl[splitUrl.length - 1]));


        node.className = "plug-board";

        headerNode.appendChild(name);

        node.appendChild(headerNode);
        node.appendChild(postsNode);
        node.appendChild(form);
        postsNode.appendChild(document.createTextNode("No posts yet!"));

        getPosts();
    };

    function getPosts() {
        xhr({
            method: 'GET',
            url: url
        }, handleResponse);
    }


    function handleResponse(xhr) {
        var posts = JSON.parse(xhr.responseText);
        createPosts(posts);
    }

    function createPosts(posts) {
        var post;
        postsNode.innerHTML = "";

        for(var i = posts.length - 1; i >= 0; i--){
            post = document.createElement("div");
            var body = document.createElement("div");
	    var info = document.createElement("div");
            var user = document.createElement("span");
            var date = document.createElement("span");

            post.className = "plug-post";
            body.className = "plug-post-body";
	    info.className = "plug-post-info";
            user.className = "plug-post-user";
            date.className = "plug-post-date";

            body.appendChild(document.createTextNode(posts[i].message));
            user.appendChild(document.createTextNode(posts[i].user));
            date.appendChild(document.createTextNode(posts[i].date));

	    info.appendChild(user);
	    info.appendChild(date);

            post.appendChild(body);
	    post.appendChild(info);

            postsNode.appendChild(post);
        }

    }

    function sendPost() {
        var data = {};
        data.user = username.value;
        data.message = text.value;

	if(data.message == null || data.message.trim() == "") {
	    errorLabel.innerHTML = "";
	    errorLabel.appendChild(document.createTextNode("Posts must have a message."));
	}else {
	    errorLabel.innerHTML = "";
	    username.value ="";
	    text.value = "";
            xhr({
		method: "POST",
		url: url,
		data: JSON.stringify(data)
            }, function() { getPosts(); });
	}
    }

    function xhr(options , callback) {
        var req = new XMLHttpRequest();
        req.open(options.method, options.url, true);
        req.onreadystatechange = function() {
            if(req.readyState == 4) {
              if( req.status == 200) {
                  callback(req);
              }else {
                  //Some error
              }
            }
        }
        req.send(options.data);

    }


})(window);
