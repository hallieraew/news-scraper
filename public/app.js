$.get("/api/articles", function(data) {

    for (var i = 0; i < data.length; i++) {

        var newRow = $("<div>").append(
            $("<h5>").text(data[i].headline),
            $("<p>").text(data[i].summary),
            $("<button>").addClass("saveIt btn-success mr-3").attr("data-id", data[i]._id).text("Save"),
            $("<a>").attr({
                "href": "https://www.nytimes.com" + data[i].link,
                "target": "_blank"
            })
            .text("Read Full Article")
        );

        $("#articleCard").append(newRow);
        $("#articleCard").append("<hr>");
    }
});

$("#new").click(function() {
    console.log("clicked");
    $.get("/api/scraped", function(data) {

        for (var i = 0; i < data.length; i++) {

            var newRow = $("<div>").append(
                $("<h5>").text(data[i].headline),
                $("<p>").text(data[i].summary),
                $("<button>").addClass("saveIt btn-success mr-3").attr("data-id", data[i]._id).text("Save"),
                $("<a>").attr({
                    "href": "https://www.nytimes.com" + data[i].link,
                    "target": "_blank"
                })
                .text("Read Full Article")
            );

            $("#articleCard").append(newRow);
            $("#articleCard").append("<hr>");
        }

    });

});


$("#articleCard").on("click", ".saveIt", function() {
    console.log("clicked");
    var id = $(this).data("id")
    console.log(id)
    $.ajax({
        url: "/api/saved/" + id,
        method: "PUT",
        success: function(data) {
            console.log(data);
        }
    })
});