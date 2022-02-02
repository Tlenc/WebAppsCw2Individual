var express = require("express");
var app = express();
app.get("/random/:min/:max"
, function(req, res) { // take two parameters
var min = parseInt(req.params.min);
var max = parseInt(req.params.max);
// return an error if either is not a number
if (isNaN(min) || isNaN(max)) {
res.status(400);
res.json({ error: "Bad request." });
return;
}
// calculate and send back the result
var result = Math.round((Math.random() * (max - min)) + min);
res.json({ result: result });
});
app.listen(3000, function() {
console.log("Random number API started on port 3000");
});
