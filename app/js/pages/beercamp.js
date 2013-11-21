window.bc = window.bc || {};
bc.windowWidth = $(window).width();
bc.windowHeight = $(window).height();
bc.frameCount = 50;
bc.imgPath = '/img/pages/beercamp/frames/frames_';
bc.imgType = 'jpg';
bc.frameArray = [];
bc.isMobile = navigator.userAgent.match(/mobile/i);
bc.windowWidth > 768 && bc.windowWidth < 1100 ? bc.scrollSpeed = 45 : bc.scrollSpeed = 65;
bc.windowIsBiggerThan640 = bc.windowWidth > 640;

jQuery(document).ready(function() {

    // REMOVE UNNECESSARY / NONWORKING ELEMENTS ON MOBILE/TOUCH DEVICES
    if ( bc.isMobile ) {
        $('.no-touch').remove();
    }
    if ( bc.isMobile && bc.windowWidth <= 640) {
        $('.no-mobile').remove();

        $('.character-foreground, .character-background').removeAttr('data-top-top').removeAttr('data--100p-top');
        $('#design-text').removeAttr('data--200-top').removeAttr('data--350-top');

        $('#mario').removeAttr('data-160-top').removeAttr('data-161-top');
        $('#mario').attr({
          'data-97p-bottom': '',
          'data-96p-bottom': ''
        });
    }

    // SET HEIGHT / FIXED POSITIONING WITHOUT ACTUALLY FIXING POSITIONING
    var designContainer = ( bc.windowHeight + 625 + (bc.frameCount * bc.scrollSpeed) + 200 );
    var designFinal = designContainer - bc.windowHeight;

    if ( bc.windowIsBiggerThan640 ) {
        $('#design-container').css('height',designContainer);
        $('#design').css('height',bc.windowHeight);
    }

    if ( !bc.isMobile ) {
        $('#design').attr({
          'data-0-top': '',
          'data-bottom-bottom': ''
        });

        $('#right-diagram').attr({
          'data-0-top': '',
          'data--200-bottom': ''
        });
    }

    if ( bc.isMobile && bc.windowIsBiggerThan640 ) {
        $('#design').attr('data-0-top','top: 0px;');
        $('#design').attr('data--' + designFinal + '-top','top: ' + designFinal + 'px;');
    }
    if ( bc.isMobile && bc.windowWidth > 768) {
        var devFinal = $('#develop').height() - ($('#right-diagram').outerHeight()/2);
        $('#right-diagram').attr('data-0-top','top: 0px;');
        $('#right-diagram').attr('data--' + devFinal + '-top','top: ' + devFinal + 'px;');
    }

    // LAYERS OF DEV WITH INFO
    $('.layer-description').css('display','none');
    $('#dev-layers li img').on('click', function(e){
        var layer_info = $(this).attr('title');
        e.preventDefault();

        if ( $(this).parent('li').hasClass('active') ) {
            $(this).parent('li').removeClass('active');
            $(this).parent('li').siblings().removeClass('background');
            $('#'+layer_info).css('display','none');
        } else {
            $(this).parent('li').siblings().removeClass('active').addClass('background');
            $('.layer-description').css('display','none');
            $(this).parent('li').addClass('active').removeClass('background');
            $('#'+layer_info).css('display','block');
        }

    });

    // SOCIAL SHARING & FOOTER FIX
    if ( bc.isMobile ) {
        $('footer').css('padding-bottom','150px');
    }

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
                var url = "https://getpocket.com/edit?url=http://www.google.com/&title=Beercamp+2013";
                var windowName = "pocketWindow";
                var windowSize = "width=500,height=325";

                window.open(url, windowName, windowSize);
            });
        }
    });
});

imagesLoaded( document.querySelector('#skrollr-body'), function( instance ) {

    // IMAGE PRELOADING FOR ANIMATION

    function padNumbers(number) {
        if ( number <= 99 ) {
            number = ( "0" + number ).slice(-2);
        }
        return number;
    }
    if ( bc.windowIsBiggerThan640 ) {
        for ( var i = 0; i < bc.frameCount; i++ ) {
            bc.frameArray[i] = bc.imgPath + padNumbers( i+1 ) + '.' + bc.imgType;
        }
    }

    // FRAMES ON SCROLL
    if ( bc.windowIsBiggerThan640 ) {
        $('#scroll-animation').reel({
            preload: 'linear',
            cursor: 'default',
            draggable: false,
            loops: false,
            preload: 'linear',
            frames: bc.frameCount,
            images: bc.frameArray
        });

        $('#scroll-animation-reel img').each(function(){
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
            if ( document.getElementById('design') ) {
              if ( bc.isMobile && bc.windowWidth > 640) {
                  var designFrames = $('#design').css('top').replace(/[^-\d\.]/g, '');
                  var animationStart = (designFrames - 625);
                  $('#scroll-animation').reel('frame', (animationStart / bc.scrollSpeed));
              }
              else if (! bc.isMobile ) {
                  var designFrames = $('#design').offset();
                  var designTop = $('#design-container').offset();
                  var animationStart = ((designFrames.top-625)-designTop.top)
                  $('#scroll-animation').reel('frame', (animationStart / bc.scrollSpeed));
              }

              var videoTop = $('#video-screen').offset().top;
              if (heightToggle && ((data.curTop + bc.windowHeight) >= (videoTop - 75)) && !navigator.userAgent.match(/mobile/i)) {
                  $('#video-screen video').append('<source src="/img/pages/beercamp/video/beercamp.mp4" type="video/mp4"/><source src="/img/pages/beercamp/video/beercamp.webm" type="video/webm"/>');
                  heightToggle = false;
              }
            }
        }
    });

    s.refresh($('#skrollr-body'));
    s.refresh($('footer'));

    $('#scroll-to-top').on('click', function(e){
        e.preventDefault();
        s.setScrollTop(0);
    });

});
