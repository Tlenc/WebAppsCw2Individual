var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/static'));

const url = "mongodb+srv://Tadas:darkness0@cluster0.ueekk.mongodb.net/test?authSource=admin&replicaSet=atlas-1467xl-shard-0&readPreference=primary&appname=MongoDB+Compass&ssl=true";

app.use(function(req, res, next) {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
  next();
});

app.use(function(req, res, next) {
  // allow different IP address
  res.header("Access-Control-Allow-Origin"
  ,
  "*");
  // allow different header fields
  res.header("Access-Control-Allow-Headers"
  ,
  "*");
  next();
  });
  
app.route('/').get( function(req, res){
  res.send("test");
});



app.route('/lesson').get( function(req, res)


    {
        MongoClient.connect(url, function(err, db) {
 
            var dbo = db.db("WebAppCw2");
           
            dbo.collection("lesson ").find({}).toArray(function(err, result) {
              if (err) throw err;
      
              res.send(result);
              db.close();
            });
          });
    });


    app.use(function(req, res) {
      res.status(404).send("Page not found!");
  });
  

app.listen(port);