$(document).ready(function() {

    var topics = ["friends", "two and a half man", "lost", "heroes", "daredevil"];
    
    
    function displayButtons() {

        function createButtons(topicName) {
            return `
            <button class="searchTopic" data-id="${topicName}">${topicName}</button>
            `
        };

        $("#buttons-view").html(topics.map(createButtons));


    }


    $("#form-button").on("click", function(){

        event.preventDefault();

        var userInput = $("#gif-search").val();
        topics.push(userInput);
        displayButtons();

    })

    

    $(document).on("click", ".searchTopic", function() {

        var topic = $(this).data("id");
        var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=9VCJsnqi1AU2pxpJjc0IDYjl4enhvjWQ&q=" + topic + "&limit=10"

        function makeResultsDiv(obj) {
            return `
            <div>
            <img src="${obj.images.original_still.url}" data-still="${obj.images.original_still.url}" data-animate="${obj.url}" data-state="still">
            <p>Rating: ${obj.rating}</p>
            </div>
            `
        }
        
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
  

            $("#results-view").html(response.data.map(makeResultsDiv));


          });

    });

    displayButtons();

})