$(document).ready(function () {
  //declaring the plants array with intial values
  var plants = ["rose", "tulips", "geranium", "crocus", "pansy",];

  //creating a function to add buttons based on the number of plants in the array
  function addButton() {
    $("#imageButton").empty();
    for (var i = 0; i < plants.length; i++) {
      var plantButton = $("<button>");
      plantButton.append(plants[i]);
      plantButton.attr("data-value", plants[i]);
      plantButton.addClass("btn btn-lg btn-outline-primary m-2");
      $("#imageButton").append(plantButton);
    };
  };

  $("#imageButton").on("click", "button", function () {
    var imageInput = $(this).attr("data-value");
    // setting a variable for the api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + imageInput + "&api_key=dc6zaTOxFJmzC" + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET",
      })
      .then(function (response) {
       
        for (i = 0; i < response.data.length; i++) {
          var imageUrl = response.data[i].images.fixed_height_small.url;
          var stillImageUrl = response.data[i].images.fixed_height_small_still.url;
          var rating = response.data[i].rating.toUpperCase();
          var title = response.data[i].title;
          if(rating == "PG" || rating == "G") {       
          var springImage = $("<img>");
          springImage.addClass("img img-thumbnail");
          springImage.attr({
            src: stillImageUrl,
            alt: title,
            "data-still": stillImageUrl,
            "data-animate": imageUrl,
            "data-status": "still",
            "width": "100px",
          });
          var newDiv = $("<div class='imgBox p-3 m-3'>");
          var titleSpan = $("<span>");
          var ratingSpan = $("<span>");
          ratingSpan.css({
                "display": "block",  
          });
          newDiv.css({
                "width": "auto",
                "height": "auto",
                "float": "left",
                "border": "2px solid black"
          });
          newDiv.prependTo("#images")
          ratingSpan.prependTo(newDiv);
          titleSpan.prependTo(newDiv);
          ratingSpan.prepend("Rating: " + rating);
          titleSpan.prepend(title);
          newDiv.append(springImage);          
        }{
        };
      };
      });
  });
  $("body").on("click", "#add", function () {
    var input = $("#input").val().trim();
    if (plants.indexOf(input) == -1) {
    plants.push(input);
    addButton();
    }{
    };
   }).on("click", "img", function () {
    var status = $(this).attr("data-status");
    if (status === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-status", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-status", "still");
    }
  });

  //calling the function to add Buttons on page load
  addButton();
});