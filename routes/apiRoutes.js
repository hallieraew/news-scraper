var db = require("../models");
var mongoose = require("mongoose");
// var axiosScrape = require("./axiosScrape");

module.exports = function(app) {

    app.get("/api/articles", function(req, res) {

        db.Article.find({}).sort({ createdAt: -1 }).then(function(found) {
            res.json(found)
        }).catch(function(err) {
            res.json(err)
        });
    });

    app.get("/api/scraped", function(req, res) {
        db.Article.find({}).sort({ createdAt: -1 }).then(function(found) {
            res.json(found)
        }).catch(function(err) {
            res.json(err)
        });
    });


    app.get("/api/saved", function(req, res) {
        db.Article.find({ "saved": true }).sort({ updatedAt: -1 })

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

    app.post("/api/comment/:id", function(req, res) {

        var newNote = req.body;
        var id = req.params.id;
        console.log(req.body)
        db.Comment.create(newNote).then(function(dbComment) {
                return db.Article.findOneAndUpdate({ _id: id }, { comment: dbComment._id }, { new: true });
            }).then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });
}