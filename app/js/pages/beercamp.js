jQuery(document).ready(function() {

    // GLOBAL VARIABLES
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // IMAGE PRELOADING FOR ANIMATION
    var frameCount = 50;
    var scrollSpeed = 65;
    var imgPath = '/img/pages/beercamp/frames/frames_';
    var imgType = 'jpg';
    var frameArray = [];

    if (windowWidth > 768 && windowWidth < 1100) {
        scrollSpeed = 45;
    }

    function padNumbers(number) {
        if (number<=99) {
            number = ("0"+number).slice(-2);
        }
        return number;
    }

    for (var i=0; i<frameCount; i++) {
        frameArray[i]=imgPath+padNumbers(i+1)+'.'+imgType;
    }

    // FRAMES ON SCROLL
    $('#scroll-animation').reel({
        cursor: 'default',
        draggable: false,
        loops: false,
        frames: frameCount,
        images: frameArray
    });

    $('#scroll-animation-reel img').each(function(){
        $(this).removeAttr('width');
        $(this).removeAttr('height');
    });


    // SET HEIGHT / FIXED POSITIONING WITHOUT ACTUALLY FIXING POSITIONING
    var designContainer = (windowHeight + 625 + (frameCount * scrollSpeed) + 200);
    var designFinal = designContainer - windowHeight;

    $('#design-container').css('height',designContainer);
    $('#design').css('height',windowHeight);

    if (!navigator.userAgent.match(/mobile/i)) {
        $('#design').attr('data-0-top','');
        $('#design').attr('data-bottom-bottom','');

        $('#right-diagram').attr('data-0-top','');
        $('#right-diagram').attr('data-bottom-bottom','');
    }
    if (navigator.userAgent.match(/mobile/i) && windowWidth > 640) {
        $('#design').attr('data-0-top','top: 0px;');
        $('#design').attr('data--' + designFinal + '-top','top: ' + designFinal + 'px;');
    }
    if (navigator.userAgent.match(/mobile/i) && windowWidth > 768) {
        var devFinal = $('#develop').height() - ($('#right-diagram').outerHeight()/2);
        $('#right-diagram').attr('data-0-top','top: 0px;');
        $('#right-diagram').attr('data--' + devFinal + '-top','top: ' + devFinal + 'px;');
    }

    // INITIALIZE SKROLLR
    var heightToggle = true;

    var s = skrollr.init({
        smoothScrolling: false,
        mobileDeceleration: 1,
        render: function(data) {
            if ( document.getElementById('design') ) {
              //var designFrames = $('#design').css('top').replace(/[^-\d\.]/g, '');
              //var animationStart = (designFrames - 625);
              //$('#scroll-animation').reel('frame', (animationStart / scrollSpeed));
              if (navigator.userAgent.match(/mobile/i)) {
                  var designFrames = $('#design').css('top').replace(/[^-\d\.]/g, '');
                  var animationStart = (designFrames - 625);
                  $('#scroll-animation').reel('frame', (animationStart / scrollSpeed));
              }
              else {
                  var designFrames = $('#design').offset();
                  var designTop = $('#design-container').offset();
                  var animationStart = ((designFrames.top-625)-designTop.top)
                  $('#scroll-animation').reel('frame', (animationStart / scrollSpeed));
              }

              var videoTop = $('#video-screen').offset().top;
              if (heightToggle && ((data.curTop + windowHeight) >= (videoTop - 75)) && !navigator.userAgent.match(/mobile/i)) {
                  $('#video-screen video').append('<source src="/img/pages/beercamp/video/beercamp.mp4" type="video/mp4"/><source src="/img/pages/beercamp/video/beercamp.webm" type="video/webm"/>');
                  heightToggle = false;
              }
            }
        }
    });

    s.refresh($('#skrollr-body'));

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


    // SCROLL TO TOP
    // skrollr.menu.init(s, {
    //     animate: true,
    //     easing: 'linear',
    //     duration: function(currentTop, targetTop) {
    //         return 3250;
    //     }
    // });


    // SOCIAL SHARING & FOOTER FIX
    if (navigator.userAgent.match(/mobile/i)) {
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
    s.refresh($('footer'));

});
