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

require("./routes/apiRoutes.js");
require("./routes/htmlRoutes");

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

axios.get("https://www.nytimes.com").then(function(response) {

    var $ = cheerio.load(response.data);

    $("article").each(function(i, element) {


        var headline = $(element).children().find("h2").text();

        var link = $(element).children().find("a").attr("href");

        var summary = $(element).children().find("p").text();

        if (headline && link && summary) {

            db.Article.create({
                    headline: headline,
                    link: link,
                    summary: summary
                },
                function(err, inserted) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(inserted);
                    }
                });
        };
    })
});

app.get("/articles", function(req, res) {

    db.Article.find({}, function(error, found) {
        if (error) {
            console.log(error);
        } else {
            res.json(found);
        }
    });
});


// app.get("/articles", function(req, res) {

//     db.Article.create(result)
//         .then(function(dbArticle) {
//             // View the added result in the console
//             console.log(dbArticle);
//         })
//         .catch(function(err) {
//             // If an error occurred, log it
//             console.log(err);
//         });

//     res.send("complete");
// })



// app.get("/saved", function(req, res) {
//     db.articles.find({})

//     .populate("comments")

//     .then(function(dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function(err) {
//             res.json(err);

//         })
// });

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});