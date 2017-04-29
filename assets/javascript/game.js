//Initial array to hold the characters
var characters = ["Cartman", "Doctor House", "Kevin Spacey", "Tyrion Lannister"];

//Function to render buttons on the screen. Panel will be cleared every time a button is added.
function renderButtons() {

        $("#buttonPanel").empty();
        $.each(characters,function(index,value) {
                    
          $('<input/>').attr({type: "button",class: "btn btn-info",value: value}).appendTo($("#buttonPanel")); 
          
          
          
        });

      }

$("#addMovie").on("click",function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var character = $("#topic").val().trim();

        // The movie from the textbox is then added to our array
        characters.push(character);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });
function displayGiphyInfo() {
        $("#giphyPanel").empty();
        
        $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=" + $(this)[0].value + "&limit=10&rating=pg&api_key=dc6zaTOxFJmzC",
        dataType: 'json',
        success: function(response){
            
           
            $.each(response["data"],function(index,value) {
                var gifDiv = $("<div class='item'>");
                var rating = value.rating;
                console.log(rating);
                var p = $("<p>").text("Rating: " + rating);
                console.log(p);
                


                var $giphyImage = $("<img class='img-responsive'>")
                                .attr({
                                        "src": value["images"]["fixed_height_still"].url,
                                        "data-animated": value["images"]["fixed_height"].url,
                                        "data-still": value["images"]["fixed_height_still"].url,
                                        "data-state": "stopAnimation"

                                    })
                gifDiv.prepend($giphyImage);
                gifDiv.prepend(p);                
                

                gifDiv.appendTo($("#giphyPanel"));    
            }); 

        }
    });

}
function startStopAnimation() {
    console.log($(this));
    //console.log($(this)[0].dataset["data-state"]);
    
    if ($(this)[0].dataset["state"]==="stopAnimation") {

        //Start Animation
        $(this)[0].dataset["state"] = "startAnimation";
        $(this)[0].src = $(this)[0].dataset["animated"];
    } else {
        //Stop Animation
        $(this)[0].dataset["state"] = "stopAnimation";
        $(this)[0].src = $(this)[0].dataset["still"];
    }
    
    }

$("#buttonPanel").on("click", ".btn", displayGiphyInfo);

$("#giphyPanel").on("click", ".img-responsive", startStopAnimation);


$(document).ready(function() {

    renderButtons();
});