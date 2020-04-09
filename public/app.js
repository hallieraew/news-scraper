$("#new").click(function() {
    console.log("clicked");
    $.get("/api/articles", function(data) {

        for (var i = 0; i < data.length; i++) {

            var newRow = $("<div>").append(
                $("<h5>").text(data[i].headline),
                $("<p>").text(data[i].summary),
                $("<button>").addClass("mr-3 btn-success saveIt").text("Save")
                // need to add in links for Read full article :D 
            );
            $("#article").append(newRow);

        }
    });
});

$(".saveIt").click(function() {
    console.log("clicked");

    $.get("/saved/:id", function(req, res) {
        var saved = req.params.id;

        db.Article.findOneAndUpdate({ _id: saved }, { "saved": true }), (function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result)
            }
        })
    })
});