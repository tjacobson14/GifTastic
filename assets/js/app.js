var topics = ["Seinfeld", "Boy Meets World", "Fresh Prince", "The X-Files", "Full House", "Twin Peaks", "Doug", "Home Improvement", "Whose Line is it Anyway", "Family Matters", "Saved by the Bell", "Buffy", "Friends", "3rd Rock from the Sun", "Are You Afraid of the Dark?"];

$(document).on("click", ".topic", displayGIFs);

$(document).on("click", ".gif-image", toggleGIF);
$("#addButton").on("click", function(event) {
	event.preventDefault();
	var topicName = $("#topic-input").val().trim();
	if ((topics.indexOf(topicName) === -1) && (topicName !== '')) {
		topics.push(topicName);
	}
	$("#topic-input").val("");
	renderButtons();
});

function renderButtons() {
	$("#topicButtons").empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $("<button>");

		newButton.addClass("topic");

		newButton.attr("data-topic", topics[i]);

		newButton.text(capitalizeFirstLetter(topics[i]));

		$("#topicButtons").append(newButton);
	}
}

function displayGIFs() {
	$("#topics-container").empty();
	var API_KEY = "pvG3Nm3KBxYBhaW2SsTSTmr3yeiPq9KD"; 
	var limit = 10; 
	var queryTopic = $(this).attr("data-topic"); 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + queryTopic + "&api_key=" + API_KEY + "&limit=" + limit;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) { 

		for (var i = 0; i < response.data.length; i++) {
			var newDiv = $("<div>");
			var rating = response.data[i]["rating"];
			var stillImage = response.data[i]["images"]["fixed_height_still"]["url"];
			var gif = response.data[i]["images"]["fixed_height"]["url"];
			var imgCaption = capitalizeFirstLetter(response.data[i]["title"]);
			var gifDiv = $("<img>");

			gifDiv.attr("src", gif);
			gifDiv.attr("alt", imgCaption);
			gifDiv.addClass("gif-image");

			gifDiv.data("values", {
				"still-image": stillImage, 
				"gif": gif,
				"state": "still"
			});

			newDiv.append("<p>Rating: " + rating + "</p>");
			newDiv.append(gifDiv);
			newDiv.addClass("gifs");

			$("#topics-container").append(newDiv);
		}
	});
}

function toggleGIF() {
if ($(this).data().values.state === "still") {
		$(this).attr('src', $(this).data().values.gif);
		$(this).data().values.state = "moving";
	} 
	else if ($(this).data().values.state === "moving") {
		$(this).attr('src', $(this).data().values["still-image"]);
		$(this).data().values.state = "still";
	}
}

function capitalizeFirstLetter(string) {
  return string
}

$(document).on("mouseenter", ".topic", function() {
  playClip();
});

renderButtons();