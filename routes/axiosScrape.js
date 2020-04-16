var axios = require("axios");
var cheerio = require("cheerio");



module.exports = function() {

    return axios.get("https://www.nytimes.com").then(function(response) {

        var $ = cheerio.load(response.data);

        var newArticle = [];

        $("article").each(function(i, element) {

            var headline = $(element).children().find("h2").text();

            var link = $(element).children().find("a").attr("href");

            var summary = $(element).children().find("p").text();

            if (headline && link && summary) {

                newArticle.push({
                    headline, link, summary
                })
            };
        })
        return newArticle;
    })
}