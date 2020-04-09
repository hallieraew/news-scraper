var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/apiRoutes")(app);
require("./routes/axiosScrape")(app);
require("./routes/htmlRoutes")(app);


mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});