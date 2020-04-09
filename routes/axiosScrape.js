var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function() {

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
}