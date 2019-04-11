$(document).ready(function() {

    //This is the array that will create the initial buttons.
    var topics = ["friends", "two and a half man", "lost", "heroes", "daredevil"];
    
    //This function will display all the buttons on the page.
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

    //This on click function will search the Giphy API for gifs related to the topic selected by the user and will then display 10 results on the page.
    $(document).on("click", ".searchTopic", function() {

        var topic = $(this).data("id");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=9VCJsnqi1AU2pxpJjc0IDYjl4enhvjWQ&q=" + topic + "&limit=10"

        function makeResultsDiv(obj) {
            
            return `
                <div class="text-center searchResult">
                <img src="${obj.images.fixed_width_still.url}" data-still="${obj.images.fixed_width_still.url}" data-animate="${obj.images.fixed_width.url}" data-state="still">
                <p class="gifRating">Rating: ${obj.rating}</p>
                </div>
                `

        };
        
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

        } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        };

    })

    //This function will display the initial buttons on the page as soon as the page loads.
    displayButtons();

})