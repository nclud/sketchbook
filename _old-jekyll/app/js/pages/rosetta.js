jQuery(document).ready(function() {
    if (!isMobile) {
        // SET VIDEO BACKGROUND ON DESKTOP
        $('#rosetta_header').wallpaper({
            id: 'rosetta_video',
            source: {
                mp4: '/img/pages/rosetta/video/rosetta-header.mp4',
                webm: '/img/pages/rosetta/video/rosetta-header.webm'
            }
        });
    }
    else {
        $('#rosetta_header').css('background-image','url("/img/pages/rosetta/rosetta-header-photo.jpg")');
    }

    // FIRING DEV LAYERS ON PHONE
    if (isPhone) {
        $('#rosetta_develop').removeAttr('data-75-top data-76-top');
        $('#rosetta_develop').attr({
          'data-95p-bottom': '',
          'data-94p-bottom': ''
        });
    }

    // SCROLLBAR ON DESIGN SCREENS
    $('#rosetta_design_screen').perfectScrollbar({
        useKeyboard: false,
        suppressScrollX: true,
        //wheelPropagation: true,
        wheelSpeed: 9
    });

    // TOOLTIPS ON DESIGN SCREENS
    $('.rosetta_design_screen_info').on('click',function(e){
        var tooltip = $(this).attr('title');

        if ($('#'+tooltip).hasClass('active')) {
            $('.rosetta_design_screen_info').removeClass('active').removeClass('unfocus');
            $('.rosetta_tooltip_single').removeClass('active');
            $('#rosetta_design_text').removeClass('inactive');
        }
        else {
            $('.rosetta_design_screen_info').removeClass('active').addClass('unfocus');
            $(this).addClass('active').removeClass('unfocus');
            $('.rosetta_tooltip_single').removeClass('active');
            $('#'+tooltip).addClass('active');
            $('#rosetta_design_text').addClass('inactive');
        }
        e.preventDefault();
    });
    $('.rosetta_close-tooltip').on('click',function(e){
        $('.rosetta_design_screen_info').removeClass('active').removeClass('unfocus');
        $('.rosetta_tooltip_single').removeClass('active');
        $('#rosetta_design_text').removeClass('inactive');
        e.preventDefault();
    });
    $('#rosetta_design_screen').scroll(function(e) {
        $('.rosetta_design_screen_info').removeClass('active').removeClass('unfocus');
        $('#rosetta_design_text').removeClass('inactive');
        $('.rosetta_tooltip_single').removeClass('active');
    });

    // CAPTIONS HIGHLIGHT FOR CART SLIDESHOW
    $('#rosetta_cart_slider').on('cycle-bootstrap', function(event, optionHash, API) {
        if (!isPhone) {
            $('#rosetta_caption1').addClass('active');
        }
        $('#rosetta_cart_slider .cycle-pager').addClass('active');
    });
    if (!isPhone) {
        $('#rosetta_cart_slider').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
            var newCaption = $(incomingSlideEl).attr('title');
            var oldCaption = $(outgoingSlideEl).attr('title');

            if (newCaption == oldCaption) {
            }
            else {
                $('.rosetta_cart-caption').removeClass('active');
            }
        });
        $('#rosetta_cart_slider').on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
            var newCaption = $(incomingSlideEl).attr('title');
            var oldCaption = $(outgoingSlideEl).attr('title');

            if (newCaption == oldCaption) {
            }
            else {
                $('#' + newCaption).addClass('active');
            }
        });
    }
});
