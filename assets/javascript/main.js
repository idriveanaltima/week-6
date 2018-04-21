$(document).ready(function () {
//declaring the plants array with intial values
  var plants = ["anenome", "tree", "tulips", "geranium", "crocus"];

  //creating a function to add buttons based on the number of plants in the array
  function addButton() {
    $("#imageButton").empty();
    for (var i = 0; i < plants.length; i++) {
      var plantButton = $("<button>");
      plantButton.append(plants[i]);
      plantButton.attr("data-value", plants[i]);
      $("#imageButton").prepend(plantButton);
    };
  };
//on click function that generates the request/response from giphy and displays the images on the screen
  $("#imageButton").on("click", "button", function () {

    var imageInput = $(this).attr("data-value")
    console.log(imageInput)
    // setting a variable for the api

    var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + imageInput + "&api_key=dc6zaTOxFJmzC";
    console.log(queryURL)

    //creating the request to get data from the api
    $.ajax({
        url: queryURL,
        method: "GET"
      })

      //the part that handles the response
      .then(function (response) {
        console.log(response)

        var imageUrl = response.data.image_original_url;
        var stillImageUrl = response.data.fixed_height_small_still_url;
        var springImage = $("<img>");
        springImage.attr("src", stillImageUrl);
        springImage.attr("data-still", stillImageUrl);
        springImage.attr("data-animate", imageUrl);
        springImage.attr("data-status", "still");
        springImage.attr("alt",  "giphy image");
        $("#images").prepend(springImage);
      });
  });



  $("body").on("click", "#search", function () {
    // setting a variable for the api

    var input = $("#input").val().trim();
    plants.push(input);
    addButton();
  }).on("click" , "img", function () {
    var status = $(this).attr("data-status");
     if(status === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-status", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-status", "still");
    }

     });
  addButton();
});