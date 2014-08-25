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
