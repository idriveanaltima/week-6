
 var plants = ["anenome","maple tree","spring"];
 var input = $("#input").val().trim();



for(var i =0; i < plants.length; i++) {
   var plantButton = $("<button>");
   plantButton.append(plants[i]);
   plantButton.attr("data-value", plants[i]);
  $("#images").prepend(plantButton);
};


$("#images").on("click", "button", function() {

  var imageInput = $(this).attr("data-value")
  console.log(imageInput)
      // setting a variable for the api
     
      var queryURL = "https://api.giphy.com/v1/gifs/random?tag=" + imageInput + "&api_key=dc6zaTOxFJmzC" ;
      console.log(queryURL)

      //creating the request to get data from the api
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      //the part that handles the response
        .then(function(response) {

          var imageUrl = response.data.image_original_url;
          var springImage = $("<img>");
          springImage.attr("src", imageUrl);
          springImage.attr("alt", "cat image");
          $("#images").prepend(springImage);
        });
    });

    // -----------

    // $("#images").on("click", function() {

    //   // setting a variable for the api
     
    //   var queryURL = "https://api.giphy.com/v1/gifs/random?" + "api_key=dc6zaTOxFJmzC&tag" +  "q=" + input;
    //   console.log(queryURL)

    //   //creating the request to get data from the api
    //   $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   })

    //   //the part that handles the response
    //     .then(function(response) {

    //       var imageUrl = response.data.image_original_url;
    //       var springImage = $("<img>");
    //       springImage.attr("src", imageUrl);
    //       springImage.attr("alt", "cat image");
    //       $("#images").prepend(springImage);
    //     });
    // });