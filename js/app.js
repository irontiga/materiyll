function materialInit(){
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,
		constrain_width: false, // Does not change width of dropdown to that of the activator
		hover: false, // Activate on hover
		gutter: 0, // Spacing from edge
		belowOrigin: true, // Displays dropdown below the button
		alignment: 'right' // Displays dropdown with edge aligned to the left of button
	}
								  );
};

$(document).ready(function(){
	materialInit();
});

$(document).on("click", ".internal-link", function(e){
	e.preventDefault();
	linkHandler(this,e);
});

// Function and vars to save last page url to check url isn't a hash
function getLocation() {
	return location.pathname + location.search;
}
var currentLocation = getLocation();
var previousHistory = getLocation();

// Link handler function
function linkHandler(element,event){
	var a = $(element);
	var href = a.attr("href");
	console.log(href);

	$(".ripple-wrapper").css({
		top : event.clientY,
		left: event.clientX
	});

	if (typeof(window.history.pushState) === typeof(Function)){

		//Show preloader
		//$("#preloader").show();

		//Stop default changing page
		//event.preventDefault();

		//Clicked link's href
		//var href = $(this).attr("href");

		//Store the old history
		previousHistory = window.location.href;

		//set the history
		history.pushState(null, null, href);

		//Change the page contents
		changePage(href);

		// Close sidenav
		//$('.button-collapse').sideNav('hide');
	}
	else{
		window.location.replace(href);
	}
}

// Page changing function and transition handling
function changePage(href){
	$("#preloader").show();
	$(".ripple").addClass("activating");
	$('main').load(href + " #main-content", function(response, status, xhr){
		console.log("Status: " + status);
		$(".ripple").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(".ripple").addClass("disabling");
			setTimeout(function(){
				$(".ripple").removeClass("activating disabling");
				$("#preloader").hide();
				$("main").stop().animate({ scrollTop: [0, "easeOutQuint"] }, 300);
				
			},300);
			// Re init materialize things
			materialInit()
		});
	});
}
// Browser back button handler
window.onpopstate = function(e){
	console.log(e);
	//New loaction from back button
	var newLocation = getLocation();
	//Check the loaction has actually changed before acting on it
	if(newLocation != currentLocation) {
		// Make ripple come from the top left
		$(".ripple-wrapper").css({
			top : event.clientY,
			left: event.clientX
		});
		// If yes, change the page
		changePage(location.pathname);
		
		currentLocation = getLocation();
	}
	else{
		console.log(newLocation + " " + currentLocation);
	}
};