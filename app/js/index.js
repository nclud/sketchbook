head.ready(function(){
    // INITIALIZE FASTCLICK
    FastClick.attach(document.body);


    // REMOVE UNNECESSARY / NONWORKING ELEMENTS ON MOBILE/TOUCH DEVICES
    if (navigator.userAgent.match(/mobile/i)) {
        $('.no-touch').remove();
    }


    // INITIALIZE SKROLLR
    var s = skrollr.init({ smoothScrolling: false });


    //TOP NAV FUNCTIONALITY
    $('.menu-btn').click(function(){
        $('#scroll-nav').toggleClass('active');
        return false;
    });
});
