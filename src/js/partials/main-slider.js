/**
 * Dunlop: main_slider
 * Главный слайдер
 * 03-05-2016: A. Sokolova
 * 19-05-2016: V. Turosinskiy
 */
$(document).ready(function () {
    /**
     * main_slider_speed - скорость анимации
     * mainSliderMouseWheel - запрет смены слайдов при скроле до завершения анимации
     * js_main_slider - селектор карусели
     * js_main_slider_text - текст слайда для анимации
     * js_main_slider_text_left - отступ слева для коректного завершения анимации текста
     */

    var main_slider_speed = 1000,
        active_element,
        js_main_slider = $('.js-main-slider'),
        js_main_slider_text = $('.b-main-slider__text'),
        js_main_slider_text_left = js_main_slider_text.css("margin-left"),
        js_image = $(".js-preloader-image.js-main-image"),
        js_background = $(".js-preloader-image.js-background-image"),
        timeout,
        background_next,
        background_current,
        countSwipe = 0;

    /**
     * Инициализация карусели
     */
    js_main_slider.slick({
        autoplay: false,
        speed: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        fade: true,
        touchMove: false,
        swipe: false,
        verticalSwiping: false
    })
    /**
     * Анимация после смены слайдов
     */
    .on('afterChange', function (event, slick, currentSlide, nextSlide) {
        js_image.animate({
            left: "0",
            opacity: 1
        }, {
            duration: main_slider_speed / 2,
            complete: function () {
                active_element = $(".js-main-slider-navigation.active");
                if (countSwipe < 10) {
                    countSwipe = 0
                } else {
                    timeout = setTimeout(function () {
                        countSwipe = 0;
                    }, 750);
                }
            }
        });

        js_main_slider_text.animate({
            "margin-left": parseInt(js_main_slider_text_left) + "%",
            opacity: 1
        }, {
            duration: main_slider_speed / 2
        });
    })
    /**
     * Вызов функции смены сладов при скроле мышью
     */
    .bind('mousewheel', function (e) {
        countSwipe++;
        if (!js_image.is(":animated") && countSwipe < 10) mouseWheelSlide(e);
        e.preventDefault();
    });
    /**
     * Вызов смены слайдов при клике по навигации
     */

    $(document).on("click", ".js-main-slider-navigation", function () {
        countSwipe++;
        active_element = $(".js-main-slider-navigation.active");
        if (!js_image.is(":animated") && countSwipe < 10) mainSliderGoTo($(this));
    });

    /**
     *
     * @param element - слайд на который осуществляется переход
     */
    function mainSliderGoTo(element) {
        if (!$(element).hasClass("active")) {
            var left = parseInt(js_main_slider.css("left"));
            getSlideByIndex(element).css("z-index", 999).css("opacity", 1);
            getSlideByIndex(active_element).css("z-index", 1000);//.animate({"opacity": 0.5}, main_slider_speed / 2);

            active_element
                .removeClass("active")
                .animate({margin: "0 0 0 0"});

            $(element)
                .addClass("active")
                .animate({margin: "0 0 0 -50px"});

            //Текст
            getSlideByIndex(element).find('.b-main-slider__text').animate({
                "margin-left": parseInt(parseInt(js_main_slider_text_left) + 5) + "%",
                opacity: 0.5
            }, {
                duration: main_slider_speed / 2
            });

            getSlideByIndex(active_element).find('.b-main-slider__text').animate({
                "margin-left": parseInt(parseInt(js_main_slider_text_left) + 5) + "%",
                opacity: 0
            }, {
                duration: main_slider_speed / 2
            });

            js_background.each(function (index, elem) {
                if (index == $(".js-main-slider-navigation").index(active_element)) {
                    background_current = $(this);
                } else if (index == $(".js-main-slider-navigation").index(element)) {
                    background_next = $(this);
                }
            });

            background_next.css("opacity", 1);

            background_current.animate({
                opacity: 0
            }, {
                duration: main_slider_speed / 2
            });

            //Картинка
            getSlideByIndex(element).find('.js-preloader-image.js-main-image').animate({
                left: "-10%",
                opacity: 0.5
            }, {
                duration: main_slider_speed / 2,
                complete: function () {
                    /**
                     * По завершению анимации вызываем функцию смены слайдов
                     */
                    js_main_slider.slick("slickGoTo", $(".js-main-slider-navigation").index(element), true);
                }
            });

            getSlideByIndex(active_element).find('.js-preloader-image.js-main-image').animate({
                left: "-10%",
                opacity: 0
            }, {
                duration: main_slider_speed / 2,
                complete: function () {
                    /**
                     * По завершению анимации вызываем функцию смены слайдов
                     */
                    js_main_slider.slick("slickGoTo", $(".js-main-slider-navigation").index(element), true);
                }
            });
        }
    }

    function mouseWheelSlide(e) {
        active_element = $(".js-main-slider-navigation.active");
        var next_index,
            cur_index = $(".js-main-slider-navigation").index(active_element);
        if ((e.originalEvent.deltaY - e.originalEvent.deltaX) < 0) {
            next_index = cur_index - 1;
            if (!$("[data-slick-index=" + next_index + "]").length) next_index = $(".js-main-slider-navigation").index($(".js-main-slider-navigation:last"));
        } else {
            next_index = cur_index + 1;
            if (!$("[data-slick-index=" + next_index + "]").length) next_index = 0;
        }

        if (!$("[data-slick-index=" + next_index + "]").length) next_index = 0;
        var element = $(".js-main-slider-navigation:eq(" + next_index + ")");
        mainSliderGoTo(element);
    }

    function swipeSlide(swipeTo) {
        active_element = $(".js-main-slider-navigation.active");
        var next_index,
            cur_index = $(".js-main-slider-navigation").index(active_element);
        if (swipeTo == "prev") {
            next_index = cur_index - 1;
            if (!$("[data-slick-index=" + next_index + "]").length) next_index = $(".js-main-slider-navigation").index($(".js-main-slider-navigation:last"));
        } else {
            next_index = cur_index + 1;
            if (!$("[data-slick-index=" + next_index + "]").length) next_index = 0;
        }

        if (!$("[data-slick-index=" + next_index + "]").length) next_index = 0;
        var element = $(".js-main-slider-navigation:eq(" + next_index + ")");
        mainSliderGoTo(element);
    }

    function getSlideByIndex(link) {
        var index = $(".js-main-slider-navigation").index(link);
        return $("[data-slick-index]:eq(" + index + ")");
    }

    if (js_main_slider.length) {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    swipeSlide("prev");//"left";
                } else {
                    swipeSlide("next");//"right"
                }
            } else {
                if (yDiff > 0) {
                    // swipeSlide("prev");//"up"
                } else {
                    // swipeSlide("next");//"down"
                }
            }
            xDown = null;
            yDown = null;
        }
    }
    
    $(window).resize(function() {
        js_main_slider.slick('resize');
        if (!$(".b-performance-data").length) {
            $(".b-main-slider__item.slick-active").css({width: "100%"});
            $(".slick-track").css({width: "100vw", height: "100vh"});
            $(".slick-slide").css({width: "100%", position: "absolute", left: "0px"});
        }
    });

    $(window).on('orientationchange', function() {
        js_main_slider.slick('resize');
        if (!$(".b-performance-data").length) {
            $(".b-main-slider__item.slick-active").css({width: "100%"});
            $(".slick-track").css({width: "100%"});
            $(".slick-slide").css({width: "100%", left: $(window).width()});
        }
    });

});