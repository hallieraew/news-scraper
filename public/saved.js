$.get("/api/saved", function(data) {

    for (var i = 0; i < data.length; i++) {

        var newRow = $("<div>").append(
            $("<h5>").text(data[i].headline),
            $("<p>").text(data[i].summary),
            $("<a>").attr({
                "href": "https://www.nytimes.com" + data[i].link,
                "target": "_blank"
            }).text("Read Full Article")
        );
        $("#articleCard").append(newRow);
        $("#articleCard").append("<br>");
        $("#articleCard").append($("<button>").addClass("commentIt btn-success mr-3").attr("data-id", data[i]._id).text("Article Notes"));
        $("#articleCard").append($("<button>").addClass("ml-3 btn-danger").attr("data-id", data[i]._id).text("Remove"));
        $("#articleCard").append("<hr>");
    }
});

$("#articleCard").on("click", ".commentIt", function() {
    $("#comments").modal("show")
    var id = $(this).data("id")
    $("#addNote").attr("data-id", id)
});

$("#addNote").on("click", function() {
    console.log("clicked");
    var id = $(this).data("id");
    var body = $(".noteBody").val();
    console.log(body)
    console.log(id)
    $.ajax("/api/comment/" + id, {
        id_: id,
        data: { body },
        method: "POST",
        success: function(data) {
            console.log(data);
        }
    })
});