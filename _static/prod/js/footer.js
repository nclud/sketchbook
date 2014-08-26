$(document).ready(function() {
	var windowWidth = $(window).width(),
		windowHeight = $(window).height();
	var isMobile = navigator.userAgent.match(/mobile/i);


	// INITIALIZE FASTCLICK
    FastClick.attach(document.body);


	// WIDOW CONTROL
	if (windowWidth > 640) {
		$('h1, h2, h3, li, p, figcaption').each(function() {
		    $(this).html($(this).html().replace(/\s((?=(([^\s<>]|<[^>]*>)+))\2)\s*$/,'&nbsp;$1'));
		});
	}


	// RESPONSIVE VIDEO EMBEDS
    $('article, header').fitVids();
});