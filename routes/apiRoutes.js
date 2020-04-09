var db = require("../models");
var mongoose = require("mongoose");

module.exports = function(app) {

    app.get("/api/articles", function(req, res) {

        db.Article.find({}, function(error, found) {
            if (error) {
                console.log(error);
            } else {
                res.json(found);
            }
        });
    });

    app.get("/api/saved", function(req, res) {
        db.Article.find({})

        .populate("comments")

        .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);

            })
    });


    app.post("/saved/:id", function(req, res) {
        var saved = req.params.id;

        db.Article.findOneAndUpdate({ _id: saved }, { "saved": true }), (function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result)
            }
        })
    })
}