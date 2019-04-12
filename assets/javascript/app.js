$(document).ready(function() {

    //This is the array that will create the initial buttons.
    var topics = ["friends", "two and a half man", "lost", "heroes", "daredevil"];
    
    //This function will create and display all the buttons on the page.
    function displayButtons() {

        function createButtons(topicName) {
           
            return `
                <button class="searchTopic btn btn-info" data-id="${topicName}">${topicName}</button>
                `
        
        };

        $("#buttons-view").html(topics.map(createButtons));

    }

    //This on click function will add a new search topic to the array and will then re-create the buttons on the page.
    $("#form-button").on("click", function(){

        event.preventDefault();

        var userInput = $("#gif-search").val();
        topics.push(userInput);
        displayButtons();

    })

    //This function will create the div that will contain each image/gif and its rating.
    function makeResultsDiv(obj) {
            
        return `
            <div class="text-center searchResult">
            <img src=${obj.images.fixed_width_still.url} data-still=${obj.images.fixed_width_still.url} data-animate=${obj.images.fixed_width.url} data-state="still">
            <p class="gifRating" data-rating=${obj.rating}>Rating: ${obj.rating}</p>
            </div>
            `

    };

    //This on click function will search the Giphy API for gifs related to the topic selected by the user and will then display 10 results on the page.
    $(document).on("click", ".searchTopic", function() {

        var topic = $(this).data("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9VCJsnqi1AU2pxpJjc0IDYjl4enhvjWQ&q=" + topic + "&limit=10"

        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            $("#results-view").html(response.data.map(makeResultsDiv));

        });

    })

    //This function will switch the images between still images and gifs as the user clicks them.
    $(document).on("click", "img", function(){

        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            $(this).css({
                "width": 400, "height": 400
            })

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            $(this).css({
                "width": 200, "height": 206
            })

        };

    })

    //If the user right-clicks an image, a prompt will show up and ask if that image should be added to the Favorites section.
    $(document).on("contextmenu", ".searchResult", function(){

        var favoriteGif = confirm("Would you like to add this gif as a favorite?");
            
        if (favoriteGif) {

            //    $(this).appendTo($("#favorites"));
            var stillURL = $(this).children("img").data("still");
            var animateURL = $(this).children("img").data("animate");
            var rating = $(this).children("p").data("rating");
            var favoriteArr = [];
            var favoriteImgObj = {
                images: {
                    fixed_width: {
                        url: animateURL
                    },
                    fixed_width_still: {
                        url: stillURL
                    }
                },
                rating: rating
            }
           
            if (localStorage.getItem('myFavorites')) {

                favoriteArr = JSON.parse(localStorage.getItem('myFavorites'));
            
            };

            favoriteArr.push(favoriteImgObj);

            localStorage.setItem('myFavorites', JSON.stringify(favoriteArr));

            obtainLocalStorage();
           
        };

   });

   //This function will obtain the localStorage and make sure that the Favorites section is populated (if there's anything in local storage)
   function obtainLocalStorage() {

        var favoriteArr = [];
    
        if (localStorage.getItem('myFavorites')) {
            favoriteArr = JSON.parse(localStorage.getItem('myFavorites'));
        };

        if (favoriteArr.length > 0) {

            $("#favorites").empty();

            for (var i = 0; i<favoriteArr.length ; i++) {

                $("#favorites").append(makeResultsDiv(favoriteArr[i]));
            
            };
        };
  
    }

    //These functions will display the initial buttons on the page as soon as the page loads, as well as obtain the local storage (if any).
    displayButtons();
    obtainLocalStorage();

})