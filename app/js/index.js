window.bc = window.bc || {};
windowWidth = $(window).width();
windowHeight = $(window).height();
isMobile = navigator.userAgent.match(/mobile/i);
isPhone = windowWidth <= 640;
biggerThanPhone = windowWidth > 640;
biggerThanPortrait = windowWidth > 768;
biggerThanLandscape = windowWidth > 1024;


jQuery(document).ready(function() {

      // INITIALIZE FASTCLICK
    FastClick.attach(document.body);


    // REMOVE UNNECESSARY / NONWORKING ELEMENTS ON MOBILE/TOUCH DEVICES
    if (isMobile) {
        $('.no-touch').remove();
        $('footer').css('padding-bottom','150px');
    }

    // INITIALIZE SKROLLR
    // var a = skrollr.init({ smoothScrolling: false });

    //TOP NAV FUNCTIONALITY
    $('.menu-btn').click(function(e){
        e.preventDefault();
        $('#scroll-nav').toggleClass('active');
    });

    $(document).on('keyup', function(e) {
        // esc key closes menu
        if (e.keyCode == 27 ) {
            $('#scroll-nav').removeClass('active');
        }
    });

});
