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
    // RESPONSIVE VIDEO EMBEDS
    $('article, header').fitVids();

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

bc.frameCount = 50;
bc.imgPath = '/img/pages/beercamp/frames/frames_';
bc.imgType = 'jpg';
bc.frameArray = [];
windowWidth > 768 && windowWidth < 1100 ? bc.scrollSpeed = 45 : bc.scrollSpeed = 65;

bc.designContainer = (windowHeight + 625 + (bc.frameCount * bc.scrollSpeed) + 200);
bc.designFinal = bc.designContainer - windowHeight;
bc.devFinal = $('#beercamp_develop').height() - ($('#beercamp_right-diagram').outerHeight()/2);

jQuery(document).ready(function() {
    if (isMobile && isPhone) {
        $('.no-mobile').remove();

        $('#beercamp_header .character-foreground, #beercamp_header .character-background').removeAttr('data-top-top data--100p-top');
        $('#beercamp_design-text').removeAttr('data--200-top data--350-top');

        $('#beercamp_mario').removeAttr('data-160-top data-161-top');
        $('#beercamp_mario').attr({
          'data-97p-bottom': '',
          'data-96p-bottom': ''
        });
    }

    // FRAMES ARRAY
    function padNumbers(number) {
        if (number<=99) {
            number = ("0"+number).slice(-2);
        }
        return number;
    }
    for (var i=0; i<bc.frameCount; i++) {
        bc.frameArray[i]=bc.imgPath+padNumbers(i+1)+'.'+bc.imgType;
    }

    // SET HEIGHT / FIXED POSITIONING WITHOUT ACTUALLY FIXING POSITIONING
    if (biggerThanPhone) {
        $('#beercamp_design-container').css('height',bc.designContainer);
        $('#beercamp_design').css('height',windowHeight);
    }

    if (!isMobile) {
        $('#beercamp_design').attr({
            'data-0-top': '',
            'data-bottom-bottom': ''
        });

        $('#beercamp_right-diagram').attr({
            'data-0-top': '',
            'data--200-bottom': ''
        });
    }
    if (isMobile && biggerThanPhone) {
        $('#beercamp_design').attr('data-0-top','top: 0px;');
        $('#beercamp_design').attr('data--' + bc.designFinal + '-top','top: ' + bc.designFinal + 'px;');
    }
    if (isMobile && biggerThanPortrait) {
        $('#beercamp_right-diagram').attr('data-0-top','top: 0px;');
        $('#beercamp_right-diagram').attr('data--' + bc.devFinal + '-top','top: ' + bc.devFinal + 'px;');
    }


    // LAYERS OF DEV WITH INFO
    $('#beercamp_right-diagram .layer-description').css('display','none');
    $('#beercamp_dev-layers li img').on('click', function(e){
        var layer_info = $(this).attr('title');

        if ($(this).parent('li').hasClass('active')) {
            $(this).parent('li').removeClass('active');
            $(this).parent('li').siblings().removeClass('background');
            $('#'+layer_info).css('display','none');
        }
        else {
            $(this).parent('li').siblings().removeClass('active').addClass('background');
            $('#beercamp_right-diagram .layer-description').css('display','none');
            $(this).parent('li').addClass('active').removeClass('background');
            $('#'+layer_info).css('display','block');
        }
        e.preventDefault();
    });
});

imagesLoaded( document.querySelector('#skrollr-body'), function( instance ) {
    // FRAMES ON SCROLL
    if (biggerThanPhone) {
        $('#beercamp_scroll-animation').reel({
            preload: 'linear',
            cursor: 'default',
            draggable: false,
            loops: false,
            frames: bc.frameCount,
            images: bc.frameArray
        });

        $('#beercamp_scroll-animation-reel img').each(function(){
            $(this).removeAttr('width');
            $(this).removeAttr('height');
        });
    }

    // INITIALIZE SKROLLR
    var heightToggle = true;

    var s = skrollr.init({
        smoothScrolling: false,
        mobileDeceleration: 1,
        render: function(data) {

            if($('header').hasClass('beercamp')){
                if (isMobile && biggerThanPhone) {
                    var tabletDesignFrames = $('#beercamp_design').css('top').replace(/[^-\d\.]/g, '');
                    var tabletAnimationStart = (tabletDesignFrames - 625);
                    var tabletFrames = (tabletAnimationStart / bc.scrollSpeed);
                    $('#beercamp_scroll-animation').reel('frame', tabletFrames);
                }
                if (!isMobile) {
                    var designFrames = $('#beercamp_design').offset();
                    var designTop = $('#beercamp_design-container').offset();
                    var animationStart = ((designFrames.top-625)-designTop.top);
                    var desktopFrames = (animationStart / bc.scrollSpeed);
                    $('#beercamp_scroll-animation').reel('frame', desktopFrames);

                    var videoTop = $('#beercamp_video-screen').offset().top;
                    if (heightToggle && ((data.curTop + windowHeight) >= (videoTop - 75))) {
                        $('#beercamp_video-screen video').append('<source src="/img/pages/beercamp/video/beercamp.mp4" type="video/mp4"/><source src="/img/pages/beercamp/video/beercamp.webm" type="video/webm"/>');
                        heightToggle = false;
                    }
                }
            }

        }
    });
    s.refresh($('#skrollr-body'));

    // SCROLL TO TOP
    $('#scroll-to-top').on('click', function(e){
        e.preventDefault();
        s.setScrollTop(0);
    });

    // SOCIAL SHARING & FOOTER FIX
    $('#share').sharrre({
        share: {
            twitter: true,
            facebook: true
        },
        template: '<span class="menu-header">Share</span><a class="menu-link twitter">Twitter</a><a class="menu-link facebook">Facebook</a><a class="menu-link pocket">Pocket</a>',
        enableHover: false,
        enableTracking: true,
        render: function(api, options){
            $(api.element).on('click', '.twitter', function() {
                api.openPopup('twitter');
            });
            $(api.element).on('click', '.facebook', function() {
                api.openPopup('facebook');
            });
            $(api.element).on('click', '.pocket', function() {
                var url = "https://getpocket.com/edit?url="+$(location).attr('href')+"&title="+$(document).find("title").text();
                var windowName = "pocketWindow";
                var windowSize = "width=500,height=325";

                window.open(url, windowName, windowSize);
            });
        }
    });
});