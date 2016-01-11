$(".button-collapse").sideNav({
	closeOnClick: true
});


$(document).on("click", ".internal-link", function(e){
	e.preventDefault();
	linkHandler(this,e);
});

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
		$(".ripple").addClass("activating");

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
	$('main').load(href + " #main-content", function(response, status, xhr){
		$(".ripple").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
			$(".ripple").addClass("disabling");
			setTimeout(function(){
				$(".ripple").removeClass("activating disabling");
				$("#preloader").hide();
			},300);
		});
	});
}