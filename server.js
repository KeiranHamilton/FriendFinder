var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

require("./app/routing/htmlroutes.js")(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./app/routing/htmlroutes.js")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
