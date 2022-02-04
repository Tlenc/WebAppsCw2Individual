var express = require('express');
var app = express();
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.use(cors());
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
const url = "mongodb+srv://Tadas:darkness0@cluster0.ueekk.mongodb.net/test?authSource=admin&replicaSet=atlas-1467xl-shard-0&readPreference=primary&appname=MongoDB+Compass&ssl=true";

app.use(function(req, res, next) {
  console.log("Request IP: " + req.url);
  console.log("Request date: " + new Date());
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

    app.post('/order', function requestHandler(req, res) {
      console.log('Post recieved');
      console.log(req.body);
      MongoClient.connect(url, function(err, db) {
 
        var dbo = db.db("WebAppCw2");
       
        dbo.collection("order").insertOne( req.body, function(err, result) {
          if (err) throw err;
          db.close();
        res.json({
        status: 'Success'
      })
      });

      
      })});
      app.put('/update', function requestHandler(req, res) {
        console.log('Put recieved');
        console.log(req.body);
        
        MongoClient.connect(url, function(err, db) {

          var dbo = db.db("WebAppCw2");
          var ObjectId = require('mongodb').ObjectID;

          var query = { _id :ObjectId(req.body.lessonId) };
       
          var data = { $set : {space : req.body.space } }
        
          dbo.collection("lesson ").updateOne(query,data, (err, collection) => {
          if (err) throw err;
          console.log("Record updated successfully");
          console.log(collection);
          db.close();
          res.json({
          status: 'Success'
        })
      });


     

      
      })});
     app.use(function(req, res) {
      res.status(404).send("Page not found!");
  });
  

app.listen(port);