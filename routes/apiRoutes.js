var db = require("../models");
var mongoose = require("mongoose");

module.exports = function(app) {

    app.get("/api/articles", function(req, res) {

        db.Article.find({}).sort({ createdAt: 1 }).then(function(found) {
            res.json(found)
        }).catch(function(err) {
            res.json(err)
        });
    });

    // set new api route here for scraped articles and call scrape function

    app.get("/api/saved", function(req, res) {
        db.Article.find({ "saved": true }).sort({ updatedAt: 1 })

        .populate("comments")

        .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);

            })
    });


    app.put("/api/saved/:id", function(req, res) {
        var saved = req.params.id;
        console.log(saved);
        db.Article.findOneAndUpdate({ _id: saved }, { "saved": true }, { new: true }).then(function(result) {
            res.json(result)
            console.log(result);
        }).catch(function(err) {
            res.json(err);
            console.log(err);
        })
    })

    app.post("/api/comment", function(req, res) {

        var newNote = req.body;

        db.Comment.create({
                title: title,
                body: body,
            },
            function(err, inserted) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(inserted);
                }
            });
    })
}