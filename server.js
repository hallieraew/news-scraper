var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Require all models
var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes

app.get("/scrape", function(req, res) {

    axios.get("https://www.nytimes.com/section/us").then(function(response) {

        var $ = cheerio.load(response.data);

        $("h2").each(function(i, element) {

            var result = {};

            result.headline = $(this).find("a").text();

            result.link = $(this).children().find("a").attr("href");

            result.summary = $(this).children().find("p").text();
            console.log(result);

            db.Article.create(result)
                .then(function(dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        res.send("complete");
    })
})