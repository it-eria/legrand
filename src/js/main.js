//= libs/jquery-3.1.1.min.js
//= libs/jquery.matchHeight.js
//= libs/jquery.animateNumber.js
//= libs/jquery.maskedinput.js

$(function() {

    var headerHeight = $('#header').outerHeight();
    
    $('.menu-btn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('visible');
    });
    
    $('.down-btn').on('click', function(e) {
        e.preventDefault();
        var id = $(this).attr('href');
        $('html, body').animate({ scrollTop: $(id).offset().top }, 500);
    });

    $('.open-popup').on('click', function(e) {
        e.preventDefault();
        $('.popup').slideToggle(300);
    });

    $('button.standart-btn').on('click', function() {
        $('.popup').hide();
    });

    $(window).on('scroll', function() {
        var offset = $(this).scrollTop();        
        if(offset > headerHeight) {
            $('.main-nav').css({
                'position': 'fixed',
                'background-color': '#ffffff'
            });
        } else {
            $('.main-nav').attr('style', '');
        }
        if(offset >= $('#numbers').offset().top - 300) {
            $('#animNumber').animateNumber(
                {
                  number: 5100,
                  numberStep: $.animateNumber.numberStepFactories.separator(' ')
                },
                3000
            );
            $('#animNumberAbout-1').animateNumber(
                {
                  number: 17,
                  numberStep: $.animateNumber.numberStepFactories.separator(' ')
                },
                1000
            );
            $('#animNumberAbout-2').animateNumber(
                {
                  number: 1632,
                  numberStep: $.animateNumber.numberStepFactories.separator(' ')
                },
                3000
            );
            $('#animNumberAbout-3').animateNumber(
                {
                  number: 150,
                  numberStep: $.animateNumber.numberStepFactories.separator(' ')
                },
                2000
            );
        }
    });

    $(window).on('resize', function() {
        headerHeight = $('#header').outerHeight();
    });

    $('.main-menu li a, #services .services-block a').on('click', function(e) {
        e.preventDefault();
        var currentId = $(this).attr('href');
        var offset = 0;
        if(currentId == "#services") {
            offset = 300
        } else if(currentId == "#music" || currentId == "#culinary" || currentId == "#style" || currentId == "#art") {
            offset = 90;
        }
        $('html, body').animate({scrollTop: $(currentId).offset().top - offset}, 3000);
    });

    $('.artist-item__hover').on('click', function(e) {
        e.preventDefault();
    });

    $('.close-popup').on('click', function(e) {
        e.preventDefault();
        $('.popup').slideToggle(300);
    });

    $('#cellphone').mask("+9?9 (999) 999-9999");
});