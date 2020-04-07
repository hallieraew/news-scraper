$("#new").click(function() {
    console.log("clicked");
    $.get("/articles", function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            $("#article").append("<h5>" + data[i].headline + "<br />" + data[i].link + "</h5>");
            // $("#summary").append(data[i].summary);
        }
    });
});