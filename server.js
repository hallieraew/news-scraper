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

    axios.get("https://www.nytimes.com/section/world").then(function(response) {

        var $ = cheerio.load(response.data);

        $("li").each(function(i, element) {

            var result = {};

            result.headline = $(this).find("h2").text();

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

app.get("/saved", function(req, res) {
    db.articles.find({})

    .populate("comments")

    .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        })
});