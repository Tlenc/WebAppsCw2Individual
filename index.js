var http = require("http");

function requesthandler( req, res){
    console.log("Req to : " + req.url);
    res.end("Hello");
}

var server = http.createServer(requesthandler);
server.listen(3000);