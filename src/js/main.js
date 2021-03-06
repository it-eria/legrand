//= libs/jquery-3.1.1.min.js
//= libs/jquery.matchHeight.js
//= libs/jquery.animateNumber.js
//= libs/jquery.maskedinput.js

$(function() {

    var headerHeight = $('#header').outerHeight();
    var hasNumbersEl = false;

    if($('#numbers').length > 0) {
        hasNumbersEl = true;
    }

    $('.menu-btn').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.main-nav').toggleClass('visible');
    });

    $('.open-popup').on('click', function(e) {
        e.preventDefault();
        $('div.popup').slideToggle(300);
        $('body, html').animate({
            scrollTop: 0
        }, 1);
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
        if(hasNumbersEl) {
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
        }
        // $('.popup').css({
        //     'top': $(window).scrollTop()
        // });
    });

    if($(this).width() < 993 && $(this).width() > 319) {
        $('.artists .artist-item').css({
            "height": $('.container').width() / 5 - 5
        });
    } else {
        $('.artists .artist-item').css({
            "height": ""
        });
    }

    $(window).on('resize', function() {
        headerHeight = $('#header').outerHeight();
        if($(this).width() < 993 && $(this).width() > 319) {
            $('.artists .artist-item').css({
                "height": $('.container').width() / 5 - 5
            });
        } else {
            $('.artists .artist-item').css({
                "height": ""
            });
        }
    });

    $('.artist-item__hover, .services .service-item .link-2').on('click', function(e) {
        e.preventDefault();
    });

    $('.close-popup').on('click', function(e) {
        e.preventDefault();
        $('.popup').slideToggle(300);
    });

    $('#cellphone').mask("+99 (999) 999-9999");
});