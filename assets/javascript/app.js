$(document).ready(function(){

    var topics = ["friends", "two and a half man", "lost", "heroes", "daredevil"];

    function displayButtons() {
    
       function createButtons(topic) {
        var buttons = `
        <button>${topic}</button>
        `
    };

    $("#results-view").html(topics.map(createButtons));


    }


    


    $("#form-button").on("click", function(){

        event.preventDefault();

    })

displayButtons();
})