$(document).ready(function() {

    var topics = ["friends", "two and a half man", "lost", "heroes", "daredevil"];
    
    
    function displayButtons() {

        function createButtons(topicName) {
            return `
            <button class="searchTopic">${topicName}</button>
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

    displayButtons();

})