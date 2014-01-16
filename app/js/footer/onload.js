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

            if($('header').hasClass('rosetta')){
                if (!isMobile ) {
                    if (data.curTop > $('#rosetta_header').height()){
                        $('#rosetta_header').wallpaper('stop');
                    }
                    else if (data.curTop < $('#rosetta_header').height() && $('body').hasClass('wallpaper-initialized')){
                        $('#rosetta_header').wallpaper('play');
                    //    alert('yes');
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