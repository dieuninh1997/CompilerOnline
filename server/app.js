var express =require("express");
var app = express();
var path = require("path");
var server = require("http").createServer(app);
server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    // res.send("<font color=red>Hello world</font>");
    res.sendFile(__dirname + "/views/demo.html");
 
})
