var LorR = true;
var canFlip = true;
$(function() {
	// Checking for CSS 3D transformation support
	$.support.css3d = supportsCSS3D();
	// Listening for clicks on the ribbon links
	$('.flipLink').click(function(e) {
		var formContainer = $('#formContainer');
		// Flipping the forms
		if (canFlip) {
			formContainer.toggleClass('flipped');
			canFlip = false;
			setTimeout(function() {
				canFlip = true
			}, 250);
		}

		// If there is no CSS3 3D support, simply
		// hide the login form (exposing the recover one)
		if (!$.support.css3d) {
			$('#login').toggle();
		}
		e.preventDefault();
	});

	// A helper function that checks for the 
	// support of the 3D CSS3 transformations.
	function supportsCSS3D() {
		var props = [
				'perspectiveProperty', 'WebkitPerspective', 'MozPerspective'
			],
			testDom = document.createElement('a');

		for (var i = 0; i < props.length; i++) {
			if (props[i] in testDom.style) {
				return true;
			}
		}

		return false;
	}
});