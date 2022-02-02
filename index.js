const express = require("express");
const http = require("http");
const app = express();

var path = require("path");
var fs = require("fs");

app.get("/test", function(req,res){
    res.send("Welcome to routing test");
});

app.get("/user/:userid", function(req,res){
    var userId = parseInt(req.params.userid,10)
    console.log("User id is : " + userId);
    res.send("Welcom user " + userId);
})

app.use(function(req,res){
    res.status(404).send("Page not found");
})


app.listen(3000);