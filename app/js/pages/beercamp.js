window.bc = window.bc || {};
windowWidth = $(window).width();
windowHeight = $(window).height();
isMobile = navigator.userAgent.match(/mobile/i);
isPhone = windowWidth <= 640;
biggerThanPhone = windowWidth > 640;
biggerThanPortrait = windowWidth > 768;
biggerThanLandscape = windowWidth > 1024;


bc.frameCount = 50;
bc.imgPath = '/img/pages/beercamp/frames/frames_';
bc.imgType = 'jpg';
bc.frameArray = [];
windowWidth > 768 && windowWidth < 1100 ? bc.scrollSpeed = 45 : bc.scrollSpeed = 65;

bc.designContainer = (windowHeight + 625 + (bc.frameCount * bc.scrollSpeed) + 200);
bc.designFinal = bc.designContainer - windowHeight;
bc.devFinal = $('#develop').height() - ($('#right-diagram').outerHeight()/2);


jQuery(document).ready(function() {
// REMOVE UNNECESSARY / NONWORKING ELEMENTS ON MOBILE/TOUCH DEVICES
if (isMobile) {
    $('.no-touch').remove();
    $('footer').css('padding-bottom','150px');
}
if (isMobile && isPhone) {
    $('.no-mobile').remove();

    $('.character-foreground, .character-background').removeAttr('data-top-top data--100p-top');
    $('#design-text').removeAttr('data--200-top data--350-top');

    $('#mario').removeAttr('data-160-top data-161-top');
    $('#mario').attr({
      'data-97p-bottom': '',
      'data-96p-bottom': ''
    });
}


// INITIALIZE FASTCLICK
FastClick.attach(document.body);


//TOP NAV FUNCTIONALITY
//$('.menu-btn').on('click', function(e){
    //$('#scroll-nav').toggleClass('active');
    //e.preventDefault();
//});

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
    $('#design-container').css('height',bc.designContainer);
    $('#design').css('height',windowHeight);
}

if (!isMobile) {
    $('#design').attr({
        'data-0-top': '',
        'data-bottom-bottom': ''
    });

    $('#right-diagram').attr({
        'data-0-top': '',
        'data--200-bottom': ''
    });
}
if (isMobile && biggerThanPhone) {
    $('#design').attr('data-0-top','top: 0px;');
    $('#design').attr('data--' + bc.designFinal + '-top','top: ' + bc.designFinal + 'px;');
}
if (isMobile && biggerThanPortrait) {
    $('#right-diagram').attr('data-0-top','top: 0px;');
    $('#right-diagram').attr('data--' + bc.devFinal + '-top','top: ' + bc.devFinal + 'px;');
}


// LAYERS OF DEV WITH INFO
$('.layer-description').css('display','none');
$('#dev-layers li img').on('click', function(e){
    var layer_info = $(this).attr('title');

    if ($(this).parent('li').hasClass('active')) {
        $(this).parent('li').removeClass('active');
        $(this).parent('li').siblings().removeClass('background');
        $('#'+layer_info).css('display','none');
    }
    else {
        $(this).parent('li').siblings().removeClass('active').addClass('background');
        $('.layer-description').css('display','none');
        $(this).parent('li').addClass('active').removeClass('background');
        $('#'+layer_info).css('display','block');
    }
    e.preventDefault();
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
            var url = "https://getpocket.com/edit?url=http://www.google.com/&title=Beercamp+2013";
            var windowName = "pocketWindow";
            var windowSize = "width=500,height=325";

            window.open(url, windowName, windowSize);
        });
    }
});
});

imagesLoaded( document.querySelector('#skrollr-body'), function( instance ) {
// FRAMES ON SCROLL
if (biggerThanPhone) {
    $('#scroll-animation').reel({
        preload: 'linear',
        cursor: 'default',
        draggable: false,
        loops: false,
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
        if (isMobile && biggerThanPhone) {
            var tabletDesignFrames = $('#design').css('top').replace(/[^-\d\.]/g, '');
            var tabletAnimationStart = (tabletDesignFrames - 625);
            var tabletFrames = (tabletAnimationStart / bc.scrollSpeed);
            $('#scroll-animation').reel('frame', tabletFrames);
        }
        if (!isMobile) {
            var designFrames = $('#design').offset();
            var designTop = $('#design-container').offset();
            var animationStart = ((designFrames.top-625)-designTop.top);
            var desktopFrames = (animationStart / bc.scrollSpeed);
            $('#scroll-animation').reel('frame', desktopFrames);

            var videoTop = $('#video-screen').offset().top;
            if (heightToggle && ((data.curTop + windowHeight) >= (videoTop - 75))) {
                $('#video-screen video').append('<source src="IMG/pages/beercamp/video/beercamp.mp4" type="video/mp4"/><source src="IMG/pages/beercamp/video/beercamp.webm" type="video/webm"/>');
                heightToggle = false;
            }
        }
    }
});
s.refresh($('#skrollr-body'));
//s.refresh($('footer'));

// SCROLL TO TOP
$('#scroll-to-top').on('click', function(e){
    e.preventDefault();
    s.setScrollTop(0);
});
});