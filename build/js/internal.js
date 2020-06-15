(function($) {
    /**
     * глобальные переменные, которые используются многократно
     */
    var global = {
        // время для анимаций
        animationTime:      200,
        animationLongTime: 1500,

        // проверка на ios
        isIos: navigator.userAgent.match(/(iPod|iPhone|iPad)/)
    };

    /**
     * Подключение js partials
     * Example: (dog)(dog)include('partials/form_elem_styled.js')
     */

    /** 
     * Dunlop: catalog filter_list
     * 02-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница каталога: Фильтры.
     */

    //- ====================
    //- Dunlop: filter_list_scroll
    //- 02-05-2016: Tatiana Shemenyova
    //- --------------------
    //- Работа фильтров
    //- ====================


    //- 02-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Открытие и закрытие списка фильтров

    $(document).on('click', '.js-filter-list__trigger', function() {
        if (!$(this).hasClass('opened')) {
            $('.js-filter-list__trigger.opened').removeClass('opened');
            $('.js-filter-list.opened').parents().eq(0).removeClass('opened');
            $('.js-filter-list.opened').removeClass('opened').hide();
        
            $(this).addClass('opened').next().addClass('opened').show();
            $(this).parents().eq(0).addClass('opened');
        } else {
            $(this).parents().eq(0).removeClass('opened');
            $(this).removeClass('opened').next().removeClass('opened').hide();
        }
    
    });

    //- 02-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Закрытие списка при клике ВНЕ блока

    $(document).on('click', function (e) {
        $('.js-filter-list__trigger').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.js-filter-list').has(e.target).length === 0) {
                $(this).parents().eq(0).removeClass('opened');
                $(this).removeClass('opened').next().removeClass('opened').hide();
            }
        });
    });


    /** 
     * Dunlop: catalog filter_list
     * 03-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница каталога: Фильтры - левый - сезоны.
     */

    //- ====================
    //- Dunlop: filter_list_scroll
    //- 03-05-2016: Tatiana Shemenyova
    //- --------------------
    //- Работа фильтра главного (сезоны)
    //- ====================


    //- 03-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Открытие и закрытие списка фильтров

    $(document).on('click', '.js-filter-main__trigger', function() {
        if (!$(this).hasClass('opened')) {
            var margin_next_item = $(this).outerWidth();
            $(this).parents().eq(0).next().css('margin-left', margin_next_item + 'px');

            $(this).parents().eq(0).addClass('opened');
            $(this).addClass('opened').next().addClass('opened').css('display', 'flex');
        } else {
            $(this).parents().eq(0).next().css('margin-left', '0px');
            $(this).parents().eq(0).removeClass('opened');
            $(this).removeClass('opened').next().removeClass('opened').css('display', 'none');
        }
    
    });

    //- 03-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Закрытие списка при клике ВНЕ блока

    $(document).on('click', function (e) {
        $('.js-filter-main__trigger').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.js-filter-main').has(e.target).length === 0) {
                $(this).parents().eq(0).next().css('margin-left', '0px');
                $(this).parents().eq(0).removeClass('opened');
                $(this).removeClass('opened').next().removeClass('opened').css('display', 'none');
            }
        });

    });

    $(document).ready(function () {
        $(".b-tooltip").each(function () {
            $(this).parent().bind("click", function () {
                $(this).find(".b-tooltip").toggle();
                return false;
            });
        });
    });

    /** 
     * Dunlop: how-to-auto_productivity
     * 03-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Страница "как выбрать шины": индекс нагрузки + категория скорости - инициализация карусели.
     */

    $(document).ready(function () {
        if ($('.js-performance-data').length) {
            $('.js-performance-data')
                .on('init', function (event, slick) {
                    if ($(this).find(".b-performance-data__item").length > 21) {
                        $(this).addClass("js-background-productivity");
                    }
                })
                .slick({
                    infinite: false,
                    slidesToShow: 21,
                    slidesToScroll: 5,
                    prevArrow: '<a type="button" class="slick-prev">Previous</a>',
                    nextArrow: '<a type="button" class="slick-next">Previous</a>',
                    speed: 200,
                    init: function (slick) {
                        //console.log(slick);
                    }
                });

            var perfomanceSliderTimeOut;

            $.browser_device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

            if (!$.browser_device) {
                $(document).on("mouseover", '.js-performance-data .slick-arrow', function () {
                    var slickTarget = $(this);
                    perfomanceSliderTimeOut = setInterval(function () {
                        perfomanceSlider(slickTarget)
                    }, 1);
                });

                function perfomanceSlider(slickTarget) {
                    if (slickTarget.hasClass("slick-disabled") || !slickTarget.is(":hover")) {
                        clearInterval(perfomanceSliderTimeOut);
                    } else {
                        $('.js-performance-data').slick((slickTarget.hasClass("slick-prev")) ? "slickPrev" : "slickNext");
                    }
                }
            }
        }

        $("span,div[data-hover]").hover(
            function () {
                $("[data-hover = " + $(this).attr("data-hover") + "]").each(function () {
                    $(this).addClass('js-icon-hover');
                });
            },
            function () {
                $("[data-hover = " + $(this).attr("data-hover") + "]").each(function () {
                    $(this).removeClass('js-icon-hover');
                });
            }
        )
    });


    /**
     * Dunlop: main main_slider
     * 02-05-2016: A. Sokolova
     * ---------------------
     * Главная страница: Слайдер.
     */

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

    /**
     * Dunlop: technology technology_slider
     * 07-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница технологий: Слайдер.
     */

    //- ====================
    //- Dunlop: technnology-slider
    //- 20-05-2016: Turosinskiy Vladimir
    //- --------------------
    //- Технологии слайдер
    //- Используем http://slidesjs.com/examples/standard/
    //- Расположен /src/js/vendor/jquery.slides.min.js
    //- ====================
    $(document).ready(function () {

        function initSliderJS(options) {
            var target = $(options["target"]),
                nav_previous = $(options["previous"]),
                nav_next = $(options["next"]),
                navigation = $(options["navigation"]),
                slides = $(options["slides"]),
                nav_header = $(options["nav_header"]);
            target.slidesjs({
                callback: {
                    start: function(number) {
                        var current = $(options["navigation"] + ".active").attr("data-slidesjs-item");
                        var prev = parseInt(parseInt(current) - 1);
                        var next = parseInt(parseInt(current) + 1);
                        if ($(options["navigation"]).length == next) next = 0;
                        nav_previous.text($(options["slides"]+":eq(" + prev + ")").find(nav_header).text());
                        nav_next.text($(options["slides"]+":eq(" + next + ")").find(nav_header).text());
                    }
                },
                width: 940,
                height: 528,
                navigation: false
            }).bind('mousewheel', function (event) {
                ((event.originalEvent.deltaY - event.originalEvent.deltaX)  < 0) ? nav_previous.click() : nav_next.click();
                return false;
            });
        }

        initSliderJS({
            target: '.js-technnology-slider-auto',
            previous: ".js-technnology-slider-auto  .slidesjs-previous ",
            next: ".js-technnology-slider-auto .slidesjs-next",
            navigation: ".js-technnology-slider-auto [data-slidesjs-item]",
            slides: ".js-technnology-slider-auto .slidesjs-slide",
            nav_header: ".b-technology-slider__header"
        });

        initSliderJS({
            target: '.js-technnology-slider-moto',
            previous: ".js-technnology-slider-moto  .slidesjs-previous ",
            next: ".js-technnology-slider-moto .slidesjs-next",
            navigation: ".js-technnology-slider-moto [data-slidesjs-item]",
            slides: ".js-technnology-slider-moto .slidesjs-slide",
            nav_header: ".b-technology-slider__header"
        });
    });


    /**
     * Dunlop: contacts popup feedback validation
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница контактов: Валидаци формы.
     */

    $(document).ready(function(){
        jQuery.validator.addMethod("phone", function(value, element){
           return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(value) ;
        }, "wrong phone");

        jQuery.validator.addMethod("mail", function(value, element){
            return /.+@.+\..+$/.test(value) ;
        }, "wrong email");

        $(".js-contact-form").validate({
            errorElement: "em",
            rules: {
                "s_name": {
                    required: true
                },
                "m_mail": {
                    required: true,
                    mail: true,
                },
                "s_phone": {
                    required: true,
                    phone: true
                },
                "t_question": {
                    required: true
                }
            }
        });
    });


    /**
     * Dunlop: popups
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Попапы
     */

    //- ====================
    //- Dunlop: popup
    //- 10-05-2016: Tatiana Shemenyova
    //- --------------------
    //- Работа попапов
    //- ====================


    //- 10-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Открытие попапа

    var modal

    $(document).on('click', '.js-open-popup', function () {
        $.browser_device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

        if ($.browser_device) {
            search_elementTop = $(document).scrollTop();
            // $(".b-wrapper").css({top: "-" + search_elementTop + "px"});
            $(function() {
                $('html, body').animate({
                   scrollTop: search_elementTop
                }, 500);
            });
        }
    
        $('body').addClass('modal');

        modal = $(this).attr('data-target');
        $(modal).addClass('opened').show();

        // $(modal).closest('.js-popup').css('display', 'flex');
        $(modal).closest('.js-popup').css('display', 'flex').addClass('opened');
    });

    //- 10-05-2016: Tatiana Shemenyova
    //- ---------------------
    //- Закрытие попапа при клике на ссылку

    $(document).on('click', '.js-close-popup', function () {
        $('body').removeClass('modal');
        $('.js-popup').hide().removeClass('opened');
        $(this).parents().find(modal).removeClass('opened').hide();

        // $(".b-wrapper").css({top: "0px"});
    });

    //- 17-05-2016: Vladimir Tyrosinskiy
    //- ---------------------
    //- Закрытие попапа при клике вне попапа
    $(document).click(function (event) {
        if ($("body").hasClass("modal")) {
            if (!$(event.target).closest(".b-popup__wrapper").length && !$(event.target).closest('.js-open-popup').length) $(".js-close-popup").click();
        }
    });

    //- 17-05-2016: Vladimir Tyrosinskiy
    //- ---------------------
    //- Попап обратной связи
    $(document).on("submit", ".js-contact-form", function (e) {
        var target = $(this);
        var validator = $(this).validate();

        e.preventDefault();
        if (target.valid()) {

            var sendData = 'submit_save=1&b_ajax_mode=1&'+target.serialize();

            $.ajax({
                url: target.attr('action'),
                method: "POST",
                data: sendData
            }).done(function( res ) {

                try
                {
                    res = $.parseJSON(res);
                }
                catch(e)
                {
                    res = {"error":false};
                }


                if (res["error"])
                {
                    for(var f in res["filds"])
                    {
                        target.find('[name="'+f+'"]').addClass('error');
                    }
                    return;
                }

                var button = target.find('[type="submit"]').find('.b-button__inner');
                var form = target.find(".js-form-area");
                form.slideToggle("slow");
                button.html('<span>Отправить</span><span class="b-button--form-sent">Ваше сообщение отправлено</span>');
                button.attr("disabled", true);
                setTimeout(function () {
                    form.slideToggle("slow");
                    button.attr("disabled", false);
                    validator.resetForm();
                    target.trigger('reset');
                    button.html('<span>Отправить</span>');
                    $(".js-contact-form input,textarea").removeClass("not-empty");
                }, 1000);
            });
        }
    });

    //- 17-05-2016: Vladimir Tyrosinskiy
    //- ---------------------
    //- Добавление класса элементам при заполненности полей формы
    $(document).on("change", ".js-contact-form input,textarea", function () {
        if ($(this).val()) {
            $(this).addClass("not-empty");
        } else {
            $(this).removeClass("not-empty");
        }
    });


    /**
     * Dunlop: popups
     * 10-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Карта на странице "контакты"
     */

    if ($('#js-map-contacts').length) {
    	ymaps.ready(init);

    	function init() {

    	    var myMap;

    	    myMap = new ymaps.Map("js-map-contacts", {
    	        center: [55.727891, 37.449641],
    	        zoom: 16,
    	    });

    	    myMap.controls.add('typeSelector').add('mapTools').add('zoomControl').add('scaleLine');

        	var iconStyle = ymaps.templateLayoutFactory.createClass('<a href="javascript:void(0);" title="title" class="b-product-map__baloon-map b-product-map__baloon-map--contacts">' +
                // '<img src="images/inhtml/logo-min.svg" alt="" title="" class="b-product-map__logo">' +
                '</a>');
            var placemark = new ymaps.Placemark([55.727891, 37.449641],
                {
       
                },
                {
                    iconImageHref: '/lang/ru/images/inhtml/logo-min.svg',
                    //iconImageSize: [53, 36],
                    //iconImageOffset: [-106, -174],
                    iconLayout: iconStyle,
                    //hideIcon: false
                });

            myMap.geoObjects.add(placemark);
    	}
    }
    
    /**
     * Dunlop: select
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Селекты
     */

    $(document).ready(function(){
        if ($('select').length > 0) {
            $('select').select2({
                minimumResultsForSearch: Infinity
            }); 
        }

    });

    /**
     * Dunlop: map
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Карта
     */

    var $q = $;
    var _base_lang = $q('html').attr('lang') || 'ru';

    (function ($) {
        var _base_lang = $('html').attr('lang') || 'ru';

        $.fn.gmapDealer = function (options) {
            var target = $(this);

            ymaps.ready(function () {
                dealers(options, target);
            });
        };

        var dealers = function (options, target) {
            var map,
                mapPosX, mapPosY,
                gCollection = new ymaps.GeoObjectArray(),
                currentBounds,
                gCollectionSearch = new ymaps.GeoObjectArray(),
                gCollectionShowed = new ymaps.GeoObjectArray(),
                gCollectionForSearch = gCollectionShowed,
                searchField = $('.' + options.searchFieldId),
                searchFieldBtn = $('.' + options.searchFieldBtnId),
                coordinateField = $('#' + options.coordinateFieldId),
                regionList = $('.' + options.regionListId),
                dealerList = $('.' + options.dealerListId),
                slideMapBtn = $('.js-map-slide'),
                curPlaceBtn = $('#cur-place');

            window.mapInit = {
                geoCoder: function () {
                    //var geocoder = new ymaps.geocode(regionList.find('a.clicked').attr('rel'));// Запуск процесса геокодирования
                    var geocoder = new ymaps.geocode(regionList.attr('rel'));// Запуск процесса геокодирования

                    geocoder.then(function (res) {
                        if (!res.geoObjects.getLength()) return mapInit.create({});
                        currentBounds = res.geoObjects.get(0).properties.get('boundedBy');
                        return mapInit.create({bounds: currentBounds});
                    }, function (error) {
                        return mapInit.create({});
                    });
                },
                create: function (opt) {
                    if (!opt.bounds) {
                        opt.center = [55.74954, 37.621587];
                        opt.zoom = 10;
                    }

                    opt.type = 'yandex#map';
                    map = new ymaps.Map(target.attr('id'), opt);

                    // Добавление TypeControl, ToolBar, Zoom, ScaleLine
                    map.controls.add('typeSelector').add('mapTools').add('zoomControl').add('scaleLine');

                    map.geoObjects.add(gCollection);
                    map.geoObjects.add(gCollectionSearch);

                    markersSet();
                    mapSliderInit();
                    searchInit();
                    js_animate();
                    if (options.regionListId != 'ls-change-city-pu')
                        regionListInit();

                    dealerListInit();
                }
            };

            window.mapReInit = function (regList) {
                gCollection.removeAll();
                gCollectionSearch.removeAll();
                gCollectionShowed.removeAll();

                regionList = regList || regionList;

                var geocoder = new ymaps.geocode(regionList.find('a.clicked').attr('rel'));// Запуск процесса геокодирования
                geocoder.then(function (res) {
                    if (!res.geoObjects.getLength()) return;
                    currentBounds = res.geoObjects.get(0).properties.get('boundedBy');
                    markersSet();
                }, function (err) {
                    markersSet();
                });
            };

            mapInit.geoCoder();

            function markersSet(first) {

                dealerList.find('[rel="4map"]').each(function () {
                    var mapHref = $(this).find('a.js-show-on-map');

                    if (!mapHref.length)
                        return;
                    var coord = mapHref.attr('rel').split(';');
                    var dealer = $(this).clone();
                    dealer.find('a.js-show-on-map').remove();
                    var html = dealer.html();

                    createMarker(coord[0] / 1, coord[1] / 1, html, $(this).hasClass('hidden'), dealer.find('.b-diler-block__name').text());

                    mapHref.attr('rev', gCollection.getLength() - 1);
                });

                if (!gCollection.getLength()) {
                    if (first) map.setCenter([55.76, 37.64], 10);
                    return;
                }

                // Создаем область показа по группе точек
                map.setBounds(gCollection.getBounds());
                if (map.getZoom() > 10) map.setZoom(10);
                if (!currentBounds) currentBounds = map.getBounds();
                //если вдруг что-то автоматом не поставилось

                showUsed = slideMapBtn.hasClass('opened');
            }

            var inter;

            window.mapMarkersHiddenShow = function (items, show) {

                var num1 = gCollection.getLength(), num2 = items.length, i = 0, cnt = 0;
                var num = (num2 > num1 ? num1 : num2);

                if (!num) return;

                var vis = {'visible': show}, placemarkId, placemark;

                if (show) gCollectionForSearch = gCollection;
                else gCollectionForSearch = gCollectionShowed;

                for (i = 0; i < num; i++) {
                    placemarkId = $(items[i]).find('a.js-show-on-map').attr('rev');
                    placemark = gCollection.get(placemarkId);
                    if (!placemark) continue;
                    placemark.options.set(vis);
                }
            };

            function mapSliderInit() {
                slideMapBtn.bind('click', function (e) {
                    e.preventDefault();

                    mapSliderShow2(slideMapBtn.hasClass('opened'));
                    return true;
                });

                curPlaceBtn.bind('click', function (e) {
                    e.preventDefault();
                    mapSliderShow(curPlaceBtn.hasClass('opened'));
                    return true;
                });
            }

            var showUsed = false;

            function mapSliderShow2(hide, fast) {
                var mapBox = $('#' + target.attr('id')),
                    animationSpeed = 700;
                if (hide) {
                    slideMapBtn.removeClass('opened');
                    slideMapBtn.find("span").text('Показать карту').toggleClass("b-open-close__text--more");
                    if (fast) mapBox.stop(1, 1).hide();
                    else mapBox.stop(1, 1).slideUp(animationSpeed);
                    showUsed = true;
                    return;
                }
                slideMapBtn.addClass('opened');
                slideMapBtn.find("span").text('Скрыть карту').toggleClass("b-open-close__text--more");
                var showCallBack = function () {
                    if (!showUsed) {
                        map.setBounds(gCollection.getBounds());
                        if (map.getZoom() > 10) map.setZoom(10);
                    }
                    showUsed = true;
                    map.container.fitToViewport();	//избавление от бага, когда ресайзается окно браузера при закрытой карте и она ломается при открытии
                };

                if (!fast) return mapBox.stop(1, 1).slideDown(animationSpeed, showCallBack);

                mapBox.stop(1, 1).show();
                showCallBack();
            };

            function mapSliderShow(hide) {
                var list = $('#dealer-regions ul'),
                    animationSpeed = 700;

                if (hide) {
                    list.slideUp(animationSpeed, function () {
                        curPlaceBtn.toggleClass('opened');
                    });
                } else {
                    list.slideDown(animationSpeed, function () {
                        curPlaceBtn.toggleClass('opened');
                        map.container.fitToViewport();	//избавление от бага, когда ресайзается окно браузера при закрытой карте и она ломается при открытии
                    });
                }

                return true;
            };

            function searchInit() {
                var geoResult;
                searchField.autocomplete({
                    source: function (request, response) {
                        //var reg = $(regionList).find('li a.clicked').attr('rel') || '';
                        var reg = "Россия, Москва, город Москва";
                        var region = reg;

                        if (reg.length) {
                            reg = reg.split(',');
                            var city = reg[1].replace(/^\s*город\s+/, '');

                            if (city != reg[1])
                                reg.splice(0, 0, city);
                        } else reg = [];
                        if (region) region += ', ';
                        var geocoder = new ymaps.geocode(region + request.term, {
                            strictBounds: false,
                            boundedBy: currentBounds,
                            json: false
                        });// Запуск процесса геокодирования

                        // Создание обработчика для успешного завершения геокодирования

                        geocoder.then(function (res) {

                            var checkIt = function (item) {
                                var str = '', param, val = item.properties._K.text.split(',');

                                for (var k = 0; k < val.length; k++) {
                                    for (var i = 0; i < reg.length; i++) {
                                        var regx = new RegExp('\s*' + reg[i] + '\s*');
                                        param = regx.exec(val[k]);
                                        if (param) break;
                                    }

                                    if (param) continue;
                                    if (str) str += ',';
                                    str += val[k];
                                }

                                info.push({
                                    label: str,
                                    value: str,
                                    latitude: item.geometry.getCoordinates()[0],
                                    longitude: item.geometry.getCoordinates()[1]
                                });
                            };

                            var info = [];
                            res.geoObjects.each(checkIt);
                            response(info);
                        });
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    if ($("div").is(".b-product-map__map--where-to-buy-map")) {
                        ul.addClass('full-screen'); //Ul custom class here
                    }

                    return $("<li></li>")
                        //.addClass(item.customClass) //item based custom class to li here
                        .append("<a href='#'>" + item.label + "</a>")
                        .data("ui-autocomplete-item", item)
                        .appendTo(ul);
                };

                searchFieldBtn.parent().parent().bind('submit', function (e) {
                    e.preventDefault();

                    if (!searchField.val())
                        return;

                    if (!slideMapBtn.hasClass('opened'))
                        mapSliderShow2(false, true);

                    gCollectionSearch.removeAll();
                    var region = $(regionList).find('li a.clicked').attr('rel') || '';
                    if (region) region += ', ';
                    var geocoder = new ymaps.geocode(region + searchField.val(), {
                        strictBounds: false,
                        results: 1,
                        boundedBy: currentBounds
                    });// Запуск процесса геокодирования

                    geocoder.then(function (res) {
                        if (!res.geoObjects.getLength()) return;

                        geoResult = res.geoObjects.get(0);
                        point = geoResult.geometry.getCoordinates();

                        var address = geoResult.properties._K.text;

                        //ymaps.templateLayoutFactory.createClass
                        geoResult = new ymaps.Placemark(point, {
                            balloonContent: address
                        });

                        gCollectionSearch.removeAll();
                        gCollectionSearch.add(geoResult);

                        var points = [], len = [], tmp, i, num, point2;
                        for (var k = gCollectionForSearch.getLength() - 1; k >= 0; k--) {
                            point2 = gCollectionForSearch.get(k).geometry.getCoordinates();
                            tmp = ymaps.coordSystem.geo.getDistance(point, point2);

                            for (i = 0, num = len.length; i < num; i++) {
                                if (len[i] < tmp) continue;

                                len.splice(i, 0, tmp);
                                points.splice(i, 0, point2);
                                break;
                            }

                            if (i == num) {
                                len.push(tmp);
                                points.push(point2);
                            }
                        }

                        points = points.slice(0, 2);
                        points.push(point);

                        var bounds = ymaps.util.bounds.fromPoints(points);
                        bounds[0][1] -= 0.05;
                        bounds[1][1] += 0.05;
                        map.setBounds(bounds);

                        geoResult.balloon.open();
                    });

                    return true;
                });
            }

            function regionListInit() {
                regionList.find('li a').bind('click', function (e) {
                    e.preventDefault();

                    var oThis = $(this),
                        geoResult,
                        coord = $(this).attr('rel');

                    gCollection.removeAll();
                    gCollectionSearch.removeAll();
                    gCollectionShowed.removeAll();
                    searchField.val('');

                    var geocoder = new ymaps.geocode(coord, {results: 1});// Запуск процесса геокодирования

                    // Создание обработчика для успешного завершения геокодирования
                    geocoder.then(function (res) {
                        if (!res.geoObjects.getLength()) return;
                        // Если объект был найден, то добавляем его на карту и центрируем карту по области обзора найденного объекта

                        mapSliderShow2(false);
                        currentBounds = res.geoObjects.get(0).properties.get('boundedBy');

                        if (!gCollection.getLength())
                            map.setBounds(currentBounds);

                        mapSliderShow(1);
                    }, function (error)	// Процесс геокодирования завершен неудачно
                    {
                        console.log("Произошла ошибка: " + error.message);
                    });

                    $(regionList).find('li a.clicked').removeClass('clicked');	//по-выделенному ищем в форме поиска
                    $(this).addClass('clicked');

                    $(dealerList).empty();

                    AC.simple('', 'POST', {'submit_dealers': true, s_region: coord}, function (text) {
                        $q(dealerList).html(text);
                        markersSet();
                    });

                    curPlaceBtn.html($(this).text() + '<i>&nbsp;</i>');

                    return true;
                });
            }

            function dealerListInit() {

                //dealerList.find('[rel="4map"].js-dealer a.js-show-on-map').on('click', function (e) {
                //dealerList.find('a.js-show-on-map').on('click', function (e) {
                $(document).on('click', dealerList.find('a.js-show-on-map').selector, function (e) {
                    e.preventDefault();

                    if (!slideMapBtn.hasClass('opened'))
                        mapSliderShow2(false, true);

                    var scrollTarget = $('.js-map-slide');

                    if ($(window).scrollTop() > scrollTarget.offset().top) {
                        $('html, body').stop().animate({scrollTop: scrollTarget.offset().top}, 1000);
                    }

                    var placemarkId = $(this).attr('rev'),
                        placemark = gCollection.get(placemarkId);

                    map.setZoom(15);
                    placemark.balloon.open();
                    return true;
                });
            }

            function createMarker(posX, posY, infoboxHtml, hidden, dilerName) {

                var closeBalloonTemplate = ymaps.templateLayoutFactory.createClass(
                    '<a href="javascript:void(0);" title="' + dilerName + '" class="b-product-map__close-link"><i class="icon-x"></i></a>',
                    {
                        build: function () {
                            this.constructor.superclass.build.call(this);
                            $(this.getParentElement()).bind('click', function () {
                                map.balloon.close();
                            })
                        }
                    }
                );

                // style="margin: -161px 0 0 -81px;"
                var sampleBalloonTemplate = ymaps.templateLayoutFactory.createClass
                (
                    '<div class="b-product-map__ballon-block"> $[[options.closeButtonLayout]] $[properties.balloonContent]</div>'
                );

                var iconStyle = ymaps.templateLayoutFactory.createClass('<a href="javascript:void(0);" title="' + dilerName + '" class="b-product-map__baloon-map">' +
                        // '<img src="images/inhtml/logo-min.svg" alt="" title="" class="b-product-map__logo">' +
                    '</a>');

                var placemark = new ymaps.Placemark([posX, posY],
                    {
                        balloonContent: infoboxHtml
                    },
                    {
                        iconImageHref: '/lang/ru/images/inhtml/pin.png',
                        visible: !hidden,
                        //iconImageSize: [53, 36],
                        //iconImageOffset: [-106, -174],
                        balloonLayout: sampleBalloonTemplate,
                        balloonCloseButtonLayout: closeBalloonTemplate,
                        balloonShadow: false,
                        iconLayout: iconStyle,
                        balloonIconImageOffset: [-106, -174],
                        //hideIcon: false
                    });

                placemark.events.add('balloonopen', function (event) {
                    console.log(event.get('target').balloon);
                    var point = event.get('target').geometry.getCoordinates();
                    map.setCenter(point);
                    var position = map.getGlobalPixelCenter();
                    map.setGlobalPixelCenter([position[0], position[1] - 26]); //подгоняем под флажок

                    // event.get('target').balloon.setPosition([position[0] - 161, position[1] - 81]);
                    $(".b-product-map__ballon-block").css("margin-top", -($(".b-product-map__ballon-block").outerHeight() - 44));
                    $(".b-product-map__ballon-block").css("margin-left", -(($(".b-product-map__ballon-block").outerWidth() / 2) - 26));
                });

                if (!hidden) {
                    var placemark2 = new ymaps.Placemark([posX, posY]);
                    ymaps.util.extend(placemark2, placemark);
                    gCollectionShowed.add(placemark2);
                }

                gCollection.add(placemark);
            }

            function js_animate() {
                $(document).on("click", ".js-show-phone", function () {
                    var dealer = $(this).parents(".js-dealer");
                    var phone = dealer.find(".js-phone");

                    var dealerName = dealer.find('.b-diler-block__name').text();

                    if (phone.css('display') != "none") {
                        $(this)
                            .removeClass("b-diler-block__open-phone")
                            .addClass("b-diler-block__show-phone")
                            .attr("title", "Показать телефон")
                            .find("span")
                            .removeClass("b-diler-block__border--open")
                            .text("Показать телефон");
                        phone.hide();

                        //см файл /lang/ru/js/main.js
                        //web_analitycs('showTel', (false)+'');
                        //ga('send', 'event', 'showTel', 'false', dealerName);
                    } else {
                        $(this)
                            .removeClass("b-diler-block__show-phone")
                            .addClass("b-diler-block__open-phone")
                            .attr("title", "Скрыть телефон")
                            .find("span")
                            .addClass("b-diler-block__border--open")
                            .text("Скрыть телефон");
                        phone.show().css("display", "block");

                        //см файл /lang/ru/js/main.js
                        //web_analitycs('showTel', (true)+'');

                      //  ga('send', 'event', 'showTel', 'true', dealerName);
                    }
                });


                $(document).on('click', '.js-show-other', function (e) {
                    e.preventDefault();
                    $(this).find("span").toggleClass("b-open-close__text--more");
                    var showed = $(this).hasClass('opened'),
                        add = (showed ? 'hidden' : 'open'),
                        rm = (showed ? 'open' : 'hidden'),
                        item = $(".js-dealers-other." + rm);

                    $(this).toggleClass('opened');

                    if (showed)    $(this).find("span").text("Показать остальных диллеров");
                    else        $(this).find("span").text("Скрыть остальных диллеров");
                    $(".js-dealers-other").toggle();
                    item.removeClass(rm).addClass(add);
                    setTimeout(function () {
                        mapMarkersHiddenShow(item.find('.js-dealer'), !showed);
                    }, 10);
                });
            }
        };

        $.fn.gmapContact = function (options) {
            target = $(this);
            ymaps.ready(function () {
                contacts(options, target);
            });
        };

        var contacts = function (options, target) {
            var map,
                point = [55.728, 37.44955];

            if ($(window).height() > 800)
                target.css('height', '600px');

            map = new ymaps.Map(target.attr('id'),
                {
                    center: point,
                    zoom: 16,
                    type: 'yandex#map'
                });

            // Добавление TypeControl, ToolBar, Zoom, ScaleLine
            map.controls.add('typeSelector').add('mapTools').add('zoomControl').add('scaleLine');

            var placemark = new ymaps.Placemark(point, {},
                {
                    iconImageHref: '/lang/' + _base_lang + '/css/pic-gmap-marker-contact.png',
                    iconImageSize: [123, 84],
                    iconImageOffset: [-40, -78]
                });
            map.geoObjects.add(placemark);
        };
    })(jQuery);

    $q(document).ready(function () {

        if ($q('#gmap-catalog').length) {
            $q('#gmap-catalog').gmapDealer(
                {
                    searchFieldId: 'js-gmap-search',
                    searchFieldBtnId: 'js-gmap-search-btn',
                    dealerListId: 'js-catalog-dealers',
                    regionListId: 'js-ls-change-region'
                });
        }

        $(document).on("click", ".js-show-table", function (e) {
            e.preventDefault();
            var table = $(this).parents(".b-table-info").find("table");
            var link_text = (table.css("display") == "none") ? "Скрыть список типоразмеров" : "Показать список типоразмеров";
            $(this).find("span").toggleClass("b-open-close__text--more");
            $(this).attr("title", link_text).find("span").text(link_text);
            table.toggle();
        });

        if ($q('#gmap-contact').length)
            $q('#gmap-contact').gmapContact();

        $(document).on("click", ".js-select-region", function () {
            $("#choose-city").hide().parents(".js-popup").hide().removeClass('opened');
            $("#choose-region").show();
        });

        $(document).on("click", "#choose-region li a", function () {

            var region_class = "b-choose-city__link-city--selected clicked";
            $("#choose-region a").removeClass(region_class);
            $(this).addClass(region_class).parents(".js-popup").css("display", "none");

            $("body").removeClass("modal");
            $(".js-select-city").text($(this).text());
        });

        $(document).on("click", "#choose-city li a", function () {
            var region_class = "b-choose-city__link-city--selected";
            var self = this;


            $("#choose-city .b-choose-city__link-city--selected").removeClass(region_class);
            $(this).addClass(region_class).parents(".js-popup").hide();

            $.ajax({
                type	:'post',
                dataType: 'html',
                data	: [
                    {name:'submit_dealers_city',value:true},
                    {name:'s_region',value: $(self).attr('rel')},
                ],
                success : function(res)
                {
                    $("#choose-city").hide();
                    $('.js-select-city').text($(self).text());
                    $("body").removeClass("modal");

                    var $html = $('<div>'+res+'</div>');

                    var dealersTop = $html.find('.js-dealers-top').html();
                    var dealersOther = $html.find('.b-diler-block--other').html();


                    $('.js-dealers-top').html(dealersTop);
                    $('.b-diler-block--other').html(dealersOther);

                    mapReInit($('#ls-change-region-pu'));

                }
            });
        });

        //$(document).on("click", ".b-container--product a.ls-change-city", function () {
        $(document).on("click", "a.ls-change-city", function () {

            $('#choose-region').show().find('#ls-change-region-pu').show();
            //$('#ls-change-region-pu').show();
            //$("body").removeClass("modal");
        });
        $(document).on("click", "#ls-change-region-pu li a", function () {

            var region_class = "b-choose-city__link-city--selected clicked";
            $("#choose-region a").removeClass(region_class);
            var self = this;

    	    $("body").addClass("modal");

            AC.simple('', 'POST', {'submit_dealers': true, s_region: $(this).attr('rel')}, function (text) {

                $(self).addClass(region_class).parents(".js-popup").css("display", "none");

                $('#ls-change-city-pu').html($(text).html()).css("display", "flex").find('#choose-city').show();
            });
        });
    });



    /**
     * Dunlop: history
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * История
     */

    function adriver_counter(counter, place) {
        var RndNum4NoCash = Math.round(Math.random() * 1000000000);
        var ar_Tail = 'unknown';
        if (document.referrer) ar_Tail = escape(document.referrer);

        var place = (place ? '&sz=' + place : '');
        var html = '<img src="http://ad.adriver.ru/cgi-bin/rle.cgi?' + 'sid=' + counter + place + '&bt=21&pz=0&rnd=' + RndNum4NoCash + '&tail256=' + ar_Tail + '" border="0" width="1" height="1" />';

        $("#adriver_counter").html(html);
    }

    (function ($) {
        $.fn.historySlider = function (options) {
            var settings = {slideSpeed: 800};
            $.extend(settings, options);

            var target = $(this),
                sausage = $('#history-slider div.sausage'),
                yearRefs = $('.paging a'),
                wheel = $('#wheel'),
                wheelDiv = $('#wheel div'),
                wheelShadow = $('#wheel i'),
                yearBtn = $('.paging div'),
                yearBtnNumber = yearBtn.find('span'),
                yearBtnStep = 80,
                yearBtnSpeed = 80,

                wheelSize = 362,
                wheelPos,
                wheelRotationCounter = 0,
                newWheelRotationCounter = 0,
                wheelNumber = 0,
                wheelTrueNumber,

                direction,
                stepCount = 0,
                leftStepCount = 0,
                slideTime,
                startPosition,
                slideLength,
                wheelStep,
                nextTarget,
                destination,
                index = 0,
                cur = 0,
                wheelInt,
                sign = true,
                sign2 = true,
                sign3 = true,
                isIE = false,
                isIOs = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) ? true : false;



            init = function () {

                if (isIOs) {
                    wheel.css("display", "none");
                    sausage.css("background-image", "url('/lang/ru/images/content/history/history_sample.jpg')");
                }

                if (isIE)
                    wheelDiv.css('background', "url('/lang/ru/images/content/history/pic-history-wheels-ie.png') 0 0 no-repeat");

                fitSize();

                $(window).bind('resize', function () {
                    if (sign)
                        fitSize();

                    sign = false;
                    setTimeout(function () {
                        sign = true;
                    }, 1000);
                });

                yearBtnNumber.eq(0).fadeIn(settings.slideSpeed / 16);
                yearBtn.draggable({
                    axis: 'x',
                    containment: 'parent',
                    stop: function () {
                        var shift = parseInt($(this).css('left'));
                        index = Math.floor(shift / yearBtnStep);

                        var tail = shift % yearBtnStep;

                        if (tail > 52)
                            index++;

                        cur = yearRefs.filter('.active').index();

                        $(this).animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                        rotateInit();
                    }
                });
                yearRefs.bind('click', function (e) {
                    e.preventDefault();

                    if (!sign3)
                        return;

                    index = $(this).index();
                    cur = yearRefs.filter('.active').index();

                    var counter = 184731;
                    var placement = '';

                    adriver_counter(counter, placement);
                    yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);
                    rotateInit();
                });

            };

            function sideSlide(direction) {
                if (direction == 'left') {
                    cur = yearRefs.filter('.active').index();
                    if (cur > 0) {
                        index = cur - 1;

                        yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                        rotateInit();
                    }
                } else if (direction == 'right') {
                    cur = yearRefs.filter('.active').index();
                    if (cur < 8) {
                        index = cur + 1;

                        yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                        rotateInit();
                    }
                }
            }

            rotateInit = function () {
                if (index != cur) {
                    stepCount = yearRefs.eq(index).attr('name') - yearRefs.eq(cur).attr('name');

                    if (stepCount > 0) {
                        direction = 'right';
                    } else {
                        stepCount = -1 * stepCount;
                        direction = 'left';
                        leftStepCount = 0;
                    }

                    rotate(direction);
                    yearBtnNumber.filter(':visible').fadeOut(1);
                    yearBtnNumber.eq(index).fadeIn(settings.slideSpeed);

                    sign3 = false;
                    yearBtn.draggable('disable');
                }
            };

            rotate = function () {
                startPosition = parseInt(sausage.css('left'));
                if (direction == 'right') {
                    nextTarget = yearRefs.eq(index - stepCount + 1);

                    wheelPos = 0;
                    slideLength = parseInt(nextTarget.attr('rel')) + startPosition;
                    destination = -1 * nextTarget.attr('rel');

                } else {
                    nextTarget = yearRefs.eq(cur - leftStepCount - 1);
                    if (!(isIE && wheelPos > 5)) {
                        wheelPos = 3;
                    }
                    slideLength = Math.abs(parseInt(nextTarget.attr('rel')) + startPosition);
                    destination = -1 * nextTarget.attr('rel');
                }

                wheelStep = slideLength / 32;
                wheelRotationCounter = 0;
                sign2 = true;
                if (!isIOs)
                    sausage.css('left', startPosition + 'px').animate({'left': destination + 'px'}, {
                        duration: settings.slideSpeed,
                        easing: 'linear',
                        step: function _stepCallback(now, opts) {
                            newWheelRotationCounter = Math.floor(Math.abs(Math.abs(startPosition) - Math.abs(now)) / wheelStep);
                            if (wheelRotationCounter != newWheelRotationCounter) {
                                wheelRotationCounter = newWheelRotationCounter;
                                rotateWheel(direction);
                            }
                        },
                        complete: function _completeCallback() {
                            stepCount--;
                            leftStepCount++;
                            wheelNumber = parseInt(nextTarget.attr('name')) - 1;
                            wheelRotationCounter = 0;
                            wheelPos = 1;

                            if (stepCount > 0)
                                rotate(direction);
                            else {
                                yearRefs.removeClass('active'); //Remove all active class
                                yearRefs.eq(index).addClass('active'); //Add active class
                                if (!(isIE && (wheelNumber == '3' || wheelNumber == '8'))) {
                                    setTimeout(function () {
                                        wheelDiv.css('backgroundPosition', '0 ' + (-1 * wheelNumber * wheelSize) + 'px');
                                    }, settings.slideSpeed / 32);
                                }

                                if (isIE) {
                                    if (wheelNumber == '3' || wheelNumber == '8') {
                                        wheelShadow.css('display', 'none');
                                        wheelPos = 8;
                                    } else {
                                        wheelShadow.css('display', 'block');
                                    }
                                }

                                sign3 = true;
                                yearBtn.draggable('enable');
                            }
                        }
                    });
                else {
                    stepCount--;
                    leftStepCount++;
                    wheelRotationCounter = 0;
                    wheelPos = 1;
                    destination += 300;
                    sausage.css({
                        '-webkit-transform': 'translate3d(' + destination + 'px, 0px, 0px)',
                        '-webkit-transition': '-webkit-transform ' + (settings.slideSpeed / 1000) + 's linear'
                    });
                
    /*                wheelInt = setInterval(function () {
                        rotateWheel(direction);
                    }, settings.slideSpeed / 32);*/

                    if (stepCount > 0) {
                        setTimeout(function () {
                            rotate(direction);
                            clearInterval(wheelInt);
                        }, settings.slideSpeed);
                    }
                    else {
                        setTimeout(function () {
                            yearRefs.removeClass('active'); //Remove all active class
                            yearRefs.eq(index).addClass('active'); //Add active class
                            sign3 = true;
                            yearBtn.draggable('enable');
                        }, settings.slideSpeed);
                    }
                }
            };

            function rotateWheel(direction) {

                if (direction == 'right') {
                    if (isIE) {
                        if (wheelRotationCounter < 16 && !wheelShadow.is(':visible')) {
                            wheelShadow.css('display', 'block');
                        }

                        if (wheelPos < 5 || wheelPos > 8)
                            wheelPos++;

                        if (wheelPos == 4)
                            wheelPos = 1;

                        if (wheelRotationCounter == 16)
                            wheelPos = 5;
                        if (wheelRotationCounter == 18) {
                            wheelPos = 6;
                            wheelShadow.css('display', 'none');
                        }
                        if (wheelRotationCounter == 20) {
                            wheelPos = 7;
                            wheelNumber++;
                        }

                        if (wheelNumber != '3' && wheelNumber != '8') {
                            if (wheelRotationCounter == 22) {
                                wheelPos = 6;
                                wheelShadow.css('display', 'block');
                            }
                            if (wheelRotationCounter == 24)
                                wheelPos = 5;
                            if (wheelRotationCounter > 24 && wheelPos > 4)
                                wheelPos = 1;
                        }
                    } else {

                        if (wheelDiv.add(wheelShadow).css('opacity') == '0' && (wheelRotationCounter < 16)) {
                            wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 4);
                        }

                        wheelPos++;

                        if (wheelPos == 4)
                            wheelPos = 1;

                        if (wheelRotationCounter > 16 && sign2) {
                            sign2 = false;

                            if (wheelNumber != '2' && wheelNumber != '7')
                                wheelDiv.add(wheelShadow).animate({opacity: '.4'}, settings.slideSpeed / 6, function () {
                                    wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 6);
                                });
                            else {
                                wheelDiv.add(wheelShadow).animate({opacity: '0'}, settings.slideSpeed / 3);
                            }
                        }

                        if (wheelRotationCounter == 20) {
                            wheelPos = 1;
                            wheelNumber++;
                        }
                    }

                    if (wheelNumber > 4 && wheelNumber < 9)
                        wheelTrueNumber = 4;
                    else
                        wheelTrueNumber = wheelNumber;

                    if (!isIOs)
                        wheelDiv.css('backgroundPosition', (-1 * wheelSize * wheelPos) + 'px ' + (-1 * wheelTrueNumber * wheelSize) + 'px');

                } else {
                    if (isIE) {
                        if (wheelRotationCounter < 8 && !wheelShadow.is(':visible')) {
                            wheelShadow.css('display', 'block');
                        }

                        if (wheelPos < 5 || wheelPos > 8)
                            wheelPos--;

                        if (wheelPos == 0)
                            wheelPos = 3;

                        if (wheelRotationCounter == 8)
                            wheelPos = 5;
                        if (wheelRotationCounter == 10) {
                            wheelPos = 6;
                            wheelShadow.css('display', 'none');
                        }
                        if (wheelRotationCounter == 12) {
                            wheelPos = 7;
                            wheelNumber--;
                        }
                        if (wheelNumber != '3' && wheelNumber != '8') {
                            if (wheelRotationCounter == 14) {
                                wheelPos = 6;
                                wheelShadow.css('display', 'block');
                            }
                            if (wheelRotationCounter == 16)
                                wheelPos = 5;
                            if (wheelRotationCounter > 16 && wheelPos > 4)
                                wheelPos = 1;
                        }
                    } else {

                        wheelPos--;

                        if (wheelPos <= 0)
                            wheelPos = 3;

                        if (wheelRotationCounter > 8 && sign2) {
                            sign2 = false;

                            if (wheelNumber != '4' && wheelNumber != '9')
                                wheelDiv.add(wheelShadow).animate({opacity: '.4'}, settings.slideSpeed / 6, function () {
                                    wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 6);
                                });
                            else
                                wheelDiv.add(wheelShadow).animate({opacity: '0'}, settings.slideSpeed / 3);
                        }

                        if (wheelRotationCounter == 12) {
                            wheelPos = 1;
                            wheelNumber--;
                        }
                    }

                    if (wheelNumber > 4 && wheelNumber < 9)
                        wheelTrueNumber = 4;
                    else
                        wheelTrueNumber = wheelNumber;

                    if (!isIOs)
                        wheelDiv.css('backgroundPosition', (-1 * wheelSize * wheelPos) + 'px ' + (-1 * wheelTrueNumber * wheelSize) + 'px');
                }
            }

            function fitSize() {
                var index,
                    windowWidth = $(window).width(),
                    windowHeight = $(window).height(),

                    paging = $('.paging'),
                    wrap = $('#wrapper-history'),
                    yearRef9 = yearRefs.eq(8),
                    wrapOffset,//wrap margin-left - путь по которому крутится колесо
                    wheelOffset,//wheel margin-left - отступы колеса
                    slidesOffset,//left - baserel
                    slide9Offset1,//rel
                    slide9Offset2,
                    sizeDelimeter;

                if (windowWidth < 1000) {
                    wrapOffset = 2;
                    wheelOffset = 19;
                    slidesOffset = 300;//rel
                    slide9Offset1 = 405;
                    slide9Offset2 = 405;
                    sizeDelimeter = 1050;
                } else if (windowWidth >= 1000 && windowWidth < 1280) {
                    wrapOffset = 133;
                    wheelOffset = 39;
                    slidesOffset = 300;
                    slide9Offset1 = 270;
                    slide9Offset2 = 370;
                    sizeDelimeter = 1200;
                } else if (windowWidth >= 1280 && windowWidth < 1440) {
                    wrapOffset = 211;
                    wheelOffset = -1;
                    slidesOffset = 150;
                    slide9Offset1 = 200;
                    slide9Offset2 = 250;
                    sizeDelimeter = 1400;
                } else if (windowWidth >= 1440 && windowWidth < 1700) {
                    wrapOffset = 291;
                    wheelOffset = -92;
                    slidesOffset = 50;
                    slide9Offset1 = 122;
                    slide9Offset2 = 180;
                    sizeDelimeter = 1600;
                    yearBtnStep = 96;
                    yearBtnSpeed = 96;
                } else {
                    wrapOffset = 460;
                    wheelOffset = -138;
                    slidesOffset = 0;
                    slide9Offset1 = -45;
                    slide9Offset2 = 50;
                    sizeDelimeter = 1700;
                    yearBtnStep = 96;
                    yearBtnSpeed = 96;
                }

                index = yearRefs.filter('.active').index();
                wrap.css('marginLeft', wrapOffset + 'px');
                wheel.css('marginLeft', wheelOffset + 'px');

                yearRefs.each(function () {
                    $(this).attr('rel', parseInt($(this).attr('baserel')) + slidesOffset);
                });

                if (index != 8)

                    sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slidesOffset + 'px');

                if (windowWidth > sizeDelimeter) {
                    yearRef9.attr('rel', parseInt(yearRef9.attr('baserel')) + slide9Offset1);
                    if (index == 8)
                        sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slide9Offset1 + 'px');
                } else {
                    yearRef9.attr('rel', parseInt(yearRef9.attr('baserel')) + slide9Offset2);
                    if (index == 8)
                        sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slide9Offset2 + 'px');
                }
            }

            init();
        };

        $.fn.wheelDataSlider = function (options) {
            var settings = {speed: 400};
            $.extend(settings, options);

            var target = $(this),
                refs = $(this).find('div.params-nav a'),
                tables_div = target.find('div.tables');
            tables = tables_div.find('table.table_top,table.table_bottom').not('.ls-list');

            height = tables.eq(0).css('height');

            if (tables.eq(1).length > 0) {
                height2 = tables.eq(1).css('height');
                height = height > height2 ? height : height2;
            }

            if (!tables_div.hasClass('ls-no-height')) {
                tables_div.css('height', height);
            }

            if (tables.length == 1)
                tables.eq(0).fadeIn(settings.speed);
            else
                tables_div.find('.table_' + $(this).find('div.params-nav a.active').attr('rel')).fadeIn(settings.speed);

            if (refs.length > 1) {
                refs.bind('click', function (e) {
                    e.preventDefault();

                    if ($(this).hasClass('active'))
                        return false;

                    refs.removeClass('active');
                    $(this).addClass('active');

                    tables.fadeToggle(settings.speed);

                    return true;
                });
            }
            else {
                refs.eq(0).css('cursor', 'default');
                refs.bind('click', function (e) {
                    return false;
                });
            }
        };

        if ($('#history-slider').length) {
            $('#history-slider').historySlider();
        }
    })(jQuery);

    /**
     * Dunlop: history
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Страница каталога
     */

    $(document).ready(function () {
        if ($('.b-catalog-filter').length) {
            var menuScrollTop = $('.b-catalog-filter').offset().top;
            $(window).on("scroll", function(){
                var $element = $('.b-catalog-filter');
                if ($(window).scrollTop() > menuScrollTop)
                    $element.addClass("position-fixed");
                else
                    $element.removeClass("position-fixed");
            });
        }
    });

    /**
     * Dunlop: history
     * 18-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Предзагрузчик на главной
     */

    /**
     * Dunlop: history
     * 18-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Предзагрузчик на главной
     */

    var images = [];
    if ($("#pics-cutter").length) {
        images = ["/lang/ru/images/content/history/bg-history-slide.jpg", "/lang/ru/images/content/history/pic-history-wheels.png"];
    } else {
        $(".js-preloader-image").each(function (key, element) {
            images[key] = $(element).attr("src");
        });
    }

    if (images.length > 0) {
        var preloader_count = $(".js-preloader-count");
        var preloader_line = $(".js-preloader-line");
        $.imgpreloader({
            paths: images
        }).done(function ($allImages) {
            if ($("#pics-cutter").length) {
                $("#pics-cutter").show();
            } else {
                $(".b-main-slider__item").css("width", "100vw");
                $(".js-main-slider-navigation:first").addClass("active").animate({margin: "0 0 0 -50px"}, 1500);
                $(".js-main-slider").toggle();
            }
            $(".b-loading").hide();
        }).progress(function ($image, $allImages, $properImages, $brokenImages, isBroken, percentage) {
            preloader_line.css("width", percentage + "%");
            if ($(window).width() > parseInt(preloader_count.css("width")) + (percentage * parseInt($(window).width())) / 100) {
                preloader_count.text(percentage + "%").css("left", percentage + "%");
            } else {
                preloader_count.text(percentage + "%").css("left", "auto").css("right", "0%");
            }
        });
    }
    /*
      SlidesJS 3.0.4 http://slidesjs.com
      (c) 2013 by Nathan Searles http://nathansearles.com
      Updated: June 26th, 2013
      Apache License: http://www.apache.org/licenses/LICENSE-2.0
    */
    (function(){(function(e,t,n){var r,i,s;s="slidesjs";i={width:940,height:528,start:1,navigation:{active:!0,effect:"slide"},pagination:{active:!0,effect:"slide"},play:{active:!1,effect:"easeOutCubic",interval:5e3,auto:!1,swap:!0,pauseOnHover:!1,restartDelay:2500},effect:{slide:{speed:1500},fade:{speed:300,crossfade:!0}},callback:{loaded:function(){},start:function(){},complete:function(){}}};r=function(){function t(t,n){this.element=t;this.options=e.extend(!0,{},i,n);this._defaults=i;this._name=s;this.init()}return t}();r.prototype.init=function(){var n,r,i,s,o,u,a=this;n=e(this.element);this.data=e.data(this);e.data(this,"animating",!1);e.data(this,"total",n.children().not(".slidesjs-navigation",n).length);e.data(this,"current",this.options.start-1);e.data(this,"vendorPrefix",this._getVendorPrefix());if(typeof TouchEvent!="undefined"){e.data(this,"touch",!0);this.options.effect.slide.speed=this.options.effect.slide.speed/2}n.css({overflow:"hidden"});n.slidesContainer=n.children().not(".slidesjs-navigation",n).wrapAll("<div class='slidesjs-container'>",n).parent().css({overflow:"hidden",position:"relative"});e(".slidesjs-container",n).wrapInner("<div class='slidesjs-control'>",n).children();e(".slidesjs-control",n).css({position:"relative",left:0});e(".slidesjs-control",n).children().addClass("slidesjs-slide").css({position:"absolute",top:0,left:0,width:"100%",zIndex:0,display:"none",webkitBackfaceVisibility:"hidden"});e.each(e(".slidesjs-control",n).children(),function(t){var n;n=e(this);return n.attr("slidesjs-index",t)});if(this.data.touch){e(".slidesjs-control",n).on("touchstart",function(e){return a._touchstart(e)});e(".slidesjs-control",n).on("touchmove",function(e){return a._touchmove(e)});e(".slidesjs-control",n).on("touchend",function(e){return a._touchend(e)})}n.fadeIn(0);this.update();this.data.touch&&this._setuptouch();e(".slidesjs-control",n).children(":eq("+this.data.current+")").eq(0).fadeIn(0,function(){return e(this).css({zIndex:10})});if(this.options.navigation.active){o=e("<a>",{"class":"slidesjs-previous slidesjs-navigation",href:"#",title:"Previous",text:"Previous"}).appendTo(n);r=e("<a>",{"class":"slidesjs-next slidesjs-navigation",href:"#",title:"Next",text:"Next"}).appendTo(n)}e(".slidesjs-next",n).click(function(e){e.preventDefault();a.stop(!0);return a.next(a.options.navigation.effect)});e(".slidesjs-previous",n).click(function(e){e.preventDefault();a.stop(!0);return a.previous(a.options.navigation.effect)});if(this.options.play.active){s=e("<a>",{"class":"slidesjs-play slidesjs-navigation",href:"#",title:"Play",text:"Play"}).appendTo(n);u=e("<a>",{"class":"slidesjs-stop slidesjs-navigation",href:"#",title:"Stop",text:"Stop"}).appendTo(n);s.click(function(e){e.preventDefault();return a.play(!0)});u.click(function(e){e.preventDefault();return a.stop(!0)});this.options.play.swap&&u.css({display:"none"})}if(this.options.pagination.active){i=e("<ul>",{"class":"slidesjs-pagination"}).appendTo(n);e.each(new Array(this.data.total),function(t){var n,r;n=e("<li>",{"class":"slidesjs-pagination-item"}).appendTo(i);r=e("<a>",{href:"#","data-slidesjs-item":t,html:""}).appendTo(n);return r.click(function(t){t.preventDefault();a.stop(!0);return a.goto(e(t.currentTarget).attr("data-slidesjs-item")*1+1)})})}e(t).bind("resize",function(){return a.update()});this._setActive();this.options.play.auto&&this.play();return this.options.callback.loaded(this.options.start)};r.prototype._setActive=function(t){var n,r;n=e(this.element);this.data=e.data(this);r=t>-1?t:this.data.current;e(".active",n).removeClass("active");return e(".slidesjs-pagination li:eq("+r+") a",n).addClass("active")};r.prototype.update=function(){var t,n,r;t=e(this.element);this.data=e.data(this);e(".slidesjs-control",t).children(":not(:eq("+this.data.current+"))").css({display:"none",left:0,zIndex:0});r=t.width();n=this.options.height;this.options.width=r;this.options.height=n;return e(".slidesjs-control, .slidesjs-container",t).css({width:r,height:n})};r.prototype.next=function(t){var n;n=e(this.element);this.data=e.data(this);e.data(this,"direction","next");t===void 0&&(t=this.options.navigation.effect);return t==="fade"?this._fade():this._slide()};r.prototype.previous=function(t){var n;n=e(this.element);this.data=e.data(this);e.data(this,"direction","previous");t===void 0&&(t=this.options.navigation.effect);return t==="fade"?this._fade():this._slide()};r.prototype.goto=function(t){var n,r;n=e(this.element);this.data=e.data(this);r===void 0&&(r=this.options.pagination.effect);t>this.data.total?t=this.data.total:t<1&&(t=1);if(typeof t=="number")return r==="fade"?this._fade(t):this._slide(t);if(typeof t=="string"){if(t==="first")return r==="fade"?this._fade(0):this._slide(0);if(t==="last")return r==="fade"?this._fade(this.data.total):this._slide(this.data.total)}};r.prototype._setuptouch=function(){var t,n,r,i;t=e(this.element);this.data=e.data(this);i=e(".slidesjs-control",t);n=this.data.current+1;r=this.data.current-1;r<0&&(r=this.data.total-1);n>this.data.total-1&&(n=0);i.children(":eq("+n+")").css({display:"block",left:this.options.width});return i.children(":eq("+r+")").css({display:"block",left:-this.options.width})};r.prototype._touchstart=function(t){var n,r;n=e(this.element);this.data=e.data(this);r=t.originalEvent.touches[0];this._setuptouch();e.data(this,"touchtimer",Number(new Date));e.data(this,"touchstartx",r.pageX);e.data(this,"touchstarty",r.pageY);return t.stopPropagation()};r.prototype._touchend=function(t){var n,r,i,s,o,u,a,f=this;n=e(this.element);this.data=e.data(this);u=t.originalEvent.touches[0];s=e(".slidesjs-control",n);if(s.position().left>this.options.width*.5||s.position().left>this.options.width*.1&&Number(new Date)-this.data.touchtimer<250){e.data(this,"direction","previous");this._slide()}else if(s.position().left<-(this.options.width*.5)||s.position().left<-(this.options.width*.1)&&Number(new Date)-this.data.touchtimer<250){e.data(this,"direction","next");this._slide()}else{i=this.data.vendorPrefix;a=i+"Transform";r=i+"TransitionDuration";o=i+"TransitionTimingFunction";s[0].style[a]="translateX(0px)";s[0].style[r]=this.options.effect.slide.speed*.85+"ms"}s.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){i=f.data.vendorPrefix;a=i+"Transform";r=i+"TransitionDuration";o=i+"TransitionTimingFunction";s[0].style[a]="";s[0].style[r]="";return s[0].style[o]=""});return t.stopPropagation()};r.prototype._touchmove=function(t){var n,r,i,s,o;n=e(this.element);this.data=e.data(this);s=t.originalEvent.touches[0];r=this.data.vendorPrefix;i=e(".slidesjs-control",n);o=r+"Transform";e.data(this,"scrolling",Math.abs(s.pageX-this.data.touchstartx)<Math.abs(s.pageY-this.data.touchstarty));if(!this.data.animating&&!this.data.scrolling){t.preventDefault();this._setuptouch();i[0].style[o]="translateX("+(s.pageX-this.data.touchstartx)+"px)"}return t.stopPropagation()};r.prototype.play=function(t){var n,r,i,s=this;n=e(this.element);this.data=e.data(this);if(!this.data.playInterval){if(t){r=this.data.current;this.data.direction="next";this.options.play.effect==="fade"?this._fade():this._slide()}e.data(this,"playInterval",setInterval(function(){r=s.data.current;s.data.direction="next";return s.options.play.effect==="fade"?s._fade():s._slide()},this.options.play.interval));i=e(".slidesjs-container",n);if(this.options.play.pauseOnHover){i.unbind();i.bind("mouseenter",function(){return s.stop()});i.bind("mouseleave",function(){return s.options.play.restartDelay?e.data(s,"restartDelay",setTimeout(function(){return s.play(!0)},s.options.play.restartDelay)):s.play()})}e.data(this,"playing",!0);e(".slidesjs-play",n).addClass("slidesjs-playing");if(this.options.play.swap){e(".slidesjs-play",n).hide();return e(".slidesjs-stop",n).show()}}};r.prototype.stop=function(t){var n;n=e(this.element);this.data=e.data(this);clearInterval(this.data.playInterval);this.options.play.pauseOnHover&&t&&e(".slidesjs-container",n).unbind();e.data(this,"playInterval",null);e.data(this,"playing",!1);e(".slidesjs-play",n).removeClass("slidesjs-playing");if(this.options.play.swap){e(".slidesjs-stop",n).hide();return e(".slidesjs-play",n).show()}};r.prototype._slide=function(t){var n,r,i,s,o,u,a,f,l,c,h=this;n=e(this.element);this.data=e.data(this);if(!this.data.animating&&t!==this.data.current+1){e.data(this,"animating",!0);r=this.data.current;if(t>-1){t-=1;c=t>r?1:-1;i=t>r?-this.options.width:this.options.width;o=t}else{c=this.data.direction==="next"?1:-1;i=this.data.direction==="next"?-this.options.width:this.options.width;o=r+c}o===-1&&(o=this.data.total-1);o===this.data.total&&(o=0);this._setActive(o);a=e(".slidesjs-control",n);t>-1&&a.children(":not(:eq("+r+"))").css({display:"none",left:0,zIndex:0});a.children(":eq("+o+")").css({display:"block",left:c*this.options.width,zIndex:10});this.options.callback.start(r+1);if(this.data.vendorPrefix){u=this.data.vendorPrefix;l=u+"Transform";s=u+"TransitionDuration";f=u+"TransitionTimingFunction";a[0].style[l]="translateX("+i+"px)";a[0].style[s]=this.options.effect.slide.speed+"ms";return a.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){a[0].style[l]="";a[0].style[s]="";a.children(":eq("+o+")").css({left:0});a.children(":eq("+r+")").css({display:"none",left:0,zIndex:0});e.data(h,"current",o);e.data(h,"animating",!1);a.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd");a.children(":not(:eq("+o+"))").css({display:"none",left:0,zIndex:0});h.data.touch&&h._setuptouch();return h.options.callback.complete(o+1)})}return a.stop().animate({left:i},this.options.effect.slide.speed,function(){a.css({left:0});a.children(":eq("+o+")").css({left:0});return a.children(":eq("+r+")").css({display:"none",left:0,zIndex:0},e.data(h,"current",o),e.data(h,"animating",!1),h.options.callback.complete(o+1))})}};r.prototype._fade=function(t){var n,r,i,s,o,u=this;n=e(this.element);this.data=e.data(this);if(!this.data.animating&&t!==this.data.current+1){e.data(this,"animating",!0);r=this.data.current;if(t){t-=1;o=t>r?1:-1;i=t}else{o=this.data.direction==="next"?1:-1;i=r+o}i===-1&&(i=this.data.total-1);i===this.data.total&&(i=0);this._setActive(i);s=e(".slidesjs-control",n);s.children(":eq("+i+")").css({display:"none",left:0,zIndex:10});this.options.callback.start(r+1);if(this.options.effect.fade.crossfade){s.children(":eq("+this.data.current+")").stop().fadeOut(this.options.effect.fade.speed);return s.children(":eq("+i+")").stop().fadeIn(this.options.effect.fade.speed,function(){s.children(":eq("+i+")").css({zIndex:0});e.data(u,"animating",!1);e.data(u,"current",i);return u.options.callback.complete(i+1)})}return s.children(":eq("+r+")").stop().fadeOut(this.options.effect.fade.speed,function(){s.children(":eq("+i+")").stop().fadeIn(u.options.effect.fade.speed,function(){return s.children(":eq("+i+")").css({zIndex:10})});e.data(u,"animating",!1);e.data(u,"current",i);return u.options.callback.complete(i+1)})}};r.prototype._getVendorPrefix=function(){var e,t,r,i,s;e=n.body||n.documentElement;r=e.style;i="transition";s=["Moz","Webkit","Khtml","O","ms"];i=i.charAt(0).toUpperCase()+i.substr(1);t=0;while(t<s.length){if(typeof r[s[t]+i]=="string")return s[t];t++}return!1};return e.fn[s]=function(t){return this.each(function(){if(!e.data(this,"plugin_"+s))return e.data(this,"plugin_"+s,new r(this,t))})}})(jQuery,window,document)}).call(this);



    /**
     * Dunlop: tabs
     * 25-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Табы
     */

    $(function() {
        $( ".js-tab_ui" ).tabs({
            show: { effect: "fade", duration: 800 }
        });
    });

    /**
     * Dunlop: object-fit fix
     * 25-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Фикс свойства object fit для браузеров
     */

    $(document).ready(function () {
        objectFitImages();
    });


    /**
     * Dunlop: back fix
     * 14-07-2016: Mel. Blimm
     * ---------------------
     * Фикс высоты бэкграунда
     */

    function wrapper__img_back_block__overflow() {
        if (($(".b-wrapper-inner").height() + $(".b-header").height() + $(".b-footer").height()) <= $(".b-wrapper").height()) {
            $(".b-wrapper__img-back-block").css("overflow", "hidden");
        } else {
            $(".b-wrapper__img-back-block").css("overflow", "visible");
        }
    }

    $(document).ready(function () {
        wrapper__img_back_block__overflow();

        $(window).resize(function () {
            wrapper__img_back_block__overflow();
        });
    });

    


    if (Modernizr.mq('only all') === false) {
        // No Media Query Support Detected - do something
        window.location.href = "/oldbrowser";
    }

    function detectIE() {
        var ua = window.navigator.userAgent;

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
           // Edge (IE 12+) => return version number
           return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
        
        return false;
    }

    var IE = /msie/.test(navigator.userAgent.toLowerCase()); 

    if (IE && !detectIE()) {
        if (window.location.href.indexOf('oldbrowser')===-1)
        window.location.href = "/oldbrowser";
    }

    function mobile_detect() {
        return (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/) || 
            navigator.userAgent.match(/Windows Phone/i) || 
            navigator.userAgent.match(/ZuneWP7/i)
        );
    }
    
    var dunlop_mobile_site = "http://m.dunlop-tire.ru/";
    
    function mobile_redirect() {
        var window_width_on_load = $(window).width();

        if ((window_width_on_load < 1000) && mobile_detect()) {
            var location_href_arr = window.location.href.split("/");

            if (location_href_arr.indexOf(3)) {
                window.location.href = dunlop_mobile_site + location_href_arr[3];
            }
        }
    }

    mobile_redirect();

    $(window).resize(function () {
        mobile_redirect();
    });

})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJpbnRlcm5hbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oJCkge1xuICAgIC8qKlxuICAgICAqINCz0LvQvtCx0LDQu9GM0L3Ri9C1INC/0LXRgNC10LzQtdC90L3Ri9C1LCDQutC+0YLQvtGA0YvQtSDQuNGB0L/QvtC70YzQt9GD0Y7RgtGB0Y8g0LzQvdC+0LPQvtC60YDQsNGC0L3QvlxuICAgICAqL1xuICAgIHZhciBnbG9iYWwgPSB7XG4gICAgICAgIC8vINCy0YDQtdC80Y8g0LTQu9GPINCw0L3QuNC80LDRhtC40LlcbiAgICAgICAgYW5pbWF0aW9uVGltZTogICAgICAyMDAsXG4gICAgICAgIGFuaW1hdGlvbkxvbmdUaW1lOiAxNTAwLFxuXG4gICAgICAgIC8vINC/0YDQvtCy0LXRgNC60LAg0L3QsCBpb3NcbiAgICAgICAgaXNJb3M6IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goLyhpUG9kfGlQaG9uZXxpUGFkKS8pXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqINCf0L7QtNC60LvRjtGH0LXQvdC40LUganMgcGFydGlhbHNcbiAgICAgKiBFeGFtcGxlOiAoZG9nKShkb2cpaW5jbHVkZSgncGFydGlhbHMvZm9ybV9lbGVtX3N0eWxlZC5qcycpXG4gICAgICovXG5cbiAgICAvKiogXG4gICAgICogRHVubG9wOiBjYXRhbG9nIGZpbHRlcl9saXN0XG4gICAgICogMDItMDUtMjAxNjogVGF0aWFuYSBTaGVtZW55b3ZhXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0KHRgtGA0LDQvdC40YbQsCDQutCw0YLQsNC70L7Qs9CwOiDQpNC40LvRjNGC0YDRiy5cbiAgICAgKi9cblxuICAgIC8vLSA9PT09PT09PT09PT09PT09PT09PVxuICAgIC8vLSBEdW5sb3A6IGZpbHRlcl9saXN0X3Njcm9sbFxuICAgIC8vLSAwMi0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0KDQsNCx0L7RgtCwINGE0LjQu9GM0YLRgNC+0LJcbiAgICAvLy0gPT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLy8tIDAyLTA1LTIwMTY6IFRhdGlhbmEgU2hlbWVueW92YVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0J7RgtC60YDRi9GC0LjQtSDQuCDQt9Cw0LrRgNGL0YLQuNC1INGB0L/QuNGB0LrQsCDRhNC40LvRjNGC0YDQvtCyXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZpbHRlci1saXN0X190cmlnZ2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnb3BlbmVkJykpIHtcbiAgICAgICAgICAgICQoJy5qcy1maWx0ZXItbGlzdF9fdHJpZ2dlci5vcGVuZWQnKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgICAkKCcuanMtZmlsdGVyLWxpc3Qub3BlbmVkJykucGFyZW50cygpLmVxKDApLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICQoJy5qcy1maWx0ZXItbGlzdC5vcGVuZWQnKS5yZW1vdmVDbGFzcygnb3BlbmVkJykuaGlkZSgpO1xuICAgICAgICBcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW5lZCcpLm5leHQoKS5hZGRDbGFzcygnb3BlbmVkJykuc2hvdygpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCkuZXEoMCkuYWRkQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCkuZXEoMCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnb3BlbmVkJykubmV4dCgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICBcbiAgICB9KTtcblxuICAgIC8vLSAwMi0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8tINCX0LDQutGA0YvRgtC40LUg0YHQv9C40YHQutCwINC/0YDQuCDQutC70LjQutC1INCS0J3QlSDQsdC70L7QutCwXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCcuanMtZmlsdGVyLWxpc3RfX3RyaWdnZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5pcyhlLnRhcmdldCkgJiYgJCh0aGlzKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiAkKCcuanMtZmlsdGVyLWxpc3QnKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygpLmVxKDApLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIC8qKiBcbiAgICAgKiBEdW5sb3A6IGNhdGFsb2cgZmlsdGVyX2xpc3RcbiAgICAgKiAwMy0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiDQodGC0YDQsNC90LjRhtCwINC60LDRgtCw0LvQvtCz0LA6INCk0LjQu9GM0YLRgNGLIC0g0LvQtdCy0YvQuSAtINGB0LXQt9C+0L3Riy5cbiAgICAgKi9cblxuICAgIC8vLSA9PT09PT09PT09PT09PT09PT09PVxuICAgIC8vLSBEdW5sb3A6IGZpbHRlcl9saXN0X3Njcm9sbFxuICAgIC8vLSAwMy0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0KDQsNCx0L7RgtCwINGE0LjQu9GM0YLRgNCwINCz0LvQsNCy0L3QvtCz0L4gKNGB0LXQt9C+0L3RiylcbiAgICAvLy0gPT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLy8tIDAzLTA1LTIwMTY6IFRhdGlhbmEgU2hlbWVueW92YVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0J7RgtC60YDRi9GC0LjQtSDQuCDQt9Cw0LrRgNGL0YLQuNC1INGB0L/QuNGB0LrQsCDRhNC40LvRjNGC0YDQvtCyXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWZpbHRlci1tYWluX190cmlnZ2VyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcygnb3BlbmVkJykpIHtcbiAgICAgICAgICAgIHZhciBtYXJnaW5fbmV4dF9pdGVtID0gJCh0aGlzKS5vdXRlcldpZHRoKCk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoKS5lcSgwKS5uZXh0KCkuY3NzKCdtYXJnaW4tbGVmdCcsIG1hcmdpbl9uZXh0X2l0ZW0gKyAncHgnKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCkuZXEoMCkuYWRkQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnb3BlbmVkJykubmV4dCgpLmFkZENsYXNzKCdvcGVuZWQnKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCkuZXEoMCkubmV4dCgpLmNzcygnbWFyZ2luLWxlZnQnLCAnMHB4Jyk7XG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoKS5lcSgwKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgIH1cbiAgICBcbiAgICB9KTtcblxuICAgIC8vLSAwMy0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8tINCX0LDQutGA0YvRgtC40LUg0YHQv9C40YHQutCwINC/0YDQuCDQutC70LjQutC1INCS0J3QlSDQsdC70L7QutCwXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAkKCcuanMtZmlsdGVyLW1haW5fX3RyaWdnZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5pcyhlLnRhcmdldCkgJiYgJCh0aGlzKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCAmJiAkKCcuanMtZmlsdGVyLW1haW4nKS5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygpLmVxKDApLm5leHQoKS5jc3MoJ21hcmdpbi1sZWZ0JywgJzBweCcpO1xuICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cygpLmVxKDApLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5uZXh0KCkucmVtb3ZlQ2xhc3MoJ29wZW5lZCcpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIuYi10b29sdGlwXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcIi5iLXRvb2x0aXBcIikudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqIFxuICAgICAqIER1bmxvcDogaG93LXRvLWF1dG9fcHJvZHVjdGl2aXR5XG4gICAgICogMDMtMDUtMjAxNjogVmxhZGlzbGF2IERvdnpoZW5rb1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCh0YLRgNCw0L3QuNGG0LAgXCLQutCw0Log0LLRi9Cx0YDQsNGC0Ywg0YjQuNC90YtcIjog0LjQvdC00LXQutGBINC90LDQs9GA0YPQt9C60LggKyDQutCw0YLQtdCz0L7RgNC40Y8g0YHQutC+0YDQvtGB0YLQuCAtINC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LguXG4gICAgICovXG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKCcuanMtcGVyZm9ybWFuY2UtZGF0YScpLmxlbmd0aCkge1xuICAgICAgICAgICAgJCgnLmpzLXBlcmZvcm1hbmNlLWRhdGEnKVxuICAgICAgICAgICAgICAgIC5vbignaW5pdCcsIGZ1bmN0aW9uIChldmVudCwgc2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZChcIi5iLXBlcmZvcm1hbmNlLWRhdGFfX2l0ZW1cIikubGVuZ3RoID4gMjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJqcy1iYWNrZ3JvdW5kLXByb2R1Y3Rpdml0eVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogNSxcbiAgICAgICAgICAgICAgICAgICAgcHJldkFycm93OiAnPGEgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2xpY2stcHJldlwiPlByZXZpb3VzPC9hPicsXG4gICAgICAgICAgICAgICAgICAgIG5leHRBcnJvdzogJzxhIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNsaWNrLW5leHRcIj5QcmV2aW91czwvYT4nLFxuICAgICAgICAgICAgICAgICAgICBzcGVlZDogMjAwLFxuICAgICAgICAgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoc2xpY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2xpY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciBwZXJmb21hbmNlU2xpZGVyVGltZU91dDtcblxuICAgICAgICAgICAgJC5icm93c2VyX2RldmljZSA9ICgvYW5kcm9pZHx3ZWJvc3xpcGhvbmV8aXBhZHxpcG9kfGJsYWNrYmVycnl8aWVtb2JpbGV8b3BlcmEgbWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKSk7XG5cbiAgICAgICAgICAgIGlmICghJC5icm93c2VyX2RldmljZSkge1xuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLm9uKFwibW91c2VvdmVyXCIsICcuanMtcGVyZm9ybWFuY2UtZGF0YSAuc2xpY2stYXJyb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlja1RhcmdldCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHBlcmZvbWFuY2VTbGlkZXJUaW1lT3V0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVyZm9tYW5jZVNsaWRlcihzbGlja1RhcmdldClcbiAgICAgICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwZXJmb21hbmNlU2xpZGVyKHNsaWNrVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlja1RhcmdldC5oYXNDbGFzcyhcInNsaWNrLWRpc2FibGVkXCIpIHx8ICFzbGlja1RhcmdldC5pcyhcIjpob3ZlclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChwZXJmb21hbmNlU2xpZGVyVGltZU91dCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuanMtcGVyZm9ybWFuY2UtZGF0YScpLnNsaWNrKChzbGlja1RhcmdldC5oYXNDbGFzcyhcInNsaWNrLXByZXZcIikpID8gXCJzbGlja1ByZXZcIiA6IFwic2xpY2tOZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJChcInNwYW4sZGl2W2RhdGEtaG92ZXJdXCIpLmhvdmVyKFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQoXCJbZGF0YS1ob3ZlciA9IFwiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS1ob3ZlclwiKSArIFwiXVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnanMtaWNvbi1ob3ZlcicpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKFwiW2RhdGEtaG92ZXIgPSBcIiArICQodGhpcykuYXR0cihcImRhdGEtaG92ZXJcIikgKyBcIl1cIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2pzLWljb24taG92ZXInKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBEdW5sb3A6IG1haW4gbWFpbl9zbGlkZXJcbiAgICAgKiAwMi0wNS0yMDE2OiBBLiBTb2tvbG92YVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCT0LvQsNCy0L3QsNGPINGB0YLRgNCw0L3QuNGG0LA6INCh0LvQsNC50LTQtdGALlxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogRHVubG9wOiBtYWluX3NsaWRlclxuICAgICAqINCT0LvQsNCy0L3Ri9C5INGB0LvQsNC50LTQtdGAXG4gICAgICogMDMtMDUtMjAxNjogQS4gU29rb2xvdmFcbiAgICAgKiAxOS0wNS0yMDE2OiBWLiBUdXJvc2luc2tpeVxuICAgICAqL1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1haW5fc2xpZGVyX3NwZWVkIC0g0YHQutC+0YDQvtGB0YLRjCDQsNC90LjQvNCw0YbQuNC4XG4gICAgICAgICAqIG1haW5TbGlkZXJNb3VzZVdoZWVsIC0g0LfQsNC/0YDQtdGCINGB0LzQtdC90Ysg0YHQu9Cw0LnQtNC+0LIg0L/RgNC4INGB0LrRgNC+0LvQtSDQtNC+INC30LDQstC10YDRiNC10L3QuNGPINCw0L3QuNC80LDRhtC40LhcbiAgICAgICAgICoganNfbWFpbl9zbGlkZXIgLSDRgdC10LvQtdC60YLQvtGAINC60LDRgNGD0YHQtdC70LhcbiAgICAgICAgICoganNfbWFpbl9zbGlkZXJfdGV4dCAtINGC0LXQutGB0YIg0YHQu9Cw0LnQtNCwINC00LvRjyDQsNC90LjQvNCw0YbQuNC4XG4gICAgICAgICAqIGpzX21haW5fc2xpZGVyX3RleHRfbGVmdCAtINC+0YLRgdGC0YPQvyDRgdC70LXQstCwINC00LvRjyDQutC+0YDQtdC60YLQvdC+0LPQviDQt9Cw0LLQtdGA0YjQtdC90LjRjyDQsNC90LjQvNCw0YbQuNC4INGC0LXQutGB0YLQsFxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgbWFpbl9zbGlkZXJfc3BlZWQgPSAxMDAwLFxuICAgICAgICAgICAgYWN0aXZlX2VsZW1lbnQsXG4gICAgICAgICAgICBqc19tYWluX3NsaWRlciA9ICQoJy5qcy1tYWluLXNsaWRlcicpLFxuICAgICAgICAgICAganNfbWFpbl9zbGlkZXJfdGV4dCA9ICQoJy5iLW1haW4tc2xpZGVyX190ZXh0JyksXG4gICAgICAgICAgICBqc19tYWluX3NsaWRlcl90ZXh0X2xlZnQgPSBqc19tYWluX3NsaWRlcl90ZXh0LmNzcyhcIm1hcmdpbi1sZWZ0XCIpLFxuICAgICAgICAgICAganNfaW1hZ2UgPSAkKFwiLmpzLXByZWxvYWRlci1pbWFnZS5qcy1tYWluLWltYWdlXCIpLFxuICAgICAgICAgICAganNfYmFja2dyb3VuZCA9ICQoXCIuanMtcHJlbG9hZGVyLWltYWdlLmpzLWJhY2tncm91bmQtaW1hZ2VcIiksXG4gICAgICAgICAgICB0aW1lb3V0LFxuICAgICAgICAgICAgYmFja2dyb3VuZF9uZXh0LFxuICAgICAgICAgICAgYmFja2dyb3VuZF9jdXJyZW50LFxuICAgICAgICAgICAgY291bnRTd2lwZSA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPINC60LDRgNGD0YHQtdC70LhcbiAgICAgICAgICovXG4gICAgICAgIGpzX21haW5fc2xpZGVyLnNsaWNrKHtcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIHNwZWVkOiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICAgICAgdG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIHN3aXBlOiBmYWxzZSxcbiAgICAgICAgICAgIHZlcnRpY2FsU3dpcGluZzogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCQ0L3QuNC80LDRhtC40Y8g0L/QvtGB0LvQtSDRgdC80LXQvdGLINGB0LvQsNC50LTQvtCyXG4gICAgICAgICAqL1xuICAgICAgICAub24oJ2FmdGVyQ2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaywgY3VycmVudFNsaWRlLCBuZXh0U2xpZGUpIHtcbiAgICAgICAgICAgIGpzX2ltYWdlLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IFwiMFwiLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogbWFpbl9zbGlkZXJfc3BlZWQgLyAyLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZV9lbGVtZW50ID0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uLmFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50U3dpcGUgPCAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY291bnRTd2lwZSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudFN3aXBlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDc1MCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAganNfbWFpbl9zbGlkZXJfdGV4dC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1sZWZ0XCI6IHBhcnNlSW50KGpzX21haW5fc2xpZGVyX3RleHRfbGVmdCkgKyBcIiVcIixcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IG1haW5fc2xpZGVyX3NwZWVkIC8gMlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQktGL0LfQvtCyINGE0YPQvdC60YbQuNC4INGB0LzQtdC90Ysg0YHQu9Cw0LTQvtCyINC/0YDQuCDRgdC60YDQvtC70LUg0LzRi9GI0YzRjlxuICAgICAgICAgKi9cbiAgICAgICAgLmJpbmQoJ21vdXNld2hlZWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgY291bnRTd2lwZSsrO1xuICAgICAgICAgICAgaWYgKCFqc19pbWFnZS5pcyhcIjphbmltYXRlZFwiKSAmJiBjb3VudFN3aXBlIDwgMTApIG1vdXNlV2hlZWxTbGlkZShlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQktGL0LfQvtCyINGB0LzQtdC90Ysg0YHQu9Cw0LnQtNC+0LIg0L/RgNC4INC60LvQuNC60LUg0L/QviDQvdCw0LLQuNCz0LDRhtC40LhcbiAgICAgICAgICovXG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvdW50U3dpcGUrKztcbiAgICAgICAgICAgIGFjdGl2ZV9lbGVtZW50ID0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uLmFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGlmICghanNfaW1hZ2UuaXMoXCI6YW5pbWF0ZWRcIikgJiYgY291bnRTd2lwZSA8IDEwKSBtYWluU2xpZGVyR29UbygkKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50IC0g0YHQu9Cw0LnQtCDQvdCwINC60L7RgtC+0YDRi9C5INC+0YHRg9GJ0LXRgdGC0LLQu9GP0LXRgtGB0Y8g0L/QtdGA0LXRhdC+0LRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1haW5TbGlkZXJHb1RvKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgIHZhciBsZWZ0ID0gcGFyc2VJbnQoanNfbWFpbl9zbGlkZXIuY3NzKFwibGVmdFwiKSk7XG4gICAgICAgICAgICAgICAgZ2V0U2xpZGVCeUluZGV4KGVsZW1lbnQpLmNzcyhcInotaW5kZXhcIiwgOTk5KS5jc3MoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICAgICAgICAgIGdldFNsaWRlQnlJbmRleChhY3RpdmVfZWxlbWVudCkuY3NzKFwiei1pbmRleFwiLCAxMDAwKTsvLy5hbmltYXRlKHtcIm9wYWNpdHlcIjogMC41fSwgbWFpbl9zbGlkZXJfc3BlZWQgLyAyKTtcblxuICAgICAgICAgICAgICAgIGFjdGl2ZV9lbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKVxuICAgICAgICAgICAgICAgICAgICAuYW5pbWF0ZSh7bWFyZ2luOiBcIjAgMCAwIDBcIn0pO1xuXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoXCJhY3RpdmVcIilcbiAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoe21hcmdpbjogXCIwIDAgMCAtNTBweFwifSk7XG5cbiAgICAgICAgICAgICAgICAvL9Ci0LXQutGB0YJcbiAgICAgICAgICAgICAgICBnZXRTbGlkZUJ5SW5kZXgoZWxlbWVudCkuZmluZCgnLmItbWFpbi1zbGlkZXJfX3RleHQnKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgXCJtYXJnaW4tbGVmdFwiOiBwYXJzZUludChwYXJzZUludChqc19tYWluX3NsaWRlcl90ZXh0X2xlZnQpICsgNSkgKyBcIiVcIixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC41XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogbWFpbl9zbGlkZXJfc3BlZWQgLyAyXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBnZXRTbGlkZUJ5SW5kZXgoYWN0aXZlX2VsZW1lbnQpLmZpbmQoJy5iLW1haW4tc2xpZGVyX190ZXh0JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIFwibWFyZ2luLWxlZnRcIjogcGFyc2VJbnQocGFyc2VJbnQoanNfbWFpbl9zbGlkZXJfdGV4dF9sZWZ0KSArIDUpICsgXCIlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBtYWluX3NsaWRlcl9zcGVlZCAvIDJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGpzX2JhY2tncm91bmQuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09ICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvblwiKS5pbmRleChhY3RpdmVfZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRfY3VycmVudCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uXCIpLmluZGV4KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kX25leHQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kX25leHQuY3NzKFwib3BhY2l0eVwiLCAxKTtcblxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRfY3VycmVudC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IG1haW5fc2xpZGVyX3NwZWVkIC8gMlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy/QmtCw0YDRgtC40L3QutCwXG4gICAgICAgICAgICAgICAgZ2V0U2xpZGVCeUluZGV4KGVsZW1lbnQpLmZpbmQoJy5qcy1wcmVsb2FkZXItaW1hZ2UuanMtbWFpbi1pbWFnZScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBcIi0xMCVcIixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC41XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogbWFpbl9zbGlkZXJfc3BlZWQgLyAyLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDQn9C+INC30LDQstC10YDRiNC10L3QuNGOINCw0L3QuNC80LDRhtC40Lgg0LLRi9C30YvQstCw0LXQvCDRhNGD0L3QutGG0LjRjiDRgdC80LXQvdGLINGB0LvQsNC50LTQvtCyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGpzX21haW5fc2xpZGVyLnNsaWNrKFwic2xpY2tHb1RvXCIsICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvblwiKS5pbmRleChlbGVtZW50KSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGdldFNsaWRlQnlJbmRleChhY3RpdmVfZWxlbWVudCkuZmluZCgnLmpzLXByZWxvYWRlci1pbWFnZS5qcy1tYWluLWltYWdlJykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiLTEwJVwiLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogbWFpbl9zbGlkZXJfc3BlZWQgLyAyLFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiDQn9C+INC30LDQstC10YDRiNC10L3QuNGOINCw0L3QuNC80LDRhtC40Lgg0LLRi9C30YvQstCw0LXQvCDRhNGD0L3QutGG0LjRjiDRgdC80LXQvdGLINGB0LvQsNC50LTQvtCyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGpzX21haW5fc2xpZGVyLnNsaWNrKFwic2xpY2tHb1RvXCIsICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvblwiKS5pbmRleChlbGVtZW50KSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlV2hlZWxTbGlkZShlKSB7XG4gICAgICAgICAgICBhY3RpdmVfZWxlbWVudCA9ICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvbi5hY3RpdmVcIik7XG4gICAgICAgICAgICB2YXIgbmV4dF9pbmRleCxcbiAgICAgICAgICAgICAgICBjdXJfaW5kZXggPSAkKFwiLmpzLW1haW4tc2xpZGVyLW5hdmlnYXRpb25cIikuaW5kZXgoYWN0aXZlX2VsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKChlLm9yaWdpbmFsRXZlbnQuZGVsdGFZIC0gZS5vcmlnaW5hbEV2ZW50LmRlbHRhWCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dF9pbmRleCA9IGN1cl9pbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKCEkKFwiW2RhdGEtc2xpY2staW5kZXg9XCIgKyBuZXh0X2luZGV4ICsgXCJdXCIpLmxlbmd0aCkgbmV4dF9pbmRleCA9ICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvblwiKS5pbmRleCgkKFwiLmpzLW1haW4tc2xpZGVyLW5hdmlnYXRpb246bGFzdFwiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5leHRfaW5kZXggPSBjdXJfaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIGlmICghJChcIltkYXRhLXNsaWNrLWluZGV4PVwiICsgbmV4dF9pbmRleCArIFwiXVwiKS5sZW5ndGgpIG5leHRfaW5kZXggPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoISQoXCJbZGF0YS1zbGljay1pbmRleD1cIiArIG5leHRfaW5kZXggKyBcIl1cIikubGVuZ3RoKSBuZXh0X2luZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uOmVxKFwiICsgbmV4dF9pbmRleCArIFwiKVwiKTtcbiAgICAgICAgICAgIG1haW5TbGlkZXJHb1RvKGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3dpcGVTbGlkZShzd2lwZVRvKSB7XG4gICAgICAgICAgICBhY3RpdmVfZWxlbWVudCA9ICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvbi5hY3RpdmVcIik7XG4gICAgICAgICAgICB2YXIgbmV4dF9pbmRleCxcbiAgICAgICAgICAgICAgICBjdXJfaW5kZXggPSAkKFwiLmpzLW1haW4tc2xpZGVyLW5hdmlnYXRpb25cIikuaW5kZXgoYWN0aXZlX2VsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKHN3aXBlVG8gPT0gXCJwcmV2XCIpIHtcbiAgICAgICAgICAgICAgICBuZXh0X2luZGV4ID0gY3VyX2luZGV4IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAoISQoXCJbZGF0YS1zbGljay1pbmRleD1cIiArIG5leHRfaW5kZXggKyBcIl1cIikubGVuZ3RoKSBuZXh0X2luZGV4ID0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uXCIpLmluZGV4KCQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvbjpsYXN0XCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV4dF9pbmRleCA9IGN1cl9pbmRleCArIDE7XG4gICAgICAgICAgICAgICAgaWYgKCEkKFwiW2RhdGEtc2xpY2staW5kZXg9XCIgKyBuZXh0X2luZGV4ICsgXCJdXCIpLmxlbmd0aCkgbmV4dF9pbmRleCA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghJChcIltkYXRhLXNsaWNrLWluZGV4PVwiICsgbmV4dF9pbmRleCArIFwiXVwiKS5sZW5ndGgpIG5leHRfaW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSAkKFwiLmpzLW1haW4tc2xpZGVyLW5hdmlnYXRpb246ZXEoXCIgKyBuZXh0X2luZGV4ICsgXCIpXCIpO1xuICAgICAgICAgICAgbWFpblNsaWRlckdvVG8oZWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRTbGlkZUJ5SW5kZXgobGluaykge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJChcIi5qcy1tYWluLXNsaWRlci1uYXZpZ2F0aW9uXCIpLmluZGV4KGxpbmspO1xuICAgICAgICAgICAgcmV0dXJuICQoXCJbZGF0YS1zbGljay1pbmRleF06ZXEoXCIgKyBpbmRleCArIFwiKVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChqc19tYWluX3NsaWRlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVUb3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaE1vdmUsIGZhbHNlKTtcblxuICAgICAgICAgICAgdmFyIHhEb3duID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB5RG93biA9IG51bGw7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoU3RhcnQoZXZ0KSB7XG4gICAgICAgICAgICAgICAgeERvd24gPSBldnQudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgICAgICAgICAgIHlEb3duID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlVG91Y2hNb3ZlKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmICgheERvd24gfHwgIXlEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgeFVwID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgICAgICAgICAgICB2YXIgeVVwID0gZXZ0LnRvdWNoZXNbMF0uY2xpZW50WTtcblxuICAgICAgICAgICAgICAgIHZhciB4RGlmZiA9IHhEb3duIC0geFVwO1xuICAgICAgICAgICAgICAgIHZhciB5RGlmZiA9IHlEb3duIC0geVVwO1xuXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHhEaWZmKSA+IE1hdGguYWJzKHlEaWZmKSkgey8qbW9zdCBzaWduaWZpY2FudCovXG4gICAgICAgICAgICAgICAgICAgIGlmICh4RGlmZiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlU2xpZGUoXCJwcmV2XCIpOy8vXCJsZWZ0XCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2lwZVNsaWRlKFwibmV4dFwiKTsvL1wicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHlEaWZmID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3dpcGVTbGlkZShcInByZXZcIik7Ly9cInVwXCJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN3aXBlU2xpZGUoXCJuZXh0XCIpOy8vXCJkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4RG93biA9IG51bGw7XG4gICAgICAgICAgICAgICAgeURvd24gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBqc19tYWluX3NsaWRlci5zbGljaygncmVzaXplJyk7XG4gICAgICAgICAgICBpZiAoISQoXCIuYi1wZXJmb3JtYW5jZS1kYXRhXCIpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICQoXCIuYi1tYWluLXNsaWRlcl9faXRlbS5zbGljay1hY3RpdmVcIikuY3NzKHt3aWR0aDogXCIxMDAlXCJ9KTtcbiAgICAgICAgICAgICAgICAkKFwiLnNsaWNrLXRyYWNrXCIpLmNzcyh7d2lkdGg6IFwiMTAwdndcIiwgaGVpZ2h0OiBcIjEwMHZoXCJ9KTtcbiAgICAgICAgICAgICAgICAkKFwiLnNsaWNrLXNsaWRlXCIpLmNzcyh7d2lkdGg6IFwiMTAwJVwiLCBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLCBsZWZ0OiBcIjBweFwifSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQod2luZG93KS5vbignb3JpZW50YXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGpzX21haW5fc2xpZGVyLnNsaWNrKCdyZXNpemUnKTtcbiAgICAgICAgICAgIGlmICghJChcIi5iLXBlcmZvcm1hbmNlLWRhdGFcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJChcIi5iLW1haW4tc2xpZGVyX19pdGVtLnNsaWNrLWFjdGl2ZVwiKS5jc3Moe3dpZHRoOiBcIjEwMCVcIn0pO1xuICAgICAgICAgICAgICAgICQoXCIuc2xpY2stdHJhY2tcIikuY3NzKHt3aWR0aDogXCIxMDAlXCJ9KTtcbiAgICAgICAgICAgICAgICAkKFwiLnNsaWNrLXNsaWRlXCIpLmNzcyh7d2lkdGg6IFwiMTAwJVwiLCBsZWZ0OiAkKHdpbmRvdykud2lkdGgoKX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRHVubG9wOiB0ZWNobm9sb2d5IHRlY2hub2xvZ3lfc2xpZGVyXG4gICAgICogMDctMDUtMjAxNjogVGF0aWFuYSBTaGVtZW55b3ZhXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0KHRgtGA0LDQvdC40YbQsCDRgtC10YXQvdC+0LvQvtCz0LjQuTog0KHQu9Cw0LnQtNC10YAuXG4gICAgICovXG5cbiAgICAvLy0gPT09PT09PT09PT09PT09PT09PT1cbiAgICAvLy0gRHVubG9wOiB0ZWNobm5vbG9neS1zbGlkZXJcbiAgICAvLy0gMjAtMDUtMjAxNjogVHVyb3NpbnNraXkgVmxhZGltaXJcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0KLQtdGF0L3QvtC70L7Qs9C40Lgg0YHQu9Cw0LnQtNC10YBcbiAgICAvLy0g0JjRgdC/0L7Qu9GM0LfRg9C10LwgaHR0cDovL3NsaWRlc2pzLmNvbS9leGFtcGxlcy9zdGFuZGFyZC9cbiAgICAvLy0g0KDQsNGB0L/QvtC70L7QttC10L0gL3NyYy9qcy92ZW5kb3IvanF1ZXJ5LnNsaWRlcy5taW4uanNcbiAgICAvLy0gPT09PT09PT09PT09PT09PT09PT1cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFNsaWRlckpTKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKG9wdGlvbnNbXCJ0YXJnZXRcIl0pLFxuICAgICAgICAgICAgICAgIG5hdl9wcmV2aW91cyA9ICQob3B0aW9uc1tcInByZXZpb3VzXCJdKSxcbiAgICAgICAgICAgICAgICBuYXZfbmV4dCA9ICQob3B0aW9uc1tcIm5leHRcIl0pLFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb24gPSAkKG9wdGlvbnNbXCJuYXZpZ2F0aW9uXCJdKSxcbiAgICAgICAgICAgICAgICBzbGlkZXMgPSAkKG9wdGlvbnNbXCJzbGlkZXNcIl0pLFxuICAgICAgICAgICAgICAgIG5hdl9oZWFkZXIgPSAkKG9wdGlvbnNbXCJuYXZfaGVhZGVyXCJdKTtcbiAgICAgICAgICAgIHRhcmdldC5zbGlkZXNqcyh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKG51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSAkKG9wdGlvbnNbXCJuYXZpZ2F0aW9uXCJdICsgXCIuYWN0aXZlXCIpLmF0dHIoXCJkYXRhLXNsaWRlc2pzLWl0ZW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHBhcnNlSW50KHBhcnNlSW50KGN1cnJlbnQpIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHBhcnNlSW50KHBhcnNlSW50KGN1cnJlbnQpICsgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChvcHRpb25zW1wibmF2aWdhdGlvblwiXSkubGVuZ3RoID09IG5leHQpIG5leHQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF2X3ByZXZpb3VzLnRleHQoJChvcHRpb25zW1wic2xpZGVzXCJdK1wiOmVxKFwiICsgcHJldiArIFwiKVwiKS5maW5kKG5hdl9oZWFkZXIpLnRleHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZfbmV4dC50ZXh0KCQob3B0aW9uc1tcInNsaWRlc1wiXStcIjplcShcIiArIG5leHQgKyBcIilcIikuZmluZChuYXZfaGVhZGVyKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3aWR0aDogOTQwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogNTI4LFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IGZhbHNlXG4gICAgICAgICAgICB9KS5iaW5kKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgKChldmVudC5vcmlnaW5hbEV2ZW50LmRlbHRhWSAtIGV2ZW50Lm9yaWdpbmFsRXZlbnQuZGVsdGFYKSAgPCAwKSA/IG5hdl9wcmV2aW91cy5jbGljaygpIDogbmF2X25leHQuY2xpY2soKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRTbGlkZXJKUyh7XG4gICAgICAgICAgICB0YXJnZXQ6ICcuanMtdGVjaG5ub2xvZ3ktc2xpZGVyLWF1dG8nLFxuICAgICAgICAgICAgcHJldmlvdXM6IFwiLmpzLXRlY2hubm9sb2d5LXNsaWRlci1hdXRvICAuc2xpZGVzanMtcHJldmlvdXMgXCIsXG4gICAgICAgICAgICBuZXh0OiBcIi5qcy10ZWNobm5vbG9neS1zbGlkZXItYXV0byAuc2xpZGVzanMtbmV4dFwiLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjogXCIuanMtdGVjaG5ub2xvZ3ktc2xpZGVyLWF1dG8gW2RhdGEtc2xpZGVzanMtaXRlbV1cIixcbiAgICAgICAgICAgIHNsaWRlczogXCIuanMtdGVjaG5ub2xvZ3ktc2xpZGVyLWF1dG8gLnNsaWRlc2pzLXNsaWRlXCIsXG4gICAgICAgICAgICBuYXZfaGVhZGVyOiBcIi5iLXRlY2hub2xvZ3ktc2xpZGVyX19oZWFkZXJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBpbml0U2xpZGVySlMoe1xuICAgICAgICAgICAgdGFyZ2V0OiAnLmpzLXRlY2hubm9sb2d5LXNsaWRlci1tb3RvJyxcbiAgICAgICAgICAgIHByZXZpb3VzOiBcIi5qcy10ZWNobm5vbG9neS1zbGlkZXItbW90byAgLnNsaWRlc2pzLXByZXZpb3VzIFwiLFxuICAgICAgICAgICAgbmV4dDogXCIuanMtdGVjaG5ub2xvZ3ktc2xpZGVyLW1vdG8gLnNsaWRlc2pzLW5leHRcIixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IFwiLmpzLXRlY2hubm9sb2d5LXNsaWRlci1tb3RvIFtkYXRhLXNsaWRlc2pzLWl0ZW1dXCIsXG4gICAgICAgICAgICBzbGlkZXM6IFwiLmpzLXRlY2hubm9sb2d5LXNsaWRlci1tb3RvIC5zbGlkZXNqcy1zbGlkZVwiLFxuICAgICAgICAgICAgbmF2X2hlYWRlcjogXCIuYi10ZWNobm9sb2d5LXNsaWRlcl9faGVhZGVyXCJcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIER1bmxvcDogY29udGFjdHMgcG9wdXAgZmVlZGJhY2sgdmFsaWRhdGlvblxuICAgICAqIDEwLTA1LTIwMTY6IFRhdGlhbmEgU2hlbWVueW92YVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCh0YLRgNCw0L3QuNGG0LAg0LrQvtC90YLQsNC60YLQvtCyOiDQktCw0LvQuNC00LDRhtC4INGE0L7RgNC80YsuXG4gICAgICovXG5cbiAgICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgICBqUXVlcnkudmFsaWRhdG9yLmFkZE1ldGhvZChcInBob25lXCIsIGZ1bmN0aW9uKHZhbHVlLCBlbGVtZW50KXtcbiAgICAgICAgICAgcmV0dXJuIC9eKCg4fFxcKzcpW1xcLSBdPyk/KFxcKD9cXGR7M31cXCk/W1xcLSBdPyk/W1xcZFxcLSBdezcsMTB9JC8udGVzdCh2YWx1ZSkgO1xuICAgICAgICB9LCBcIndyb25nIHBob25lXCIpO1xuXG4gICAgICAgIGpRdWVyeS52YWxpZGF0b3IuYWRkTWV0aG9kKFwibWFpbFwiLCBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4gLy4rQC4rXFwuLiskLy50ZXN0KHZhbHVlKSA7XG4gICAgICAgIH0sIFwid3JvbmcgZW1haWxcIik7XG5cbiAgICAgICAgJChcIi5qcy1jb250YWN0LWZvcm1cIikudmFsaWRhdGUoe1xuICAgICAgICAgICAgZXJyb3JFbGVtZW50OiBcImVtXCIsXG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIFwic19uYW1lXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwibV9tYWlsXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG1haWw6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInNfcGhvbmVcIjoge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHRydWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFwidF9xdWVzdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgICogRHVubG9wOiBwb3B1cHNcbiAgICAgKiAxMC0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiDQn9C+0L/QsNC/0YtcbiAgICAgKi9cblxuICAgIC8vLSA9PT09PT09PT09PT09PT09PT09PVxuICAgIC8vLSBEdW5sb3A6IHBvcHVwXG4gICAgLy8tIDEwLTA1LTIwMTY6IFRhdGlhbmEgU2hlbWVueW92YVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vLSDQoNCw0LHQvtGC0LAg0L/QvtC/0LDQv9C+0LJcbiAgICAvLy0gPT09PT09PT09PT09PT09PT09PT1cblxuXG4gICAgLy8tIDEwLTA1LTIwMTY6IFRhdGlhbmEgU2hlbWVueW92YVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0J7RgtC60YDRi9GC0LjQtSDQv9C+0L/QsNC/0LBcblxuICAgIHZhciBtb2RhbFxuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qcy1vcGVuLXBvcHVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmJyb3dzZXJfZGV2aWNlID0gKC9hbmRyb2lkfHdlYm9zfGlwaG9uZXxpcGFkfGlwb2R8YmxhY2tiZXJyeXxpZW1vYmlsZXxvcGVyYSBtaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpKTtcblxuICAgICAgICBpZiAoJC5icm93c2VyX2RldmljZSkge1xuICAgICAgICAgICAgc2VhcmNoX2VsZW1lbnRUb3AgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIC8vICQoXCIuYi13cmFwcGVyXCIpLmNzcyh7dG9wOiBcIi1cIiArIHNlYXJjaF9lbGVtZW50VG9wICsgXCJweFwifSk7XG4gICAgICAgICAgICAkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6IHNlYXJjaF9lbGVtZW50VG9wXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwnKTtcblxuICAgICAgICBtb2RhbCA9ICQodGhpcykuYXR0cignZGF0YS10YXJnZXQnKTtcbiAgICAgICAgJChtb2RhbCkuYWRkQ2xhc3MoJ29wZW5lZCcpLnNob3coKTtcblxuICAgICAgICAvLyAkKG1vZGFsKS5jbG9zZXN0KCcuanMtcG9wdXAnKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpO1xuICAgICAgICAkKG1vZGFsKS5jbG9zZXN0KCcuanMtcG9wdXAnKS5jc3MoJ2Rpc3BsYXknLCAnZmxleCcpLmFkZENsYXNzKCdvcGVuZWQnKTtcbiAgICB9KTtcblxuICAgIC8vLSAxMC0wNS0yMDE2OiBUYXRpYW5hIFNoZW1lbnlvdmFcbiAgICAvLy0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8tINCX0LDQutGA0YvRgtC40LUg0L/QvtC/0LDQv9CwINC/0YDQuCDQutC70LjQutC1INC90LAg0YHRgdGL0LvQutGDXG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWNsb3NlLXBvcHVwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsJyk7XG4gICAgICAgICQoJy5qcy1wb3B1cCcpLmhpZGUoKS5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICQodGhpcykucGFyZW50cygpLmZpbmQobW9kYWwpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKS5oaWRlKCk7XG5cbiAgICAgICAgLy8gJChcIi5iLXdyYXBwZXJcIikuY3NzKHt0b3A6IFwiMHB4XCJ9KTtcbiAgICB9KTtcblxuICAgIC8vLSAxNy0wNS0yMDE2OiBWbGFkaW1pciBUeXJvc2luc2tpeVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0JfQsNC60YDRi9GC0LjQtSDQv9C+0L/QsNC/0LAg0L/RgNC4INC60LvQuNC60LUg0LLQvdC1INC/0L7Qv9Cw0L/QsFxuICAgICQoZG9jdW1lbnQpLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJtb2RhbFwiKSkge1xuICAgICAgICAgICAgaWYgKCEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChcIi5iLXBvcHVwX193cmFwcGVyXCIpLmxlbmd0aCAmJiAhJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qcy1vcGVuLXBvcHVwJykubGVuZ3RoKSAkKFwiLmpzLWNsb3NlLXBvcHVwXCIpLmNsaWNrKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vLSAxNy0wNS0yMDE2OiBWbGFkaW1pciBUeXJvc2luc2tpeVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0J/QvtC/0LDQvyDQvtCx0YDQsNGC0L3QvtC5INGB0LLRj9C30LhcbiAgICAkKGRvY3VtZW50KS5vbihcInN1Ym1pdFwiLCBcIi5qcy1jb250YWN0LWZvcm1cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcyk7XG4gICAgICAgIHZhciB2YWxpZGF0b3IgPSAkKHRoaXMpLnZhbGlkYXRlKCk7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGFyZ2V0LnZhbGlkKCkpIHtcblxuICAgICAgICAgICAgdmFyIHNlbmREYXRhID0gJ3N1Ym1pdF9zYXZlPTEmYl9hamF4X21vZGU9MSYnK3RhcmdldC5zZXJpYWxpemUoKTtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHRhcmdldC5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHNlbmREYXRhXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXMgKSB7XG5cbiAgICAgICAgICAgICAgICB0cnlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9ICQucGFyc2VKU09OKHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoKGUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB7XCJlcnJvclwiOmZhbHNlfTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmIChyZXNbXCJlcnJvclwiXSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgZiBpbiByZXNbXCJmaWxkc1wiXSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmZpbmQoJ1tuYW1lPVwiJytmKydcIl0nKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IHRhcmdldC5maW5kKCdbdHlwZT1cInN1Ym1pdFwiXScpLmZpbmQoJy5iLWJ1dHRvbl9faW5uZXInKTtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybSA9IHRhcmdldC5maW5kKFwiLmpzLWZvcm0tYXJlYVwiKTtcbiAgICAgICAgICAgICAgICBmb3JtLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcbiAgICAgICAgICAgICAgICBidXR0b24uaHRtbCgnPHNwYW4+0J7RgtC/0YDQsNCy0LjRgtGMPC9zcGFuPjxzcGFuIGNsYXNzPVwiYi1idXR0b24tLWZvcm0tc2VudFwiPtCS0LDRiNC1INGB0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3Qvjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICBidXR0b24uYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmF0dHIoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvci5yZXNldEZvcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3Jlc2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5odG1sKCc8c3Bhbj7QntGC0L/RgNCw0LLQuNGC0Yw8L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuanMtY29udGFjdC1mb3JtIGlucHV0LHRleHRhcmVhXCIpLnJlbW92ZUNsYXNzKFwibm90LWVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vLSAxNy0wNS0yMDE2OiBWbGFkaW1pciBUeXJvc2luc2tpeVxuICAgIC8vLSAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLy0g0JTQvtCx0LDQstC70LXQvdC40LUg0LrQu9Cw0YHRgdCwINGN0LvQtdC80LXQvdGC0LDQvCDQv9GA0Lgg0LfQsNC/0L7Qu9C90LXQvdC90L7RgdGC0Lgg0L/QvtC70LXQuSDRhNC+0YDQvNGLXG4gICAgJChkb2N1bWVudCkub24oXCJjaGFuZ2VcIiwgXCIuanMtY29udGFjdC1mb3JtIGlucHV0LHRleHRhcmVhXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJub3QtZW1wdHlcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwibm90LWVtcHR5XCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIER1bmxvcDogcG9wdXBzXG4gICAgICogMTAtMDUtMjAxNjogVmxhZGlzbGF2IERvdnpoZW5rb1xuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCa0LDRgNGC0LAg0L3QsCDRgdGC0YDQsNC90LjRhtC1IFwi0LrQvtC90YLQsNC60YLRi1wiXG4gICAgICovXG5cbiAgICBpZiAoJCgnI2pzLW1hcC1jb250YWN0cycpLmxlbmd0aCkge1xuICAgIFx0eW1hcHMucmVhZHkoaW5pdCk7XG5cbiAgICBcdGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgICBcdCAgICB2YXIgbXlNYXA7XG5cbiAgICBcdCAgICBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXCJqcy1tYXAtY29udGFjdHNcIiwge1xuICAgIFx0ICAgICAgICBjZW50ZXI6IFs1NS43Mjc4OTEsIDM3LjQ0OTY0MV0sXG4gICAgXHQgICAgICAgIHpvb206IDE2LFxuICAgIFx0ICAgIH0pO1xuXG4gICAgXHQgICAgbXlNYXAuY29udHJvbHMuYWRkKCd0eXBlU2VsZWN0b3InKS5hZGQoJ21hcFRvb2xzJykuYWRkKCd6b29tQ29udHJvbCcpLmFkZCgnc2NhbGVMaW5lJyk7XG5cbiAgICAgICAgXHR2YXIgaWNvblN0eWxlID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzKCc8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiIHRpdGxlPVwidGl0bGVcIiBjbGFzcz1cImItcHJvZHVjdC1tYXBfX2JhbG9vbi1tYXAgYi1wcm9kdWN0LW1hcF9fYmFsb29uLW1hcC0tY29udGFjdHNcIj4nICtcbiAgICAgICAgICAgICAgICAvLyAnPGltZyBzcmM9XCJpbWFnZXMvaW5odG1sL2xvZ28tbWluLnN2Z1wiIGFsdD1cIlwiIHRpdGxlPVwiXCIgY2xhc3M9XCJiLXByb2R1Y3QtbWFwX19sb2dvXCI+JyArXG4gICAgICAgICAgICAgICAgJzwvYT4nKTtcbiAgICAgICAgICAgIHZhciBwbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFs1NS43Mjc4OTEsIDM3LjQ0OTY0MV0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnL2xhbmcvcnUvaW1hZ2VzL2luaHRtbC9sb2dvLW1pbi5zdmcnLFxuICAgICAgICAgICAgICAgICAgICAvL2ljb25JbWFnZVNpemU6IFs1MywgMzZdLFxuICAgICAgICAgICAgICAgICAgICAvL2ljb25JbWFnZU9mZnNldDogWy0xMDYsIC0xNzRdLFxuICAgICAgICAgICAgICAgICAgICBpY29uTGF5b3V0OiBpY29uU3R5bGUsXG4gICAgICAgICAgICAgICAgICAgIC8vaGlkZUljb246IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIG15TWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFyayk7XG4gICAgXHR9XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIER1bmxvcDogc2VsZWN0XG4gICAgICogMTAtMDUtMjAxNjogVGF0aWFuYSBTaGVtZW55b3ZhXG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0KHQtdC70LXQutGC0YtcbiAgICAgKi9cblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICgkKCdzZWxlY3QnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKCdzZWxlY3QnKS5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICBtaW5pbXVtUmVzdWx0c0ZvclNlYXJjaDogSW5maW5pdHlcbiAgICAgICAgICAgIH0pOyBcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEdW5sb3A6IG1hcFxuICAgICAqIDEwLTA1LTIwMTY6IFZsYWRpbWlyIFR1cm9zaW5za2l5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0JrQsNGA0YLQsFxuICAgICAqL1xuXG4gICAgdmFyICRxID0gJDtcbiAgICB2YXIgX2Jhc2VfbGFuZyA9ICRxKCdodG1sJykuYXR0cignbGFuZycpIHx8ICdydSc7XG5cbiAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgdmFyIF9iYXNlX2xhbmcgPSAkKCdodG1sJykuYXR0cignbGFuZycpIHx8ICdydSc7XG5cbiAgICAgICAgJC5mbi5nbWFwRGVhbGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICB5bWFwcy5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVhbGVycyhvcHRpb25zLCB0YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGRlYWxlcnMgPSBmdW5jdGlvbiAob3B0aW9ucywgdGFyZ2V0KSB7XG4gICAgICAgICAgICB2YXIgbWFwLFxuICAgICAgICAgICAgICAgIG1hcFBvc1gsIG1hcFBvc1ksXG4gICAgICAgICAgICAgICAgZ0NvbGxlY3Rpb24gPSBuZXcgeW1hcHMuR2VvT2JqZWN0QXJyYXkoKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50Qm91bmRzLFxuICAgICAgICAgICAgICAgIGdDb2xsZWN0aW9uU2VhcmNoID0gbmV3IHltYXBzLkdlb09iamVjdEFycmF5KCksXG4gICAgICAgICAgICAgICAgZ0NvbGxlY3Rpb25TaG93ZWQgPSBuZXcgeW1hcHMuR2VvT2JqZWN0QXJyYXkoKSxcbiAgICAgICAgICAgICAgICBnQ29sbGVjdGlvbkZvclNlYXJjaCA9IGdDb2xsZWN0aW9uU2hvd2VkLFxuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkID0gJCgnLicgKyBvcHRpb25zLnNlYXJjaEZpZWxkSWQpLFxuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkQnRuID0gJCgnLicgKyBvcHRpb25zLnNlYXJjaEZpZWxkQnRuSWQpLFxuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVGaWVsZCA9ICQoJyMnICsgb3B0aW9ucy5jb29yZGluYXRlRmllbGRJZCksXG4gICAgICAgICAgICAgICAgcmVnaW9uTGlzdCA9ICQoJy4nICsgb3B0aW9ucy5yZWdpb25MaXN0SWQpLFxuICAgICAgICAgICAgICAgIGRlYWxlckxpc3QgPSAkKCcuJyArIG9wdGlvbnMuZGVhbGVyTGlzdElkKSxcbiAgICAgICAgICAgICAgICBzbGlkZU1hcEJ0biA9ICQoJy5qcy1tYXAtc2xpZGUnKSxcbiAgICAgICAgICAgICAgICBjdXJQbGFjZUJ0biA9ICQoJyNjdXItcGxhY2UnKTtcblxuICAgICAgICAgICAgd2luZG93Lm1hcEluaXQgPSB7XG4gICAgICAgICAgICAgICAgZ2VvQ29kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgZ2VvY29kZXIgPSBuZXcgeW1hcHMuZ2VvY29kZShyZWdpb25MaXN0LmZpbmQoJ2EuY2xpY2tlZCcpLmF0dHIoJ3JlbCcpKTsvLyDQl9Cw0L/Rg9GB0Log0L/RgNC+0YbQtdGB0YHQsCDQs9C10L7QutC+0LTQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyB5bWFwcy5nZW9jb2RlKHJlZ2lvbkxpc3QuYXR0cigncmVsJykpOy8vINCX0LDQv9GD0YHQuiDQv9GA0L7RhtC10YHRgdCwINCz0LXQvtC60L7QtNC40YDQvtCy0LDQvdC40Y9cblxuICAgICAgICAgICAgICAgICAgICBnZW9jb2Rlci50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLmdlb09iamVjdHMuZ2V0TGVuZ3RoKCkpIHJldHVybiBtYXBJbml0LmNyZWF0ZSh7fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Qm91bmRzID0gcmVzLmdlb09iamVjdHMuZ2V0KDApLnByb3BlcnRpZXMuZ2V0KCdib3VuZGVkQnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBJbml0LmNyZWF0ZSh7Ym91bmRzOiBjdXJyZW50Qm91bmRzfSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcEluaXQuY3JlYXRlKHt9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uIChvcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHQuYm91bmRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHQuY2VudGVyID0gWzU1Ljc0OTU0LCAzNy42MjE1ODddO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0Lnpvb20gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIG9wdC50eXBlID0gJ3lhbmRleCNtYXAnO1xuICAgICAgICAgICAgICAgICAgICBtYXAgPSBuZXcgeW1hcHMuTWFwKHRhcmdldC5hdHRyKCdpZCcpLCBvcHQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCU0L7QsdCw0LLQu9C10L3QuNC1IFR5cGVDb250cm9sLCBUb29sQmFyLCBab29tLCBTY2FsZUxpbmVcbiAgICAgICAgICAgICAgICAgICAgbWFwLmNvbnRyb2xzLmFkZCgndHlwZVNlbGVjdG9yJykuYWRkKCdtYXBUb29scycpLmFkZCgnem9vbUNvbnRyb2wnKS5hZGQoJ3NjYWxlTGluZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcC5nZW9PYmplY3RzLmFkZChnQ29sbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5nZW9PYmplY3RzLmFkZChnQ29sbGVjdGlvblNlYXJjaCk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1NldCgpO1xuICAgICAgICAgICAgICAgICAgICBtYXBTbGlkZXJJbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAganNfYW5pbWF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZWdpb25MaXN0SWQgIT0gJ2xzLWNoYW5nZS1jaXR5LXB1JylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lvbkxpc3RJbml0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVhbGVyTGlzdEluaXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cubWFwUmVJbml0ID0gZnVuY3Rpb24gKHJlZ0xpc3QpIHtcbiAgICAgICAgICAgICAgICBnQ29sbGVjdGlvbi5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBnQ29sbGVjdGlvblNlYXJjaC5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICBnQ29sbGVjdGlvblNob3dlZC5yZW1vdmVBbGwoKTtcblxuICAgICAgICAgICAgICAgIHJlZ2lvbkxpc3QgPSByZWdMaXN0IHx8IHJlZ2lvbkxpc3Q7XG5cbiAgICAgICAgICAgICAgICB2YXIgZ2VvY29kZXIgPSBuZXcgeW1hcHMuZ2VvY29kZShyZWdpb25MaXN0LmZpbmQoJ2EuY2xpY2tlZCcpLmF0dHIoJ3JlbCcpKTsvLyDQl9Cw0L/Rg9GB0Log0L/RgNC+0YbQtdGB0YHQsCDQs9C10L7QutC+0LTQuNGA0L7QstCw0L3QuNGPXG4gICAgICAgICAgICAgICAgZ2VvY29kZXIudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzLmdlb09iamVjdHMuZ2V0TGVuZ3RoKCkpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEJvdW5kcyA9IHJlcy5nZW9PYmplY3RzLmdldCgwKS5wcm9wZXJ0aWVzLmdldCgnYm91bmRlZEJ5Jyk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNTZXQoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNTZXQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1hcEluaXQuZ2VvQ29kZXIoKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gbWFya2Vyc1NldChmaXJzdCkge1xuXG4gICAgICAgICAgICAgICAgZGVhbGVyTGlzdC5maW5kKCdbcmVsPVwiNG1hcFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWFwSHJlZiA9ICQodGhpcykuZmluZCgnYS5qcy1zaG93LW9uLW1hcCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbWFwSHJlZi5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb29yZCA9IG1hcEhyZWYuYXR0cigncmVsJykuc3BsaXQoJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlYWxlciA9ICQodGhpcykuY2xvbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVhbGVyLmZpbmQoJ2EuanMtc2hvdy1vbi1tYXAnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGh0bWwgPSBkZWFsZXIuaHRtbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1hcmtlcihjb29yZFswXSAvIDEsIGNvb3JkWzFdIC8gMSwgaHRtbCwgJCh0aGlzKS5oYXNDbGFzcygnaGlkZGVuJyksIGRlYWxlci5maW5kKCcuYi1kaWxlci1ibG9ja19fbmFtZScpLnRleHQoKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbWFwSHJlZi5hdHRyKCdyZXYnLCBnQ29sbGVjdGlvbi5nZXRMZW5ndGgoKSAtIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFnQ29sbGVjdGlvbi5nZXRMZW5ndGgoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIG1hcC5zZXRDZW50ZXIoWzU1Ljc2LCAzNy42NF0sIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vINCh0L7Qt9C00LDQtdC8INC+0LHQu9Cw0YHRgtGMINC/0L7QutCw0LfQsCDQv9C+INCz0YDRg9C/0L/QtSDRgtC+0YfQtdC6XG4gICAgICAgICAgICAgICAgbWFwLnNldEJvdW5kcyhnQ29sbGVjdGlvbi5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgaWYgKG1hcC5nZXRab29tKCkgPiAxMCkgbWFwLnNldFpvb20oMTApO1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudEJvdW5kcykgY3VycmVudEJvdW5kcyA9IG1hcC5nZXRCb3VuZHMoKTtcbiAgICAgICAgICAgICAgICAvL9C10YHQu9C4INCy0LTRgNGD0LMg0YfRgtC+LdGC0L4g0LDQstGC0L7QvNCw0YLQvtC8INC90LUg0L/QvtGB0YLQsNCy0LjQu9C+0YHRjFxuXG4gICAgICAgICAgICAgICAgc2hvd1VzZWQgPSBzbGlkZU1hcEJ0bi5oYXNDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbnRlcjtcblxuICAgICAgICAgICAgd2luZG93Lm1hcE1hcmtlcnNIaWRkZW5TaG93ID0gZnVuY3Rpb24gKGl0ZW1zLCBzaG93KSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbnVtMSA9IGdDb2xsZWN0aW9uLmdldExlbmd0aCgpLCBudW0yID0gaXRlbXMubGVuZ3RoLCBpID0gMCwgY250ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbnVtID0gKG51bTIgPiBudW0xID8gbnVtMSA6IG51bTIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFudW0pIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciB2aXMgPSB7J3Zpc2libGUnOiBzaG93fSwgcGxhY2VtYXJrSWQsIHBsYWNlbWFyaztcblxuICAgICAgICAgICAgICAgIGlmIChzaG93KSBnQ29sbGVjdGlvbkZvclNlYXJjaCA9IGdDb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgIGVsc2UgZ0NvbGxlY3Rpb25Gb3JTZWFyY2ggPSBnQ29sbGVjdGlvblNob3dlZDtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwbGFjZW1hcmtJZCA9ICQoaXRlbXNbaV0pLmZpbmQoJ2EuanMtc2hvdy1vbi1tYXAnKS5hdHRyKCdyZXYnKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtYXJrID0gZ0NvbGxlY3Rpb24uZ2V0KHBsYWNlbWFya0lkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwbGFjZW1hcmspIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZW1hcmsub3B0aW9ucy5zZXQodmlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBTbGlkZXJJbml0KCkge1xuICAgICAgICAgICAgICAgIHNsaWRlTWFwQnRuLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcFNsaWRlclNob3cyKHNsaWRlTWFwQnRuLmhhc0NsYXNzKCdvcGVuZWQnKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgY3VyUGxhY2VCdG4uYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIG1hcFNsaWRlclNob3coY3VyUGxhY2VCdG4uaGFzQ2xhc3MoJ29wZW5lZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzaG93VXNlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBTbGlkZXJTaG93MihoaWRlLCBmYXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcEJveCA9ICQoJyMnICsgdGFyZ2V0LmF0dHIoJ2lkJykpLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TcGVlZCA9IDcwMDtcbiAgICAgICAgICAgICAgICBpZiAoaGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZU1hcEJ0bi5yZW1vdmVDbGFzcygnb3BlbmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlTWFwQnRuLmZpbmQoXCJzcGFuXCIpLnRleHQoJ9Cf0L7QutCw0LfQsNGC0Ywg0LrQsNGA0YLRgycpLnRvZ2dsZUNsYXNzKFwiYi1vcGVuLWNsb3NlX190ZXh0LS1tb3JlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFzdCkgbWFwQm94LnN0b3AoMSwgMSkuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIG1hcEJveC5zdG9wKDEsIDEpLnNsaWRlVXAoYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICAgICAgICAgICAgICBzaG93VXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2xpZGVNYXBCdG4uYWRkQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgIHNsaWRlTWFwQnRuLmZpbmQoXCJzcGFuXCIpLnRleHQoJ9Ch0LrRgNGL0YLRjCDQutCw0YDRgtGDJykudG9nZ2xlQ2xhc3MoXCJiLW9wZW4tY2xvc2VfX3RleHQtLW1vcmVcIik7XG4gICAgICAgICAgICAgICAgdmFyIHNob3dDYWxsQmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaG93VXNlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldEJvdW5kcyhnQ29sbGVjdGlvbi5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFwLmdldFpvb20oKSA+IDEwKSBtYXAuc2V0Wm9vbSgxMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2hvd1VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBtYXAuY29udGFpbmVyLmZpdFRvVmlld3BvcnQoKTtcdC8v0LjQt9Cx0LDQstC70LXQvdC40LUg0L7RgiDQsdCw0LPQsCwg0LrQvtCz0LTQsCDRgNC10YHQsNC50LfQsNC10YLRgdGPINC+0LrQvdC+INCx0YDQsNGD0LfQtdGA0LAg0L/RgNC4INC30LDQutGA0YvRgtC+0Lkg0LrQsNGA0YLQtSDQuCDQvtC90LAg0LvQvtC80LDQtdGC0YHRjyDQv9GA0Lgg0L7RgtC60YDRi9GC0LjQuFxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZhc3QpIHJldHVybiBtYXBCb3guc3RvcCgxLCAxKS5zbGlkZURvd24oYW5pbWF0aW9uU3BlZWQsIHNob3dDYWxsQmFjayk7XG5cbiAgICAgICAgICAgICAgICBtYXBCb3guc3RvcCgxLCAxKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2hvd0NhbGxCYWNrKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBTbGlkZXJTaG93KGhpZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9ICQoJyNkZWFsZXItcmVnaW9ucyB1bCcpLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TcGVlZCA9IDcwMDtcblxuICAgICAgICAgICAgICAgIGlmIChoaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc2xpZGVVcChhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyUGxhY2VCdG4udG9nZ2xlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsaXN0LnNsaWRlRG93bihhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyUGxhY2VCdG4udG9nZ2xlQ2xhc3MoJ29wZW5lZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLmNvbnRhaW5lci5maXRUb1ZpZXdwb3J0KCk7XHQvL9C40LfQsdCw0LLQu9C10L3QuNC1INC+0YIg0LHQsNCz0LAsINC60L7Qs9C00LAg0YDQtdGB0LDQudC30LDQtdGC0YHRjyDQvtC60L3QviDQsdGA0LDRg9C30LXRgNCwINC/0YDQuCDQt9Cw0LrRgNGL0YLQvtC5INC60LDRgNGC0LUg0Lgg0L7QvdCwINC70L7QvNCw0LXRgtGB0Y8g0L/RgNC4INC+0YLQutGA0YvRgtC40LhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZWFyY2hJbml0KCkge1xuICAgICAgICAgICAgICAgIHZhciBnZW9SZXN1bHQ7XG4gICAgICAgICAgICAgICAgc2VhcmNoRmllbGQuYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBmdW5jdGlvbiAocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdmFyIHJlZyA9ICQocmVnaW9uTGlzdCkuZmluZCgnbGkgYS5jbGlja2VkJykuYXR0cigncmVsJykgfHwgJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnID0gXCLQoNC+0YHRgdC40Y8sINCc0L7RgdC60LLQsCwg0LPQvtGA0L7QtCDQnNC+0YHQutCy0LBcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZWdpb24gPSByZWc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnID0gcmVnLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNpdHkgPSByZWdbMV0ucmVwbGFjZSgvXlxccyrQs9C+0YDQvtC0XFxzKy8sICcnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaXR5ICE9IHJlZ1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnLnNwbGljZSgwLCAwLCBjaXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByZWcgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdpb24pIHJlZ2lvbiArPSAnLCAnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IHltYXBzLmdlb2NvZGUocmVnaW9uICsgcmVxdWVzdC50ZXJtLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyaWN0Qm91bmRzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZGVkQnk6IGN1cnJlbnRCb3VuZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAganNvbjogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOy8vINCX0LDQv9GD0YHQuiDQv9GA0L7RhtC10YHRgdCwINCz0LXQvtC60L7QtNC40YDQvtCy0LDQvdC40Y9cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g0KHQvtC30LTQsNC90LjQtSDQvtCx0YDQsNCx0L7RgtGH0LjQutCwINC00LvRjyDRg9GB0L/QtdGI0L3QvtCz0L4g0LfQsNCy0LXRgNGI0LXQvdC40Y8g0LPQtdC+0LrQvtC00LjRgNC+0LLQsNC90LjRj1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9jb2Rlci50aGVuKGZ1bmN0aW9uIChyZXMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVja0l0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9ICcnLCBwYXJhbSwgdmFsID0gaXRlbS5wcm9wZXJ0aWVzLl9LLnRleHQuc3BsaXQoJywnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHZhbC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVneCA9IG5ldyBSZWdFeHAoJ1xccyonICsgcmVnW2ldICsgJ1xccyonKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbSA9IHJlZ3guZXhlYyh2YWxba10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RyKSBzdHIgKz0gJywnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyICs9IHZhbFtrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogc3RyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHN0cixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBpdGVtLmdlb21ldHJ5LmdldENvb3JkaW5hdGVzKClbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb25naXR1ZGU6IGl0ZW0uZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZm8gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuZ2VvT2JqZWN0cy5lYWNoKGNoZWNrSXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKGluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5kYXRhKFwidWktYXV0b2NvbXBsZXRlXCIpLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24gKHVsLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgkKFwiZGl2XCIpLmlzKFwiLmItcHJvZHVjdC1tYXBfX21hcC0td2hlcmUtdG8tYnV5LW1hcFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWwuYWRkQ2xhc3MoJ2Z1bGwtc2NyZWVuJyk7IC8vVWwgY3VzdG9tIGNsYXNzIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKFwiPGxpPjwvbGk+XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLy5hZGRDbGFzcyhpdGVtLmN1c3RvbUNsYXNzKSAvL2l0ZW0gYmFzZWQgY3VzdG9tIGNsYXNzIHRvIGxpIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoXCI8YSBocmVmPScjJz5cIiArIGl0ZW0ubGFiZWwgKyBcIjwvYT5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5kYXRhKFwidWktYXV0b2NvbXBsZXRlLWl0ZW1cIiwgaXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyh1bCk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkQnRuLnBhcmVudCgpLnBhcmVudCgpLmJpbmQoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlYXJjaEZpZWxkLnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2xpZGVNYXBCdG4uaGFzQ2xhc3MoJ29wZW5lZCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwU2xpZGVyU2hvdzIoZmFsc2UsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGdDb2xsZWN0aW9uU2VhcmNoLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVnaW9uID0gJChyZWdpb25MaXN0KS5maW5kKCdsaSBhLmNsaWNrZWQnKS5hdHRyKCdyZWwnKSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2lvbikgcmVnaW9uICs9ICcsICc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBnZW9jb2RlciA9IG5ldyB5bWFwcy5nZW9jb2RlKHJlZ2lvbiArIHNlYXJjaEZpZWxkLnZhbCgpLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpY3RCb3VuZHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kZWRCeTogY3VycmVudEJvdW5kc1xuICAgICAgICAgICAgICAgICAgICB9KTsvLyDQl9Cw0L/Rg9GB0Log0L/RgNC+0YbQtdGB0YHQsCDQs9C10L7QutC+0LTQuNGA0L7QstCw0L3QuNGPXG5cbiAgICAgICAgICAgICAgICAgICAgZ2VvY29kZXIudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5nZW9PYmplY3RzLmdldExlbmd0aCgpKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb1Jlc3VsdCA9IHJlcy5nZW9PYmplY3RzLmdldCgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ID0gZ2VvUmVzdWx0Lmdlb21ldHJ5LmdldENvb3JkaW5hdGVzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZGRyZXNzID0gZ2VvUmVzdWx0LnByb3BlcnRpZXMuX0sudGV4dDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy95bWFwcy50ZW1wbGF0ZUxheW91dEZhY3RvcnkuY3JlYXRlQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlb1Jlc3VsdCA9IG5ldyB5bWFwcy5QbGFjZW1hcmsocG9pbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWxsb29uQ29udGVudDogYWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGdDb2xsZWN0aW9uU2VhcmNoLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ0NvbGxlY3Rpb25TZWFyY2guYWRkKGdlb1Jlc3VsdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwb2ludHMgPSBbXSwgbGVuID0gW10sIHRtcCwgaSwgbnVtLCBwb2ludDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gZ0NvbGxlY3Rpb25Gb3JTZWFyY2guZ2V0TGVuZ3RoKCkgLSAxOyBrID49IDA7IGstLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50MiA9IGdDb2xsZWN0aW9uRm9yU2VhcmNoLmdldChrKS5nZW9tZXRyeS5nZXRDb29yZGluYXRlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRtcCA9IHltYXBzLmNvb3JkU3lzdGVtLmdlby5nZXREaXN0YW5jZShwb2ludCwgcG9pbnQyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIG51bSA9IGxlbi5sZW5ndGg7IGkgPCBudW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVuW2ldIDwgdG1wKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZW4uc3BsaWNlKGksIDAsIHRtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5zcGxpY2UoaSwgMCwgcG9pbnQyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbi5wdXNoKHRtcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy5wdXNoKHBvaW50Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMgPSBwb2ludHMuc2xpY2UoMCwgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMucHVzaChwb2ludCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSB5bWFwcy51dGlsLmJvdW5kcy5mcm9tUG9pbnRzKHBvaW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3VuZHNbMF1bMV0gLT0gMC4wNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvdW5kc1sxXVsxXSArPSAwLjA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldEJvdW5kcyhib3VuZHMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW9SZXN1bHQuYmFsbG9vbi5vcGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWdpb25MaXN0SW5pdCgpIHtcbiAgICAgICAgICAgICAgICByZWdpb25MaXN0LmZpbmQoJ2xpIGEnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgb1RoaXMgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvUmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29vcmQgPSAkKHRoaXMpLmF0dHIoJ3JlbCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGdDb2xsZWN0aW9uLnJlbW92ZUFsbCgpO1xuICAgICAgICAgICAgICAgICAgICBnQ29sbGVjdGlvblNlYXJjaC5yZW1vdmVBbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgZ0NvbGxlY3Rpb25TaG93ZWQucmVtb3ZlQWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEZpZWxkLnZhbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGdlb2NvZGVyID0gbmV3IHltYXBzLmdlb2NvZGUoY29vcmQsIHtyZXN1bHRzOiAxfSk7Ly8g0JfQsNC/0YPRgdC6INC/0YDQvtGG0LXRgdGB0LAg0LPQtdC+0LrQvtC00LjRgNC+0LLQsNC90LjRj1xuXG4gICAgICAgICAgICAgICAgICAgIC8vINCh0L7Qt9C00LDQvdC40LUg0L7QsdGA0LDQsdC+0YLRh9C40LrQsCDQtNC70Y8g0YPRgdC/0LXRiNC90L7Qs9C+INC30LDQstC10YDRiNC10L3QuNGPINCz0LXQvtC60L7QtNC40YDQvtCy0LDQvdC40Y9cbiAgICAgICAgICAgICAgICAgICAgZ2VvY29kZXIudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy5nZW9PYmplY3RzLmdldExlbmd0aCgpKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDQldGB0LvQuCDQvtCx0YrQtdC60YIg0LHRi9C7INC90LDQudC00LXQvSwg0YLQviDQtNC+0LHQsNCy0LvRj9C10Lwg0LXQs9C+INC90LAg0LrQsNGA0YLRgyDQuCDRhtC10L3RgtGA0LjRgNGD0LXQvCDQutCw0YDRgtGDINC/0L4g0L7QsdC70LDRgdGC0Lgg0L7QsdC30L7RgNCwINC90LDQudC00LXQvdC90L7Qs9C+INC+0LHRitC10LrRgtCwXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFNsaWRlclNob3cyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCb3VuZHMgPSByZXMuZ2VvT2JqZWN0cy5nZXQoMCkucHJvcGVydGllcy5nZXQoJ2JvdW5kZWRCeScpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdDb2xsZWN0aW9uLmdldExlbmd0aCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5zZXRCb3VuZHMoY3VycmVudEJvdW5kcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcFNsaWRlclNob3coMSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcilcdC8vINCf0YDQvtGG0LXRgdGBINCz0LXQvtC60L7QtNC40YDQvtCy0LDQvdC40Y8g0LfQsNCy0LXRgNGI0LXQvSDQvdC10YPQtNCw0YfQvdC+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgJChyZWdpb25MaXN0KS5maW5kKCdsaSBhLmNsaWNrZWQnKS5yZW1vdmVDbGFzcygnY2xpY2tlZCcpO1x0Ly/Qv9C+LdCy0YvQtNC10LvQtdC90L3QvtC80YMg0LjRidC10Lwg0LIg0YTQvtGA0LzQtSDQv9C+0LjRgdC60LBcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnY2xpY2tlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICQoZGVhbGVyTGlzdCkuZW1wdHkoKTtcblxuICAgICAgICAgICAgICAgICAgICBBQy5zaW1wbGUoJycsICdQT1NUJywgeydzdWJtaXRfZGVhbGVycyc6IHRydWUsIHNfcmVnaW9uOiBjb29yZH0sIGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcShkZWFsZXJMaXN0KS5odG1sKHRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1NldCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJQbGFjZUJ0bi5odG1sKCQodGhpcykudGV4dCgpICsgJzxpPiZuYnNwOzwvaT4nKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVhbGVyTGlzdEluaXQoKSB7XG5cbiAgICAgICAgICAgICAgICAvL2RlYWxlckxpc3QuZmluZCgnW3JlbD1cIjRtYXBcIl0uanMtZGVhbGVyIGEuanMtc2hvdy1vbi1tYXAnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIC8vZGVhbGVyTGlzdC5maW5kKCdhLmpzLXNob3ctb24tbWFwJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBkZWFsZXJMaXN0LmZpbmQoJ2EuanMtc2hvdy1vbi1tYXAnKS5zZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2xpZGVNYXBCdG4uaGFzQ2xhc3MoJ29wZW5lZCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFwU2xpZGVyU2hvdzIoZmFsc2UsIHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUYXJnZXQgPSAkKCcuanMtbWFwLXNsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+IHNjcm9sbFRhcmdldC5vZmZzZXQoKS50b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBzY3JvbGxUYXJnZXQub2Zmc2V0KCkudG9wfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgcGxhY2VtYXJrSWQgPSAkKHRoaXMpLmF0dHIoJ3JldicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VtYXJrID0gZ0NvbGxlY3Rpb24uZ2V0KHBsYWNlbWFya0lkKTtcblxuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0Wm9vbSgxNSk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWFyay5iYWxsb29uLm9wZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZU1hcmtlcihwb3NYLCBwb3NZLCBpbmZvYm94SHRtbCwgaGlkZGVuLCBkaWxlck5hbWUpIHtcblxuICAgICAgICAgICAgICAgIHZhciBjbG9zZUJhbGxvb25UZW1wbGF0ZSA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcyhcbiAgICAgICAgICAgICAgICAgICAgJzxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCIgdGl0bGU9XCInICsgZGlsZXJOYW1lICsgJ1wiIGNsYXNzPVwiYi1wcm9kdWN0LW1hcF9fY2xvc2UtbGlua1wiPjxpIGNsYXNzPVwiaWNvbi14XCI+PC9pPjwvYT4nLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3Iuc3VwZXJjbGFzcy5idWlsZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcy5nZXRQYXJlbnRFbGVtZW50KCkpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuYmFsbG9vbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgLy8gc3R5bGU9XCJtYXJnaW46IC0xNjFweCAwIDAgLTgxcHg7XCJcbiAgICAgICAgICAgICAgICB2YXIgc2FtcGxlQmFsbG9vblRlbXBsYXRlID0geW1hcHMudGVtcGxhdGVMYXlvdXRGYWN0b3J5LmNyZWF0ZUNsYXNzXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImItcHJvZHVjdC1tYXBfX2JhbGxvbi1ibG9ja1wiPiAkW1tvcHRpb25zLmNsb3NlQnV0dG9uTGF5b3V0XV0gJFtwcm9wZXJ0aWVzLmJhbGxvb25Db250ZW50XTwvZGl2PidcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdmFyIGljb25TdHlsZSA9IHltYXBzLnRlbXBsYXRlTGF5b3V0RmFjdG9yeS5jcmVhdGVDbGFzcygnPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiB0aXRsZT1cIicgKyBkaWxlck5hbWUgKyAnXCIgY2xhc3M9XCJiLXByb2R1Y3QtbWFwX19iYWxvb24tbWFwXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAnPGltZyBzcmM9XCJpbWFnZXMvaW5odG1sL2xvZ28tbWluLnN2Z1wiIGFsdD1cIlwiIHRpdGxlPVwiXCIgY2xhc3M9XCJiLXByb2R1Y3QtbWFwX19sb2dvXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2E+Jyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhbcG9zWCwgcG9zWV0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGxvb25Db250ZW50OiBpbmZvYm94SHRtbFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnL2xhbmcvcnUvaW1hZ2VzL2luaHRtbC9waW4ucG5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6ICFoaWRkZW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2ljb25JbWFnZVNpemU6IFs1MywgMzZdLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pY29uSW1hZ2VPZmZzZXQ6IFstMTA2LCAtMTc0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGxvb25MYXlvdXQ6IHNhbXBsZUJhbGxvb25UZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGxvb25DbG9zZUJ1dHRvbkxheW91dDogY2xvc2VCYWxsb29uVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiYWxsb29uU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25MYXlvdXQ6IGljb25TdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbGxvb25JY29uSW1hZ2VPZmZzZXQ6IFstMTA2LCAtMTc0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vaGlkZUljb246IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcGxhY2VtYXJrLmV2ZW50cy5hZGQoJ2JhbGxvb25vcGVuJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmdldCgndGFyZ2V0JykuYmFsbG9vbik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IGV2ZW50LmdldCgndGFyZ2V0JykuZ2VvbWV0cnkuZ2V0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IG1hcC5nZXRHbG9iYWxQaXhlbENlbnRlcigpO1xuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0R2xvYmFsUGl4ZWxDZW50ZXIoW3Bvc2l0aW9uWzBdLCBwb3NpdGlvblsxXSAtIDI2XSk7IC8v0L/QvtC00LPQvtC90Y/QtdC8INC/0L7QtCDRhNC70LDQttC+0LpcblxuICAgICAgICAgICAgICAgICAgICAvLyBldmVudC5nZXQoJ3RhcmdldCcpLmJhbGxvb24uc2V0UG9zaXRpb24oW3Bvc2l0aW9uWzBdIC0gMTYxLCBwb3NpdGlvblsxXSAtIDgxXSk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIuYi1wcm9kdWN0LW1hcF9fYmFsbG9uLWJsb2NrXCIpLmNzcyhcIm1hcmdpbi10b3BcIiwgLSgkKFwiLmItcHJvZHVjdC1tYXBfX2JhbGxvbi1ibG9ja1wiKS5vdXRlckhlaWdodCgpIC0gNDQpKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5iLXByb2R1Y3QtbWFwX19iYWxsb24tYmxvY2tcIikuY3NzKFwibWFyZ2luLWxlZnRcIiwgLSgoJChcIi5iLXByb2R1Y3QtbWFwX19iYWxsb24tYmxvY2tcIikub3V0ZXJXaWR0aCgpIC8gMikgLSAyNikpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlbWFyazIgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFtwb3NYLCBwb3NZXSk7XG4gICAgICAgICAgICAgICAgICAgIHltYXBzLnV0aWwuZXh0ZW5kKHBsYWNlbWFyazIsIHBsYWNlbWFyayk7XG4gICAgICAgICAgICAgICAgICAgIGdDb2xsZWN0aW9uU2hvd2VkLmFkZChwbGFjZW1hcmsyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBnQ29sbGVjdGlvbi5hZGQocGxhY2VtYXJrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24ganNfYW5pbWF0ZSgpIHtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLmpzLXNob3ctcGhvbmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVhbGVyID0gJCh0aGlzKS5wYXJlbnRzKFwiLmpzLWRlYWxlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBob25lID0gZGVhbGVyLmZpbmQoXCIuanMtcGhvbmVcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlYWxlck5hbWUgPSBkZWFsZXIuZmluZCgnLmItZGlsZXItYmxvY2tfX25hbWUnKS50ZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBob25lLmNzcygnZGlzcGxheScpICE9IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYi1kaWxlci1ibG9ja19fb3Blbi1waG9uZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImItZGlsZXItYmxvY2tfX3Nob3ctcGhvbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIFwi0J/QvtC60LDQt9Cw0YLRjCDRgtC10LvQtdGE0L7QvVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKFwic3BhblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcImItZGlsZXItYmxvY2tfX2JvcmRlci0tb3BlblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50ZXh0KFwi0J/QvtC60LDQt9Cw0YLRjCDRgtC10LvQtdGE0L7QvVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy/RgdC8INGE0LDQudC7IC9sYW5nL3J1L2pzL21haW4uanNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd2ViX2FuYWxpdHljcygnc2hvd1RlbCcsIChmYWxzZSkrJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9nYSgnc2VuZCcsICdldmVudCcsICdzaG93VGVsJywgJ2ZhbHNlJywgZGVhbGVyTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFwiYi1kaWxlci1ibG9ja19fc2hvdy1waG9uZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyhcImItZGlsZXItYmxvY2tfX29wZW4tcGhvbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cihcInRpdGxlXCIsIFwi0KHQutGA0YvRgtGMINGC0LXQu9C10YTQvtC9XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbmQoXCJzcGFuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKFwiYi1kaWxlci1ibG9ja19fYm9yZGVyLS1vcGVuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoXCLQodC60YDRi9GC0Ywg0YLQtdC70LXRhNC+0L1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZS5zaG93KCkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL9GB0Lwg0YTQsNC50LsgL2xhbmcvcnUvanMvbWFpbi5qc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy93ZWJfYW5hbGl0eWNzKCdzaG93VGVsJywgKHRydWUpKycnKTtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vICBnYSgnc2VuZCcsICdldmVudCcsICdzaG93VGVsJywgJ3RydWUnLCBkZWFsZXJOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLXNob3ctb3RoZXInLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZChcInNwYW5cIikudG9nZ2xlQ2xhc3MoXCJiLW9wZW4tY2xvc2VfX3RleHQtLW1vcmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaG93ZWQgPSAkKHRoaXMpLmhhc0NsYXNzKCdvcGVuZWQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZCA9IChzaG93ZWQgPyAnaGlkZGVuJyA6ICdvcGVuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBybSA9IChzaG93ZWQgPyAnb3BlbicgOiAnaGlkZGVuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtID0gJChcIi5qcy1kZWFsZXJzLW90aGVyLlwiICsgcm0pO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW5lZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG93ZWQpICAgICQodGhpcykuZmluZChcInNwYW5cIikudGV4dChcItCf0L7QutCw0LfQsNGC0Ywg0L7RgdGC0LDQu9GM0L3Ri9GFINC00LjQu9C70LXRgNC+0LJcIik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICQodGhpcykuZmluZChcInNwYW5cIikudGV4dChcItCh0LrRgNGL0YLRjCDQvtGB0YLQsNC70YzQvdGL0YUg0LTQuNC70LvQtdGA0L7QslwiKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5qcy1kZWFsZXJzLW90aGVyXCIpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbW92ZUNsYXNzKHJtKS5hZGRDbGFzcyhhZGQpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcE1hcmtlcnNIaWRkZW5TaG93KGl0ZW0uZmluZCgnLmpzLWRlYWxlcicpLCAhc2hvd2VkKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgICQuZm4uZ21hcENvbnRhY3QgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHltYXBzLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb250YWN0cyhvcHRpb25zLCB0YXJnZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNvbnRhY3RzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHRhcmdldCkge1xuICAgICAgICAgICAgdmFyIG1hcCxcbiAgICAgICAgICAgICAgICBwb2ludCA9IFs1NS43MjgsIDM3LjQ0OTU1XTtcblxuICAgICAgICAgICAgaWYgKCQod2luZG93KS5oZWlnaHQoKSA+IDgwMClcbiAgICAgICAgICAgICAgICB0YXJnZXQuY3NzKCdoZWlnaHQnLCAnNjAwcHgnKTtcblxuICAgICAgICAgICAgbWFwID0gbmV3IHltYXBzLk1hcCh0YXJnZXQuYXR0cignaWQnKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNlbnRlcjogcG9pbnQsXG4gICAgICAgICAgICAgICAgICAgIHpvb206IDE2LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAneWFuZGV4I21hcCdcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g0JTQvtCx0LDQstC70LXQvdC40LUgVHlwZUNvbnRyb2wsIFRvb2xCYXIsIFpvb20sIFNjYWxlTGluZVxuICAgICAgICAgICAgbWFwLmNvbnRyb2xzLmFkZCgndHlwZVNlbGVjdG9yJykuYWRkKCdtYXBUb29scycpLmFkZCgnem9vbUNvbnRyb2wnKS5hZGQoJ3NjYWxlTGluZScpO1xuXG4gICAgICAgICAgICB2YXIgcGxhY2VtYXJrID0gbmV3IHltYXBzLlBsYWNlbWFyayhwb2ludCwge30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VIcmVmOiAnL2xhbmcvJyArIF9iYXNlX2xhbmcgKyAnL2Nzcy9waWMtZ21hcC1tYXJrZXItY29udGFjdC5wbmcnLFxuICAgICAgICAgICAgICAgICAgICBpY29uSW1hZ2VTaXplOiBbMTIzLCA4NF0sXG4gICAgICAgICAgICAgICAgICAgIGljb25JbWFnZU9mZnNldDogWy00MCwgLTc4XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbWFwLmdlb09iamVjdHMuYWRkKHBsYWNlbWFyayk7XG4gICAgICAgIH07XG4gICAgfSkoalF1ZXJ5KTtcblxuICAgICRxKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCRxKCcjZ21hcC1jYXRhbG9nJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAkcSgnI2dtYXAtY2F0YWxvZycpLmdtYXBEZWFsZXIoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hGaWVsZElkOiAnanMtZ21hcC1zZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hGaWVsZEJ0bklkOiAnanMtZ21hcC1zZWFyY2gtYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgZGVhbGVyTGlzdElkOiAnanMtY2F0YWxvZy1kZWFsZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uTGlzdElkOiAnanMtbHMtY2hhbmdlLXJlZ2lvbidcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuanMtc2hvdy10YWJsZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHRhYmxlID0gJCh0aGlzKS5wYXJlbnRzKFwiLmItdGFibGUtaW5mb1wiKS5maW5kKFwidGFibGVcIik7XG4gICAgICAgICAgICB2YXIgbGlua190ZXh0ID0gKHRhYmxlLmNzcyhcImRpc3BsYXlcIikgPT0gXCJub25lXCIpID8gXCLQodC60YDRi9GC0Ywg0YHQv9C40YHQvtC6INGC0LjQv9C+0YDQsNC30LzQtdGA0L7QslwiIDogXCLQn9C+0LrQsNC30LDRgtGMINGB0L/QuNGB0L7QuiDRgtC40L/QvtGA0LDQt9C80LXRgNC+0LJcIjtcbiAgICAgICAgICAgICQodGhpcykuZmluZChcInNwYW5cIikudG9nZ2xlQ2xhc3MoXCJiLW9wZW4tY2xvc2VfX3RleHQtLW1vcmVcIik7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJ0aXRsZVwiLCBsaW5rX3RleHQpLmZpbmQoXCJzcGFuXCIpLnRleHQobGlua190ZXh0KTtcbiAgICAgICAgICAgIHRhYmxlLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJHEoJyNnbWFwLWNvbnRhY3QnKS5sZW5ndGgpXG4gICAgICAgICAgICAkcSgnI2dtYXAtY29udGFjdCcpLmdtYXBDb250YWN0KCk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5qcy1zZWxlY3QtcmVnaW9uXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCIjY2hvb3NlLWNpdHlcIikuaGlkZSgpLnBhcmVudHMoXCIuanMtcG9wdXBcIikuaGlkZSgpLnJlbW92ZUNsYXNzKCdvcGVuZWQnKTtcbiAgICAgICAgICAgICQoXCIjY2hvb3NlLXJlZ2lvblwiKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIjY2hvb3NlLXJlZ2lvbiBsaSBhXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIHJlZ2lvbl9jbGFzcyA9IFwiYi1jaG9vc2UtY2l0eV9fbGluay1jaXR5LS1zZWxlY3RlZCBjbGlja2VkXCI7XG4gICAgICAgICAgICAkKFwiI2Nob29zZS1yZWdpb24gYVwiKS5yZW1vdmVDbGFzcyhyZWdpb25fY2xhc3MpO1xuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhyZWdpb25fY2xhc3MpLnBhcmVudHMoXCIuanMtcG9wdXBcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG5cbiAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwibW9kYWxcIik7XG4gICAgICAgICAgICAkKFwiLmpzLXNlbGVjdC1jaXR5XCIpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiI2Nob29zZS1jaXR5IGxpIGFcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJlZ2lvbl9jbGFzcyA9IFwiYi1jaG9vc2UtY2l0eV9fbGluay1jaXR5LS1zZWxlY3RlZFwiO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgICQoXCIjY2hvb3NlLWNpdHkgLmItY2hvb3NlLWNpdHlfX2xpbmstY2l0eS0tc2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MocmVnaW9uX2NsYXNzKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MocmVnaW9uX2NsYXNzKS5wYXJlbnRzKFwiLmpzLXBvcHVwXCIpLmhpZGUoKTtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB0eXBlXHQ6J3Bvc3QnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnaHRtbCcsXG4gICAgICAgICAgICAgICAgZGF0YVx0OiBbXG4gICAgICAgICAgICAgICAgICAgIHtuYW1lOidzdWJtaXRfZGVhbGVyc19jaXR5Jyx2YWx1ZTp0cnVlfSxcbiAgICAgICAgICAgICAgICAgICAge25hbWU6J3NfcmVnaW9uJyx2YWx1ZTogJChzZWxmKS5hdHRyKCdyZWwnKX0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24ocmVzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjaG9vc2UtY2l0eVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5qcy1zZWxlY3QtY2l0eScpLnRleHQoJChzZWxmKS50ZXh0KCkpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm1vZGFsXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciAkaHRtbCA9ICQoJzxkaXY+JytyZXMrJzwvZGl2PicpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWFsZXJzVG9wID0gJGh0bWwuZmluZCgnLmpzLWRlYWxlcnMtdG9wJykuaHRtbCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVhbGVyc090aGVyID0gJGh0bWwuZmluZCgnLmItZGlsZXItYmxvY2stLW90aGVyJykuaHRtbCgpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgJCgnLmpzLWRlYWxlcnMtdG9wJykuaHRtbChkZWFsZXJzVG9wKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmItZGlsZXItYmxvY2stLW90aGVyJykuaHRtbChkZWFsZXJzT3RoZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIG1hcFJlSW5pdCgkKCcjbHMtY2hhbmdlLXJlZ2lvbi1wdScpKTtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuYi1jb250YWluZXItLXByb2R1Y3QgYS5scy1jaGFuZ2UtY2l0eVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCJhLmxzLWNoYW5nZS1jaXR5XCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgJCgnI2Nob29zZS1yZWdpb24nKS5zaG93KCkuZmluZCgnI2xzLWNoYW5nZS1yZWdpb24tcHUnKS5zaG93KCk7XG4gICAgICAgICAgICAvLyQoJyNscy1jaGFuZ2UtcmVnaW9uLXB1Jykuc2hvdygpO1xuICAgICAgICAgICAgLy8kKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm1vZGFsXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIiNscy1jaGFuZ2UtcmVnaW9uLXB1IGxpIGFcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgcmVnaW9uX2NsYXNzID0gXCJiLWNob29zZS1jaXR5X19saW5rLWNpdHktLXNlbGVjdGVkIGNsaWNrZWRcIjtcbiAgICAgICAgICAgICQoXCIjY2hvb3NlLXJlZ2lvbiBhXCIpLnJlbW92ZUNsYXNzKHJlZ2lvbl9jbGFzcyk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBcdCAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcIm1vZGFsXCIpO1xuXG4gICAgICAgICAgICBBQy5zaW1wbGUoJycsICdQT1NUJywgeydzdWJtaXRfZGVhbGVycyc6IHRydWUsIHNfcmVnaW9uOiAkKHRoaXMpLmF0dHIoJ3JlbCcpfSwgZnVuY3Rpb24gKHRleHQpIHtcblxuICAgICAgICAgICAgICAgICQoc2VsZikuYWRkQ2xhc3MocmVnaW9uX2NsYXNzKS5wYXJlbnRzKFwiLmpzLXBvcHVwXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuXG4gICAgICAgICAgICAgICAgJCgnI2xzLWNoYW5nZS1jaXR5LXB1JykuaHRtbCgkKHRleHQpLmh0bWwoKSkuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIikuZmluZCgnI2Nob29zZS1jaXR5Jykuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG5cblxuICAgIC8qKlxuICAgICAqIER1bmxvcDogaGlzdG9yeVxuICAgICAqIDEwLTA1LTIwMTY6IFZsYWRpbWlyIFR1cm9zaW5za2l5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0JjRgdGC0L7RgNC40Y9cbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIGFkcml2ZXJfY291bnRlcihjb3VudGVyLCBwbGFjZSkge1xuICAgICAgICB2YXIgUm5kTnVtNE5vQ2FzaCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApO1xuICAgICAgICB2YXIgYXJfVGFpbCA9ICd1bmtub3duJztcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyKSBhcl9UYWlsID0gZXNjYXBlKGRvY3VtZW50LnJlZmVycmVyKTtcblxuICAgICAgICB2YXIgcGxhY2UgPSAocGxhY2UgPyAnJnN6PScgKyBwbGFjZSA6ICcnKTtcbiAgICAgICAgdmFyIGh0bWwgPSAnPGltZyBzcmM9XCJodHRwOi8vYWQuYWRyaXZlci5ydS9jZ2ktYmluL3JsZS5jZ2k/JyArICdzaWQ9JyArIGNvdW50ZXIgKyBwbGFjZSArICcmYnQ9MjEmcHo9MCZybmQ9JyArIFJuZE51bTROb0Nhc2ggKyAnJnRhaWwyNTY9JyArIGFyX1RhaWwgKyAnXCIgYm9yZGVyPVwiMFwiIHdpZHRoPVwiMVwiIGhlaWdodD1cIjFcIiAvPic7XG5cbiAgICAgICAgJChcIiNhZHJpdmVyX2NvdW50ZXJcIikuaHRtbChodG1sKTtcbiAgICB9XG5cbiAgICAoZnVuY3Rpb24gKCQpIHtcbiAgICAgICAgJC5mbi5oaXN0b3J5U2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtzbGlkZVNwZWVkOiA4MDB9O1xuICAgICAgICAgICAgJC5leHRlbmQoc2V0dGluZ3MsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBzYXVzYWdlID0gJCgnI2hpc3Rvcnktc2xpZGVyIGRpdi5zYXVzYWdlJyksXG4gICAgICAgICAgICAgICAgeWVhclJlZnMgPSAkKCcucGFnaW5nIGEnKSxcbiAgICAgICAgICAgICAgICB3aGVlbCA9ICQoJyN3aGVlbCcpLFxuICAgICAgICAgICAgICAgIHdoZWVsRGl2ID0gJCgnI3doZWVsIGRpdicpLFxuICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93ID0gJCgnI3doZWVsIGknKSxcbiAgICAgICAgICAgICAgICB5ZWFyQnRuID0gJCgnLnBhZ2luZyBkaXYnKSxcbiAgICAgICAgICAgICAgICB5ZWFyQnRuTnVtYmVyID0geWVhckJ0bi5maW5kKCdzcGFuJyksXG4gICAgICAgICAgICAgICAgeWVhckJ0blN0ZXAgPSA4MCxcbiAgICAgICAgICAgICAgICB5ZWFyQnRuU3BlZWQgPSA4MCxcblxuICAgICAgICAgICAgICAgIHdoZWVsU2l6ZSA9IDM2MixcbiAgICAgICAgICAgICAgICB3aGVlbFBvcyxcbiAgICAgICAgICAgICAgICB3aGVlbFJvdGF0aW9uQ291bnRlciA9IDAsXG4gICAgICAgICAgICAgICAgbmV3V2hlZWxSb3RhdGlvbkNvdW50ZXIgPSAwLFxuICAgICAgICAgICAgICAgIHdoZWVsTnVtYmVyID0gMCxcbiAgICAgICAgICAgICAgICB3aGVlbFRydWVOdW1iZXIsXG5cbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgc3RlcENvdW50ID0gMCxcbiAgICAgICAgICAgICAgICBsZWZ0U3RlcENvdW50ID0gMCxcbiAgICAgICAgICAgICAgICBzbGlkZVRpbWUsXG4gICAgICAgICAgICAgICAgc3RhcnRQb3NpdGlvbixcbiAgICAgICAgICAgICAgICBzbGlkZUxlbmd0aCxcbiAgICAgICAgICAgICAgICB3aGVlbFN0ZXAsXG4gICAgICAgICAgICAgICAgbmV4dFRhcmdldCxcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICAgICAgY3VyID0gMCxcbiAgICAgICAgICAgICAgICB3aGVlbEludCxcbiAgICAgICAgICAgICAgICBzaWduID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaWduMiA9IHRydWUsXG4gICAgICAgICAgICAgICAgc2lnbjMgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGlzSUUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc0lPcyA9IChuYXZpZ2F0b3IucGxhdGZvcm0uaW5kZXhPZihcImlQaG9uZVwiKSAhPSAtMSkgfHwgKG5hdmlnYXRvci5wbGF0Zm9ybS5pbmRleE9mKFwiaVBvZFwiKSAhPSAtMSkgfHwgKG5hdmlnYXRvci5wbGF0Zm9ybS5pbmRleE9mKFwiaVBhZFwiKSAhPSAtMSkgPyB0cnVlIDogZmFsc2U7XG5cblxuXG4gICAgICAgICAgICBpbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzSU9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHdoZWVsLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICAgICAgICAgICAgICAgICAgICBzYXVzYWdlLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoJy9sYW5nL3J1L2ltYWdlcy9jb250ZW50L2hpc3RvcnkvaGlzdG9yeV9zYW1wbGUuanBnJylcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzSUUpXG4gICAgICAgICAgICAgICAgICAgIHdoZWVsRGl2LmNzcygnYmFja2dyb3VuZCcsIFwidXJsKCcvbGFuZy9ydS9pbWFnZXMvY29udGVudC9oaXN0b3J5L3BpYy1oaXN0b3J5LXdoZWVscy1pZS5wbmcnKSAwIDAgbm8tcmVwZWF0XCIpO1xuXG4gICAgICAgICAgICAgICAgZml0U2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpLmJpbmQoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpZ24pXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXRTaXplKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2lnbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHllYXJCdG5OdW1iZXIuZXEoMCkuZmFkZUluKHNldHRpbmdzLnNsaWRlU3BlZWQgLyAxNik7XG4gICAgICAgICAgICAgICAgeWVhckJ0bi5kcmFnZ2FibGUoe1xuICAgICAgICAgICAgICAgICAgICBheGlzOiAneCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoaWZ0ID0gcGFyc2VJbnQoJCh0aGlzKS5jc3MoJ2xlZnQnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IE1hdGguZmxvb3Ioc2hpZnQgLyB5ZWFyQnRuU3RlcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWlsID0gc2hpZnQgJSB5ZWFyQnRuU3RlcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhaWwgPiA1MilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXIgPSB5ZWFyUmVmcy5maWx0ZXIoJy5hY3RpdmUnKS5pbmRleCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoe2xlZnQ6IGluZGV4ICogeWVhckJ0blN0ZXAgKyAncHgnfSwgeWVhckJ0blNwZWVkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgeWVhclJlZnMuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaWduMylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VyID0geWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuaW5kZXgoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDE4NDczMTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBsYWNlbWVudCA9ICcnO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkcml2ZXJfY291bnRlcihjb3VudGVyLCBwbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB5ZWFyQnRuLmFuaW1hdGUoe2xlZnQ6IGluZGV4ICogeWVhckJ0blN0ZXAgKyAncHgnfSwgeWVhckJ0blNwZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlSW5pdCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBzaWRlU2xpZGUoZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyID0geWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gY3VyIC0gMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhckJ0bi5hbmltYXRlKHtsZWZ0OiBpbmRleCAqIHllYXJCdG5TdGVwICsgJ3B4J30sIHllYXJCdG5TcGVlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZUluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyID0geWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ciA8IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gY3VyICsgMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhckJ0bi5hbmltYXRlKHtsZWZ0OiBpbmRleCAqIHllYXJCdG5TdGVwICsgJ3B4J30sIHllYXJCdG5TcGVlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZUluaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcm90YXRlSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT0gY3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ZXBDb3VudCA9IHllYXJSZWZzLmVxKGluZGV4KS5hdHRyKCduYW1lJykgLSB5ZWFyUmVmcy5lcShjdXIpLmF0dHIoJ25hbWUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcENvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBDb3VudCA9IC0xICogc3RlcENvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFN0ZXBDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByb3RhdGUoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgeWVhckJ0bk51bWJlci5maWx0ZXIoJzp2aXNpYmxlJykuZmFkZU91dCgxKTtcbiAgICAgICAgICAgICAgICAgICAgeWVhckJ0bk51bWJlci5lcShpbmRleCkuZmFkZUluKHNldHRpbmdzLnNsaWRlU3BlZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNpZ24zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHllYXJCdG4uZHJhZ2dhYmxlKCdkaXNhYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcm90YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0UG9zaXRpb24gPSBwYXJzZUludChzYXVzYWdlLmNzcygnbGVmdCcpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFRhcmdldCA9IHllYXJSZWZzLmVxKGluZGV4IC0gc3RlcENvdW50ICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgd2hlZWxQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUxlbmd0aCA9IHBhcnNlSW50KG5leHRUYXJnZXQuYXR0cigncmVsJykpICsgc3RhcnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb24gPSAtMSAqIG5leHRUYXJnZXQuYXR0cigncmVsJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0VGFyZ2V0ID0geWVhclJlZnMuZXEoY3VyIC0gbGVmdFN0ZXBDb3VudCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShpc0lFICYmIHdoZWVsUG9zID4gNSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZUxlbmd0aCA9IE1hdGguYWJzKHBhcnNlSW50KG5leHRUYXJnZXQuYXR0cigncmVsJykpICsgc3RhcnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uID0gLTEgKiBuZXh0VGFyZ2V0LmF0dHIoJ3JlbCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoZWVsU3RlcCA9IHNsaWRlTGVuZ3RoIC8gMzI7XG4gICAgICAgICAgICAgICAgd2hlZWxSb3RhdGlvbkNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgIHNpZ24yID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzSU9zKVxuICAgICAgICAgICAgICAgICAgICBzYXVzYWdlLmNzcygnbGVmdCcsIHN0YXJ0UG9zaXRpb24gKyAncHgnKS5hbmltYXRlKHsnbGVmdCc6IGRlc3RpbmF0aW9uICsgJ3B4J30sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBzZXR0aW5ncy5zbGlkZVNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uIF9zdGVwQ2FsbGJhY2sobm93LCBvcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3V2hlZWxSb3RhdGlvbkNvdW50ZXIgPSBNYXRoLmZsb29yKE1hdGguYWJzKE1hdGguYWJzKHN0YXJ0UG9zaXRpb24pIC0gTWF0aC5hYnMobm93KSkgLyB3aGVlbFN0ZXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciAhPSBuZXdXaGVlbFJvdGF0aW9uQ291bnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFJvdGF0aW9uQ291bnRlciA9IG5ld1doZWVsUm90YXRpb25Db3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVXaGVlbChkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gX2NvbXBsZXRlQ2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcENvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFN0ZXBDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsTnVtYmVyID0gcGFyc2VJbnQobmV4dFRhcmdldC5hdHRyKCduYW1lJykpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFJvdGF0aW9uQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxQb3MgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZXBDb3VudCA+IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZShkaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyUmVmcy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7IC8vUmVtb3ZlIGFsbCBhY3RpdmUgY2xhc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhclJlZnMuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTsgLy9BZGQgYWN0aXZlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlzSUUgJiYgKHdoZWVsTnVtYmVyID09ICczJyB8fCB3aGVlbE51bWJlciA9PSAnOCcpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuY3NzKCdiYWNrZ3JvdW5kUG9zaXRpb24nLCAnMCAnICsgKC0xICogd2hlZWxOdW1iZXIgKiB3aGVlbFNpemUpICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gMzIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzSUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbE51bWJlciA9PSAnMycgfHwgd2hlZWxOdW1iZXIgPT0gJzgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxTaGFkb3cuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5ZWFyQnRuLmRyYWdnYWJsZSgnZW5hYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcENvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTdGVwQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgd2hlZWxSb3RhdGlvbkNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uICs9IDMwMDtcbiAgICAgICAgICAgICAgICAgICAgc2F1c2FnZS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyBkZXN0aW5hdGlvbiArICdweCwgMHB4LCAwcHgpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiAnLXdlYmtpdC10cmFuc2Zvcm0gJyArIChzZXR0aW5ncy5zbGlkZVNwZWVkIC8gMTAwMCkgKyAncyBsaW5lYXInXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgIC8qICAgICAgICAgICAgICAgIHdoZWVsSW50ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlV2hlZWwoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc2xpZGVTcGVlZCAvIDMyKTsqL1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGVwQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGUoZGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdoZWVsSW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNsaWRlU3BlZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhclJlZnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpOyAvL1JlbW92ZSBhbGwgYWN0aXZlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhclJlZnMuZXEoaW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKTsgLy9BZGQgYWN0aXZlIGNsYXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbjMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXJCdG4uZHJhZ2dhYmxlKCdlbmFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNsaWRlU3BlZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gcm90YXRlV2hlZWwoZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSUUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA8IDE2ICYmICF3aGVlbFNoYWRvdy5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxQb3MgPCA1IHx8IHdoZWVsUG9zID4gOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxQb3MgPT0gNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAxNilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPT0gMTgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxTaGFkb3cuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbE51bWJlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxOdW1iZXIgIT0gJzMnICYmIHdoZWVsTnVtYmVyICE9ICc4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAyMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPT0gMjQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPiAyNCAmJiB3aGVlbFBvcyA+IDQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZWVsRGl2LmFkZCh3aGVlbFNoYWRvdykuY3NzKCdvcGFjaXR5JykgPT0gJzAnICYmICh3aGVlbFJvdGF0aW9uQ291bnRlciA8IDE2KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsRGl2LmFkZCh3aGVlbFNoYWRvdykuYW5pbWF0ZSh7b3BhY2l0eTogJzEnfSwgc2V0dGluZ3Muc2xpZGVTcGVlZCAvIDQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxQb3MgPT0gNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA+IDE2ICYmIHNpZ24yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbjIgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbE51bWJlciAhPSAnMicgJiYgd2hlZWxOdW1iZXIgIT0gJzcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbERpdi5hZGQod2hlZWxTaGFkb3cpLmFuaW1hdGUoe29wYWNpdHk6ICcuNCd9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gNiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuYWRkKHdoZWVsU2hhZG93KS5hbmltYXRlKHtvcGFjaXR5OiAnMSd9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbERpdi5hZGQod2hlZWxTaGFkb3cpLmFuaW1hdGUoe29wYWNpdHk6ICcwJ30sIHNldHRpbmdzLnNsaWRlU3BlZWQgLyAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbE51bWJlcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdoZWVsTnVtYmVyID4gNCAmJiB3aGVlbE51bWJlciA8IDkpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFRydWVOdW1iZXIgPSA0O1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFRydWVOdW1iZXIgPSB3aGVlbE51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzSU9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuY3NzKCdiYWNrZ3JvdW5kUG9zaXRpb24nLCAoLTEgKiB3aGVlbFNpemUgKiB3aGVlbFBvcykgKyAncHggJyArICgtMSAqIHdoZWVsVHJ1ZU51bWJlciAqIHdoZWVsU2l6ZSkgKyAncHgnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0lFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPCA4ICYmICF3aGVlbFNoYWRvdy5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxQb3MgPCA1IHx8IHdoZWVsUG9zID4gOClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcy0tO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxQb3MgPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDM7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSA4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFNoYWRvdy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZWVsUm90YXRpb25Db3VudGVyID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxQb3MgPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsTnVtYmVyLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxOdW1iZXIgIT0gJzMnICYmIHdoZWVsTnVtYmVyICE9ICc4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAxNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFBvcyA9IDY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsU2hhZG93LmNzcygnZGlzcGxheScsICdibG9jaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPT0gMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPiAxNiAmJiB3aGVlbFBvcyA+IDQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxQb3MtLTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZWVsUG9zIDw9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxQb3MgPSAzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod2hlZWxSb3RhdGlvbkNvdW50ZXIgPiA4ICYmIHNpZ24yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2lnbjIgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbE51bWJlciAhPSAnNCcgJiYgd2hlZWxOdW1iZXIgIT0gJzknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbERpdi5hZGQod2hlZWxTaGFkb3cpLmFuaW1hdGUoe29wYWNpdHk6ICcuNCd9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gNiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuYWRkKHdoZWVsU2hhZG93KS5hbmltYXRlKHtvcGFjaXR5OiAnMSd9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuYWRkKHdoZWVsU2hhZG93KS5hbmltYXRlKHtvcGFjaXR5OiAnMCd9LCBzZXR0aW5ncy5zbGlkZVNwZWVkIC8gMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGVlbFJvdGF0aW9uQ291bnRlciA9PSAxMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsUG9zID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbE51bWJlci0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdoZWVsTnVtYmVyID4gNCAmJiB3aGVlbE51bWJlciA8IDkpXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFRydWVOdW1iZXIgPSA0O1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFRydWVOdW1iZXIgPSB3aGVlbE51bWJlcjtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzSU9zKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxEaXYuY3NzKCdiYWNrZ3JvdW5kUG9zaXRpb24nLCAoLTEgKiB3aGVlbFNpemUgKiB3aGVlbFBvcykgKyAncHggJyArICgtMSAqIHdoZWVsVHJ1ZU51bWJlciAqIHdoZWVsU2l6ZSkgKyAncHgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpdFNpemUoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4LFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG5cbiAgICAgICAgICAgICAgICAgICAgcGFnaW5nID0gJCgnLnBhZ2luZycpLFxuICAgICAgICAgICAgICAgICAgICB3cmFwID0gJCgnI3dyYXBwZXItaGlzdG9yeScpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyUmVmOSA9IHllYXJSZWZzLmVxKDgpLFxuICAgICAgICAgICAgICAgICAgICB3cmFwT2Zmc2V0LC8vd3JhcCBtYXJnaW4tbGVmdCAtINC/0YPRgtGMINC/0L4g0LrQvtGC0L7RgNC+0LzRgyDQutGA0YPRgtC40YLRgdGPINC60L7Qu9C10YHQvlxuICAgICAgICAgICAgICAgICAgICB3aGVlbE9mZnNldCwvL3doZWVsIG1hcmdpbi1sZWZ0IC0g0L7RgtGB0YLRg9C/0Ysg0LrQvtC70LXRgdCwXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc09mZnNldCwvL2xlZnQgLSBiYXNlcmVsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlOU9mZnNldDEsLy9yZWxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGU5T2Zmc2V0MixcbiAgICAgICAgICAgICAgICAgICAgc2l6ZURlbGltZXRlcjtcblxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3dXaWR0aCA8IDEwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcE9mZnNldCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIHdoZWVsT2Zmc2V0ID0gMTk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc09mZnNldCA9IDMwMDsvL3JlbFxuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQxID0gNDA1O1xuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQyID0gNDA1O1xuICAgICAgICAgICAgICAgICAgICBzaXplRGVsaW1ldGVyID0gMTA1MDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvd1dpZHRoID49IDEwMDAgJiYgd2luZG93V2lkdGggPCAxMjgwKSB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBPZmZzZXQgPSAxMzM7XG4gICAgICAgICAgICAgICAgICAgIHdoZWVsT2Zmc2V0ID0gMzk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc09mZnNldCA9IDMwMDtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGU5T2Zmc2V0MSA9IDI3MDtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGU5T2Zmc2V0MiA9IDM3MDtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZURlbGltZXRlciA9IDEyMDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3dXaWR0aCA+PSAxMjgwICYmIHdpbmRvd1dpZHRoIDwgMTQ0MCkge1xuICAgICAgICAgICAgICAgICAgICB3cmFwT2Zmc2V0ID0gMjExO1xuICAgICAgICAgICAgICAgICAgICB3aGVlbE9mZnNldCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNPZmZzZXQgPSAxNTA7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlOU9mZnNldDEgPSAyMDA7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlOU9mZnNldDIgPSAyNTA7XG4gICAgICAgICAgICAgICAgICAgIHNpemVEZWxpbWV0ZXIgPSAxNDAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod2luZG93V2lkdGggPj0gMTQ0MCAmJiB3aW5kb3dXaWR0aCA8IDE3MDApIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcE9mZnNldCA9IDI5MTtcbiAgICAgICAgICAgICAgICAgICAgd2hlZWxPZmZzZXQgPSAtOTI7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc09mZnNldCA9IDUwO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQxID0gMTIyO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQyID0gMTgwO1xuICAgICAgICAgICAgICAgICAgICBzaXplRGVsaW1ldGVyID0gMTYwMDtcbiAgICAgICAgICAgICAgICAgICAgeWVhckJ0blN0ZXAgPSA5NjtcbiAgICAgICAgICAgICAgICAgICAgeWVhckJ0blNwZWVkID0gOTY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd3JhcE9mZnNldCA9IDQ2MDtcbiAgICAgICAgICAgICAgICAgICAgd2hlZWxPZmZzZXQgPSAtMTM4O1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQxID0gLTQ1O1xuICAgICAgICAgICAgICAgICAgICBzbGlkZTlPZmZzZXQyID0gNTA7XG4gICAgICAgICAgICAgICAgICAgIHNpemVEZWxpbWV0ZXIgPSAxNzAwO1xuICAgICAgICAgICAgICAgICAgICB5ZWFyQnRuU3RlcCA9IDk2O1xuICAgICAgICAgICAgICAgICAgICB5ZWFyQnRuU3BlZWQgPSA5NjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbmRleCA9IHllYXJSZWZzLmZpbHRlcignLmFjdGl2ZScpLmluZGV4KCk7XG4gICAgICAgICAgICAgICAgd3JhcC5jc3MoJ21hcmdpbkxlZnQnLCB3cmFwT2Zmc2V0ICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgd2hlZWwuY3NzKCdtYXJnaW5MZWZ0Jywgd2hlZWxPZmZzZXQgKyAncHgnKTtcblxuICAgICAgICAgICAgICAgIHllYXJSZWZzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3JlbCcsIHBhcnNlSW50KCQodGhpcykuYXR0cignYmFzZXJlbCcpKSArIHNsaWRlc09mZnNldCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT0gOClcblxuICAgICAgICAgICAgICAgICAgICBzYXVzYWdlLmNzcygnbGVmdCcsIC0xICogeWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuYXR0cignYmFzZXJlbCcpIC0gc2xpZGVzT2Zmc2V0ICsgJ3B4Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAod2luZG93V2lkdGggPiBzaXplRGVsaW1ldGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJSZWY5LmF0dHIoJ3JlbCcsIHBhcnNlSW50KHllYXJSZWY5LmF0dHIoJ2Jhc2VyZWwnKSkgKyBzbGlkZTlPZmZzZXQxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXVzYWdlLmNzcygnbGVmdCcsIC0xICogeWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuYXR0cignYmFzZXJlbCcpIC0gc2xpZGU5T2Zmc2V0MSArICdweCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHllYXJSZWY5LmF0dHIoJ3JlbCcsIHBhcnNlSW50KHllYXJSZWY5LmF0dHIoJ2Jhc2VyZWwnKSkgKyBzbGlkZTlPZmZzZXQyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXVzYWdlLmNzcygnbGVmdCcsIC0xICogeWVhclJlZnMuZmlsdGVyKCcuYWN0aXZlJykuYXR0cignYmFzZXJlbCcpIC0gc2xpZGU5T2Zmc2V0MiArICdweCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgICQuZm4ud2hlZWxEYXRhU2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtzcGVlZDogNDAwfTtcbiAgICAgICAgICAgICQuZXh0ZW5kKHNldHRpbmdzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgcmVmcyA9ICQodGhpcykuZmluZCgnZGl2LnBhcmFtcy1uYXYgYScpLFxuICAgICAgICAgICAgICAgIHRhYmxlc19kaXYgPSB0YXJnZXQuZmluZCgnZGl2LnRhYmxlcycpO1xuICAgICAgICAgICAgdGFibGVzID0gdGFibGVzX2Rpdi5maW5kKCd0YWJsZS50YWJsZV90b3AsdGFibGUudGFibGVfYm90dG9tJykubm90KCcubHMtbGlzdCcpO1xuXG4gICAgICAgICAgICBoZWlnaHQgPSB0YWJsZXMuZXEoMCkuY3NzKCdoZWlnaHQnKTtcblxuICAgICAgICAgICAgaWYgKHRhYmxlcy5lcSgxKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0MiA9IHRhYmxlcy5lcSgxKS5jc3MoJ2hlaWdodCcpO1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCA+IGhlaWdodDIgPyBoZWlnaHQgOiBoZWlnaHQyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRhYmxlc19kaXYuaGFzQ2xhc3MoJ2xzLW5vLWhlaWdodCcpKSB7XG4gICAgICAgICAgICAgICAgdGFibGVzX2Rpdi5jc3MoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YWJsZXMubGVuZ3RoID09IDEpXG4gICAgICAgICAgICAgICAgdGFibGVzLmVxKDApLmZhZGVJbihzZXR0aW5ncy5zcGVlZCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGFibGVzX2Rpdi5maW5kKCcudGFibGVfJyArICQodGhpcykuZmluZCgnZGl2LnBhcmFtcy1uYXYgYS5hY3RpdmUnKS5hdHRyKCdyZWwnKSkuZmFkZUluKHNldHRpbmdzLnNwZWVkKTtcblxuICAgICAgICAgICAgaWYgKHJlZnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHJlZnMuYmluZCgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlZnMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICB0YWJsZXMuZmFkZVRvZ2dsZShzZXR0aW5ncy5zcGVlZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWZzLmVxKDApLmNzcygnY3Vyc29yJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgICAgICByZWZzLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICgkKCcjaGlzdG9yeS1zbGlkZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoJyNoaXN0b3J5LXNsaWRlcicpLmhpc3RvcnlTbGlkZXIoKTtcbiAgICAgICAgfVxuICAgIH0pKGpRdWVyeSk7XG5cbiAgICAvKipcbiAgICAgKiBEdW5sb3A6IGhpc3RvcnlcbiAgICAgKiAxMC0wNS0yMDE2OiBWbGFkaW1pciBUdXJvc2luc2tpeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCh0YLRgNCw0L3QuNGG0LAg0LrQsNGC0LDQu9C+0LPQsFxuICAgICAqL1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCgnLmItY2F0YWxvZy1maWx0ZXInKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBtZW51U2Nyb2xsVG9wID0gJCgnLmItY2F0YWxvZy1maWx0ZXInKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgJGVsZW1lbnQgPSAkKCcuYi1jYXRhbG9nLWZpbHRlcicpO1xuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiBtZW51U2Nyb2xsVG9wKVxuICAgICAgICAgICAgICAgICAgICAkZWxlbWVudC5hZGRDbGFzcyhcInBvc2l0aW9uLWZpeGVkXCIpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJwb3NpdGlvbi1maXhlZFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEdW5sb3A6IGhpc3RvcnlcbiAgICAgKiAxOC0wNS0yMDE2OiBWbGFkaW1pciBUdXJvc2luc2tpeVxuICAgICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAqINCf0YDQtdC00LfQsNCz0YDRg9C30YfQuNC6INC90LAg0LPQu9Cw0LLQvdC+0LlcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIER1bmxvcDogaGlzdG9yeVxuICAgICAqIDE4LTA1LTIwMTY6IFZsYWRpbWlyIFR1cm9zaW5za2l5XG4gICAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICog0J/RgNC10LTQt9Cw0LPRgNGD0LfRh9C40Log0L3QsCDQs9C70LDQstC90L7QuVxuICAgICAqL1xuXG4gICAgdmFyIGltYWdlcyA9IFtdO1xuICAgIGlmICgkKFwiI3BpY3MtY3V0dGVyXCIpLmxlbmd0aCkge1xuICAgICAgICBpbWFnZXMgPSBbXCIvbGFuZy9ydS9pbWFnZXMvY29udGVudC9oaXN0b3J5L2JnLWhpc3Rvcnktc2xpZGUuanBnXCIsIFwiL2xhbmcvcnUvaW1hZ2VzL2NvbnRlbnQvaGlzdG9yeS9waWMtaGlzdG9yeS13aGVlbHMucG5nXCJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgICQoXCIuanMtcHJlbG9hZGVyLWltYWdlXCIpLmVhY2goZnVuY3Rpb24gKGtleSwgZWxlbWVudCkge1xuICAgICAgICAgICAgaW1hZ2VzW2tleV0gPSAkKGVsZW1lbnQpLmF0dHIoXCJzcmNcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgcHJlbG9hZGVyX2NvdW50ID0gJChcIi5qcy1wcmVsb2FkZXItY291bnRcIik7XG4gICAgICAgIHZhciBwcmVsb2FkZXJfbGluZSA9ICQoXCIuanMtcHJlbG9hZGVyLWxpbmVcIik7XG4gICAgICAgICQuaW1ncHJlbG9hZGVyKHtcbiAgICAgICAgICAgIHBhdGhzOiBpbWFnZXNcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoJGFsbEltYWdlcykge1xuICAgICAgICAgICAgaWYgKCQoXCIjcGljcy1jdXR0ZXJcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJChcIiNwaWNzLWN1dHRlclwiKS5zaG93KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoXCIuYi1tYWluLXNsaWRlcl9faXRlbVwiKS5jc3MoXCJ3aWR0aFwiLCBcIjEwMHZ3XCIpO1xuICAgICAgICAgICAgICAgICQoXCIuanMtbWFpbi1zbGlkZXItbmF2aWdhdGlvbjpmaXJzdFwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS5hbmltYXRlKHttYXJnaW46IFwiMCAwIDAgLTUwcHhcIn0sIDE1MDApO1xuICAgICAgICAgICAgICAgICQoXCIuanMtbWFpbi1zbGlkZXJcIikudG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKFwiLmItbG9hZGluZ1wiKS5oaWRlKCk7XG4gICAgICAgIH0pLnByb2dyZXNzKGZ1bmN0aW9uICgkaW1hZ2UsICRhbGxJbWFnZXMsICRwcm9wZXJJbWFnZXMsICRicm9rZW5JbWFnZXMsIGlzQnJva2VuLCBwZXJjZW50YWdlKSB7XG4gICAgICAgICAgICBwcmVsb2FkZXJfbGluZS5jc3MoXCJ3aWR0aFwiLCBwZXJjZW50YWdlICsgXCIlXCIpO1xuICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpID4gcGFyc2VJbnQocHJlbG9hZGVyX2NvdW50LmNzcyhcIndpZHRoXCIpKSArIChwZXJjZW50YWdlICogcGFyc2VJbnQoJCh3aW5kb3cpLndpZHRoKCkpKSAvIDEwMCkge1xuICAgICAgICAgICAgICAgIHByZWxvYWRlcl9jb3VudC50ZXh0KHBlcmNlbnRhZ2UgKyBcIiVcIikuY3NzKFwibGVmdFwiLCBwZXJjZW50YWdlICsgXCIlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVsb2FkZXJfY291bnQudGV4dChwZXJjZW50YWdlICsgXCIlXCIpLmNzcyhcImxlZnRcIiwgXCJhdXRvXCIpLmNzcyhcInJpZ2h0XCIsIFwiMCVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKlxuICAgICAgU2xpZGVzSlMgMy4wLjQgaHR0cDovL3NsaWRlc2pzLmNvbVxuICAgICAgKGMpIDIwMTMgYnkgTmF0aGFuIFNlYXJsZXMgaHR0cDovL25hdGhhbnNlYXJsZXMuY29tXG4gICAgICBVcGRhdGVkOiBKdW5lIDI2dGgsIDIwMTNcbiAgICAgIEFwYWNoZSBMaWNlbnNlOiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAgICAqL1xuICAgIChmdW5jdGlvbigpeyhmdW5jdGlvbihlLHQsbil7dmFyIHIsaSxzO3M9XCJzbGlkZXNqc1wiO2k9e3dpZHRoOjk0MCxoZWlnaHQ6NTI4LHN0YXJ0OjEsbmF2aWdhdGlvbjp7YWN0aXZlOiEwLGVmZmVjdDpcInNsaWRlXCJ9LHBhZ2luYXRpb246e2FjdGl2ZTohMCxlZmZlY3Q6XCJzbGlkZVwifSxwbGF5OnthY3RpdmU6ITEsZWZmZWN0OlwiZWFzZU91dEN1YmljXCIsaW50ZXJ2YWw6NWUzLGF1dG86ITEsc3dhcDohMCxwYXVzZU9uSG92ZXI6ITEscmVzdGFydERlbGF5OjI1MDB9LGVmZmVjdDp7c2xpZGU6e3NwZWVkOjE1MDB9LGZhZGU6e3NwZWVkOjMwMCxjcm9zc2ZhZGU6ITB9fSxjYWxsYmFjazp7bG9hZGVkOmZ1bmN0aW9uKCl7fSxzdGFydDpmdW5jdGlvbigpe30sY29tcGxldGU6ZnVuY3Rpb24oKXt9fX07cj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXt0aGlzLmVsZW1lbnQ9dDt0aGlzLm9wdGlvbnM9ZS5leHRlbmQoITAse30saSxuKTt0aGlzLl9kZWZhdWx0cz1pO3RoaXMuX25hbWU9czt0aGlzLmluaXQoKX1yZXR1cm4gdH0oKTtyLnByb3RvdHlwZS5pbml0PWZ1bmN0aW9uKCl7dmFyIG4scixpLHMsbyx1LGE9dGhpcztuPWUodGhpcy5lbGVtZW50KTt0aGlzLmRhdGE9ZS5kYXRhKHRoaXMpO2UuZGF0YSh0aGlzLFwiYW5pbWF0aW5nXCIsITEpO2UuZGF0YSh0aGlzLFwidG90YWxcIixuLmNoaWxkcmVuKCkubm90KFwiLnNsaWRlc2pzLW5hdmlnYXRpb25cIixuKS5sZW5ndGgpO2UuZGF0YSh0aGlzLFwiY3VycmVudFwiLHRoaXMub3B0aW9ucy5zdGFydC0xKTtlLmRhdGEodGhpcyxcInZlbmRvclByZWZpeFwiLHRoaXMuX2dldFZlbmRvclByZWZpeCgpKTtpZih0eXBlb2YgVG91Y2hFdmVudCE9XCJ1bmRlZmluZWRcIil7ZS5kYXRhKHRoaXMsXCJ0b3VjaFwiLCEwKTt0aGlzLm9wdGlvbnMuZWZmZWN0LnNsaWRlLnNwZWVkPXRoaXMub3B0aW9ucy5lZmZlY3Quc2xpZGUuc3BlZWQvMn1uLmNzcyh7b3ZlcmZsb3c6XCJoaWRkZW5cIn0pO24uc2xpZGVzQ29udGFpbmVyPW4uY2hpbGRyZW4oKS5ub3QoXCIuc2xpZGVzanMtbmF2aWdhdGlvblwiLG4pLndyYXBBbGwoXCI8ZGl2IGNsYXNzPSdzbGlkZXNqcy1jb250YWluZXInPlwiLG4pLnBhcmVudCgpLmNzcyh7b3ZlcmZsb3c6XCJoaWRkZW5cIixwb3NpdGlvbjpcInJlbGF0aXZlXCJ9KTtlKFwiLnNsaWRlc2pzLWNvbnRhaW5lclwiLG4pLndyYXBJbm5lcihcIjxkaXYgY2xhc3M9J3NsaWRlc2pzLWNvbnRyb2wnPlwiLG4pLmNoaWxkcmVuKCk7ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsbikuY3NzKHtwb3NpdGlvbjpcInJlbGF0aXZlXCIsbGVmdDowfSk7ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsbikuY2hpbGRyZW4oKS5hZGRDbGFzcyhcInNsaWRlc2pzLXNsaWRlXCIpLmNzcyh7cG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDowLGxlZnQ6MCx3aWR0aDpcIjEwMCVcIix6SW5kZXg6MCxkaXNwbGF5Olwibm9uZVwiLHdlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eTpcImhpZGRlblwifSk7ZS5lYWNoKGUoXCIuc2xpZGVzanMtY29udHJvbFwiLG4pLmNoaWxkcmVuKCksZnVuY3Rpb24odCl7dmFyIG47bj1lKHRoaXMpO3JldHVybiBuLmF0dHIoXCJzbGlkZXNqcy1pbmRleFwiLHQpfSk7aWYodGhpcy5kYXRhLnRvdWNoKXtlKFwiLnNsaWRlc2pzLWNvbnRyb2xcIixuKS5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbihlKXtyZXR1cm4gYS5fdG91Y2hzdGFydChlKX0pO2UoXCIuc2xpZGVzanMtY29udHJvbFwiLG4pLm9uKFwidG91Y2htb3ZlXCIsZnVuY3Rpb24oZSl7cmV0dXJuIGEuX3RvdWNobW92ZShlKX0pO2UoXCIuc2xpZGVzanMtY29udHJvbFwiLG4pLm9uKFwidG91Y2hlbmRcIixmdW5jdGlvbihlKXtyZXR1cm4gYS5fdG91Y2hlbmQoZSl9KX1uLmZhZGVJbigwKTt0aGlzLnVwZGF0ZSgpO3RoaXMuZGF0YS50b3VjaCYmdGhpcy5fc2V0dXB0b3VjaCgpO2UoXCIuc2xpZGVzanMtY29udHJvbFwiLG4pLmNoaWxkcmVuKFwiOmVxKFwiK3RoaXMuZGF0YS5jdXJyZW50K1wiKVwiKS5lcSgwKS5mYWRlSW4oMCxmdW5jdGlvbigpe3JldHVybiBlKHRoaXMpLmNzcyh7ekluZGV4OjEwfSl9KTtpZih0aGlzLm9wdGlvbnMubmF2aWdhdGlvbi5hY3RpdmUpe289ZShcIjxhPlwiLHtcImNsYXNzXCI6XCJzbGlkZXNqcy1wcmV2aW91cyBzbGlkZXNqcy1uYXZpZ2F0aW9uXCIsaHJlZjpcIiNcIix0aXRsZTpcIlByZXZpb3VzXCIsdGV4dDpcIlByZXZpb3VzXCJ9KS5hcHBlbmRUbyhuKTtyPWUoXCI8YT5cIix7XCJjbGFzc1wiOlwic2xpZGVzanMtbmV4dCBzbGlkZXNqcy1uYXZpZ2F0aW9uXCIsaHJlZjpcIiNcIix0aXRsZTpcIk5leHRcIix0ZXh0OlwiTmV4dFwifSkuYXBwZW5kVG8obil9ZShcIi5zbGlkZXNqcy1uZXh0XCIsbikuY2xpY2soZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO2Euc3RvcCghMCk7cmV0dXJuIGEubmV4dChhLm9wdGlvbnMubmF2aWdhdGlvbi5lZmZlY3QpfSk7ZShcIi5zbGlkZXNqcy1wcmV2aW91c1wiLG4pLmNsaWNrKGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTthLnN0b3AoITApO3JldHVybiBhLnByZXZpb3VzKGEub3B0aW9ucy5uYXZpZ2F0aW9uLmVmZmVjdCl9KTtpZih0aGlzLm9wdGlvbnMucGxheS5hY3RpdmUpe3M9ZShcIjxhPlwiLHtcImNsYXNzXCI6XCJzbGlkZXNqcy1wbGF5IHNsaWRlc2pzLW5hdmlnYXRpb25cIixocmVmOlwiI1wiLHRpdGxlOlwiUGxheVwiLHRleHQ6XCJQbGF5XCJ9KS5hcHBlbmRUbyhuKTt1PWUoXCI8YT5cIix7XCJjbGFzc1wiOlwic2xpZGVzanMtc3RvcCBzbGlkZXNqcy1uYXZpZ2F0aW9uXCIsaHJlZjpcIiNcIix0aXRsZTpcIlN0b3BcIix0ZXh0OlwiU3RvcFwifSkuYXBwZW5kVG8obik7cy5jbGljayhmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7cmV0dXJuIGEucGxheSghMCl9KTt1LmNsaWNrKGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtyZXR1cm4gYS5zdG9wKCEwKX0pO3RoaXMub3B0aW9ucy5wbGF5LnN3YXAmJnUuY3NzKHtkaXNwbGF5Olwibm9uZVwifSl9aWYodGhpcy5vcHRpb25zLnBhZ2luYXRpb24uYWN0aXZlKXtpPWUoXCI8dWw+XCIse1wiY2xhc3NcIjpcInNsaWRlc2pzLXBhZ2luYXRpb25cIn0pLmFwcGVuZFRvKG4pO2UuZWFjaChuZXcgQXJyYXkodGhpcy5kYXRhLnRvdGFsKSxmdW5jdGlvbih0KXt2YXIgbixyO249ZShcIjxsaT5cIix7XCJjbGFzc1wiOlwic2xpZGVzanMtcGFnaW5hdGlvbi1pdGVtXCJ9KS5hcHBlbmRUbyhpKTtyPWUoXCI8YT5cIix7aHJlZjpcIiNcIixcImRhdGEtc2xpZGVzanMtaXRlbVwiOnQsaHRtbDpcIlwifSkuYXBwZW5kVG8obik7cmV0dXJuIHIuY2xpY2soZnVuY3Rpb24odCl7dC5wcmV2ZW50RGVmYXVsdCgpO2Euc3RvcCghMCk7cmV0dXJuIGEuZ290byhlKHQuY3VycmVudFRhcmdldCkuYXR0cihcImRhdGEtc2xpZGVzanMtaXRlbVwiKSoxKzEpfSl9KX1lKHQpLmJpbmQoXCJyZXNpemVcIixmdW5jdGlvbigpe3JldHVybiBhLnVwZGF0ZSgpfSk7dGhpcy5fc2V0QWN0aXZlKCk7dGhpcy5vcHRpb25zLnBsYXkuYXV0byYmdGhpcy5wbGF5KCk7cmV0dXJuIHRoaXMub3B0aW9ucy5jYWxsYmFjay5sb2FkZWQodGhpcy5vcHRpb25zLnN0YXJ0KX07ci5wcm90b3R5cGUuX3NldEFjdGl2ZT1mdW5jdGlvbih0KXt2YXIgbixyO249ZSh0aGlzLmVsZW1lbnQpO3RoaXMuZGF0YT1lLmRhdGEodGhpcyk7cj10Pi0xP3Q6dGhpcy5kYXRhLmN1cnJlbnQ7ZShcIi5hY3RpdmVcIixuKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtyZXR1cm4gZShcIi5zbGlkZXNqcy1wYWdpbmF0aW9uIGxpOmVxKFwiK3IrXCIpIGFcIixuKS5hZGRDbGFzcyhcImFjdGl2ZVwiKX07ci5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKCl7dmFyIHQsbixyO3Q9ZSh0aGlzLmVsZW1lbnQpO3RoaXMuZGF0YT1lLmRhdGEodGhpcyk7ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsdCkuY2hpbGRyZW4oXCI6bm90KDplcShcIit0aGlzLmRhdGEuY3VycmVudCtcIikpXCIpLmNzcyh7ZGlzcGxheTpcIm5vbmVcIixsZWZ0OjAsekluZGV4OjB9KTtyPXQud2lkdGgoKTtuPXRoaXMub3B0aW9ucy5oZWlnaHQ7dGhpcy5vcHRpb25zLndpZHRoPXI7dGhpcy5vcHRpb25zLmhlaWdodD1uO3JldHVybiBlKFwiLnNsaWRlc2pzLWNvbnRyb2wsIC5zbGlkZXNqcy1jb250YWluZXJcIix0KS5jc3Moe3dpZHRoOnIsaGVpZ2h0Om59KX07ci5wcm90b3R5cGUubmV4dD1mdW5jdGlvbih0KXt2YXIgbjtuPWUodGhpcy5lbGVtZW50KTt0aGlzLmRhdGE9ZS5kYXRhKHRoaXMpO2UuZGF0YSh0aGlzLFwiZGlyZWN0aW9uXCIsXCJuZXh0XCIpO3Q9PT12b2lkIDAmJih0PXRoaXMub3B0aW9ucy5uYXZpZ2F0aW9uLmVmZmVjdCk7cmV0dXJuIHQ9PT1cImZhZGVcIj90aGlzLl9mYWRlKCk6dGhpcy5fc2xpZGUoKX07ci5wcm90b3R5cGUucHJldmlvdXM9ZnVuY3Rpb24odCl7dmFyIG47bj1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTtlLmRhdGEodGhpcyxcImRpcmVjdGlvblwiLFwicHJldmlvdXNcIik7dD09PXZvaWQgMCYmKHQ9dGhpcy5vcHRpb25zLm5hdmlnYXRpb24uZWZmZWN0KTtyZXR1cm4gdD09PVwiZmFkZVwiP3RoaXMuX2ZhZGUoKTp0aGlzLl9zbGlkZSgpfTtyLnByb3RvdHlwZS5nb3RvPWZ1bmN0aW9uKHQpe3ZhciBuLHI7bj1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTtyPT09dm9pZCAwJiYocj10aGlzLm9wdGlvbnMucGFnaW5hdGlvbi5lZmZlY3QpO3Q+dGhpcy5kYXRhLnRvdGFsP3Q9dGhpcy5kYXRhLnRvdGFsOnQ8MSYmKHQ9MSk7aWYodHlwZW9mIHQ9PVwibnVtYmVyXCIpcmV0dXJuIHI9PT1cImZhZGVcIj90aGlzLl9mYWRlKHQpOnRoaXMuX3NsaWRlKHQpO2lmKHR5cGVvZiB0PT1cInN0cmluZ1wiKXtpZih0PT09XCJmaXJzdFwiKXJldHVybiByPT09XCJmYWRlXCI/dGhpcy5fZmFkZSgwKTp0aGlzLl9zbGlkZSgwKTtpZih0PT09XCJsYXN0XCIpcmV0dXJuIHI9PT1cImZhZGVcIj90aGlzLl9mYWRlKHRoaXMuZGF0YS50b3RhbCk6dGhpcy5fc2xpZGUodGhpcy5kYXRhLnRvdGFsKX19O3IucHJvdG90eXBlLl9zZXR1cHRvdWNoPWZ1bmN0aW9uKCl7dmFyIHQsbixyLGk7dD1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTtpPWUoXCIuc2xpZGVzanMtY29udHJvbFwiLHQpO249dGhpcy5kYXRhLmN1cnJlbnQrMTtyPXRoaXMuZGF0YS5jdXJyZW50LTE7cjwwJiYocj10aGlzLmRhdGEudG90YWwtMSk7bj50aGlzLmRhdGEudG90YWwtMSYmKG49MCk7aS5jaGlsZHJlbihcIjplcShcIituK1wiKVwiKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLGxlZnQ6dGhpcy5vcHRpb25zLndpZHRofSk7cmV0dXJuIGkuY2hpbGRyZW4oXCI6ZXEoXCIrcitcIilcIikuY3NzKHtkaXNwbGF5OlwiYmxvY2tcIixsZWZ0Oi10aGlzLm9wdGlvbnMud2lkdGh9KX07ci5wcm90b3R5cGUuX3RvdWNoc3RhcnQ9ZnVuY3Rpb24odCl7dmFyIG4scjtuPWUodGhpcy5lbGVtZW50KTt0aGlzLmRhdGE9ZS5kYXRhKHRoaXMpO3I9dC5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07dGhpcy5fc2V0dXB0b3VjaCgpO2UuZGF0YSh0aGlzLFwidG91Y2h0aW1lclwiLE51bWJlcihuZXcgRGF0ZSkpO2UuZGF0YSh0aGlzLFwidG91Y2hzdGFydHhcIixyLnBhZ2VYKTtlLmRhdGEodGhpcyxcInRvdWNoc3RhcnR5XCIsci5wYWdlWSk7cmV0dXJuIHQuc3RvcFByb3BhZ2F0aW9uKCl9O3IucHJvdG90eXBlLl90b3VjaGVuZD1mdW5jdGlvbih0KXt2YXIgbixyLGkscyxvLHUsYSxmPXRoaXM7bj1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTt1PXQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO3M9ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsbik7aWYocy5wb3NpdGlvbigpLmxlZnQ+dGhpcy5vcHRpb25zLndpZHRoKi41fHxzLnBvc2l0aW9uKCkubGVmdD50aGlzLm9wdGlvbnMud2lkdGgqLjEmJk51bWJlcihuZXcgRGF0ZSktdGhpcy5kYXRhLnRvdWNodGltZXI8MjUwKXtlLmRhdGEodGhpcyxcImRpcmVjdGlvblwiLFwicHJldmlvdXNcIik7dGhpcy5fc2xpZGUoKX1lbHNlIGlmKHMucG9zaXRpb24oKS5sZWZ0PC0odGhpcy5vcHRpb25zLndpZHRoKi41KXx8cy5wb3NpdGlvbigpLmxlZnQ8LSh0aGlzLm9wdGlvbnMud2lkdGgqLjEpJiZOdW1iZXIobmV3IERhdGUpLXRoaXMuZGF0YS50b3VjaHRpbWVyPDI1MCl7ZS5kYXRhKHRoaXMsXCJkaXJlY3Rpb25cIixcIm5leHRcIik7dGhpcy5fc2xpZGUoKX1lbHNle2k9dGhpcy5kYXRhLnZlbmRvclByZWZpeDthPWkrXCJUcmFuc2Zvcm1cIjtyPWkrXCJUcmFuc2l0aW9uRHVyYXRpb25cIjtvPWkrXCJUcmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjtzWzBdLnN0eWxlW2FdPVwidHJhbnNsYXRlWCgwcHgpXCI7c1swXS5zdHlsZVtyXT10aGlzLm9wdGlvbnMuZWZmZWN0LnNsaWRlLnNwZWVkKi44NStcIm1zXCJ9cy5vbihcInRyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBNU1RyYW5zaXRpb25FbmRcIixmdW5jdGlvbigpe2k9Zi5kYXRhLnZlbmRvclByZWZpeDthPWkrXCJUcmFuc2Zvcm1cIjtyPWkrXCJUcmFuc2l0aW9uRHVyYXRpb25cIjtvPWkrXCJUcmFuc2l0aW9uVGltaW5nRnVuY3Rpb25cIjtzWzBdLnN0eWxlW2FdPVwiXCI7c1swXS5zdHlsZVtyXT1cIlwiO3JldHVybiBzWzBdLnN0eWxlW29dPVwiXCJ9KTtyZXR1cm4gdC5zdG9wUHJvcGFnYXRpb24oKX07ci5wcm90b3R5cGUuX3RvdWNobW92ZT1mdW5jdGlvbih0KXt2YXIgbixyLGkscyxvO249ZSh0aGlzLmVsZW1lbnQpO3RoaXMuZGF0YT1lLmRhdGEodGhpcyk7cz10Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtyPXRoaXMuZGF0YS52ZW5kb3JQcmVmaXg7aT1lKFwiLnNsaWRlc2pzLWNvbnRyb2xcIixuKTtvPXIrXCJUcmFuc2Zvcm1cIjtlLmRhdGEodGhpcyxcInNjcm9sbGluZ1wiLE1hdGguYWJzKHMucGFnZVgtdGhpcy5kYXRhLnRvdWNoc3RhcnR4KTxNYXRoLmFicyhzLnBhZ2VZLXRoaXMuZGF0YS50b3VjaHN0YXJ0eSkpO2lmKCF0aGlzLmRhdGEuYW5pbWF0aW5nJiYhdGhpcy5kYXRhLnNjcm9sbGluZyl7dC5wcmV2ZW50RGVmYXVsdCgpO3RoaXMuX3NldHVwdG91Y2goKTtpWzBdLnN0eWxlW29dPVwidHJhbnNsYXRlWChcIisocy5wYWdlWC10aGlzLmRhdGEudG91Y2hzdGFydHgpK1wicHgpXCJ9cmV0dXJuIHQuc3RvcFByb3BhZ2F0aW9uKCl9O3IucHJvdG90eXBlLnBsYXk9ZnVuY3Rpb24odCl7dmFyIG4scixpLHM9dGhpcztuPWUodGhpcy5lbGVtZW50KTt0aGlzLmRhdGE9ZS5kYXRhKHRoaXMpO2lmKCF0aGlzLmRhdGEucGxheUludGVydmFsKXtpZih0KXtyPXRoaXMuZGF0YS5jdXJyZW50O3RoaXMuZGF0YS5kaXJlY3Rpb249XCJuZXh0XCI7dGhpcy5vcHRpb25zLnBsYXkuZWZmZWN0PT09XCJmYWRlXCI/dGhpcy5fZmFkZSgpOnRoaXMuX3NsaWRlKCl9ZS5kYXRhKHRoaXMsXCJwbGF5SW50ZXJ2YWxcIixzZXRJbnRlcnZhbChmdW5jdGlvbigpe3I9cy5kYXRhLmN1cnJlbnQ7cy5kYXRhLmRpcmVjdGlvbj1cIm5leHRcIjtyZXR1cm4gcy5vcHRpb25zLnBsYXkuZWZmZWN0PT09XCJmYWRlXCI/cy5fZmFkZSgpOnMuX3NsaWRlKCl9LHRoaXMub3B0aW9ucy5wbGF5LmludGVydmFsKSk7aT1lKFwiLnNsaWRlc2pzLWNvbnRhaW5lclwiLG4pO2lmKHRoaXMub3B0aW9ucy5wbGF5LnBhdXNlT25Ib3Zlcil7aS51bmJpbmQoKTtpLmJpbmQoXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oKXtyZXR1cm4gcy5zdG9wKCl9KTtpLmJpbmQoXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtyZXR1cm4gcy5vcHRpb25zLnBsYXkucmVzdGFydERlbGF5P2UuZGF0YShzLFwicmVzdGFydERlbGF5XCIsc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBzLnBsYXkoITApfSxzLm9wdGlvbnMucGxheS5yZXN0YXJ0RGVsYXkpKTpzLnBsYXkoKX0pfWUuZGF0YSh0aGlzLFwicGxheWluZ1wiLCEwKTtlKFwiLnNsaWRlc2pzLXBsYXlcIixuKS5hZGRDbGFzcyhcInNsaWRlc2pzLXBsYXlpbmdcIik7aWYodGhpcy5vcHRpb25zLnBsYXkuc3dhcCl7ZShcIi5zbGlkZXNqcy1wbGF5XCIsbikuaGlkZSgpO3JldHVybiBlKFwiLnNsaWRlc2pzLXN0b3BcIixuKS5zaG93KCl9fX07ci5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbih0KXt2YXIgbjtuPWUodGhpcy5lbGVtZW50KTt0aGlzLmRhdGE9ZS5kYXRhKHRoaXMpO2NsZWFySW50ZXJ2YWwodGhpcy5kYXRhLnBsYXlJbnRlcnZhbCk7dGhpcy5vcHRpb25zLnBsYXkucGF1c2VPbkhvdmVyJiZ0JiZlKFwiLnNsaWRlc2pzLWNvbnRhaW5lclwiLG4pLnVuYmluZCgpO2UuZGF0YSh0aGlzLFwicGxheUludGVydmFsXCIsbnVsbCk7ZS5kYXRhKHRoaXMsXCJwbGF5aW5nXCIsITEpO2UoXCIuc2xpZGVzanMtcGxheVwiLG4pLnJlbW92ZUNsYXNzKFwic2xpZGVzanMtcGxheWluZ1wiKTtpZih0aGlzLm9wdGlvbnMucGxheS5zd2FwKXtlKFwiLnNsaWRlc2pzLXN0b3BcIixuKS5oaWRlKCk7cmV0dXJuIGUoXCIuc2xpZGVzanMtcGxheVwiLG4pLnNob3coKX19O3IucHJvdG90eXBlLl9zbGlkZT1mdW5jdGlvbih0KXt2YXIgbixyLGkscyxvLHUsYSxmLGwsYyxoPXRoaXM7bj1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTtpZighdGhpcy5kYXRhLmFuaW1hdGluZyYmdCE9PXRoaXMuZGF0YS5jdXJyZW50KzEpe2UuZGF0YSh0aGlzLFwiYW5pbWF0aW5nXCIsITApO3I9dGhpcy5kYXRhLmN1cnJlbnQ7aWYodD4tMSl7dC09MTtjPXQ+cj8xOi0xO2k9dD5yPy10aGlzLm9wdGlvbnMud2lkdGg6dGhpcy5vcHRpb25zLndpZHRoO289dH1lbHNle2M9dGhpcy5kYXRhLmRpcmVjdGlvbj09PVwibmV4dFwiPzE6LTE7aT10aGlzLmRhdGEuZGlyZWN0aW9uPT09XCJuZXh0XCI/LXRoaXMub3B0aW9ucy53aWR0aDp0aGlzLm9wdGlvbnMud2lkdGg7bz1yK2N9bz09PS0xJiYobz10aGlzLmRhdGEudG90YWwtMSk7bz09PXRoaXMuZGF0YS50b3RhbCYmKG89MCk7dGhpcy5fc2V0QWN0aXZlKG8pO2E9ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsbik7dD4tMSYmYS5jaGlsZHJlbihcIjpub3QoOmVxKFwiK3IrXCIpKVwiKS5jc3Moe2Rpc3BsYXk6XCJub25lXCIsbGVmdDowLHpJbmRleDowfSk7YS5jaGlsZHJlbihcIjplcShcIitvK1wiKVwiKS5jc3Moe2Rpc3BsYXk6XCJibG9ja1wiLGxlZnQ6Yyp0aGlzLm9wdGlvbnMud2lkdGgsekluZGV4OjEwfSk7dGhpcy5vcHRpb25zLmNhbGxiYWNrLnN0YXJ0KHIrMSk7aWYodGhpcy5kYXRhLnZlbmRvclByZWZpeCl7dT10aGlzLmRhdGEudmVuZG9yUHJlZml4O2w9dStcIlRyYW5zZm9ybVwiO3M9dStcIlRyYW5zaXRpb25EdXJhdGlvblwiO2Y9dStcIlRyYW5zaXRpb25UaW1pbmdGdW5jdGlvblwiO2FbMF0uc3R5bGVbbF09XCJ0cmFuc2xhdGVYKFwiK2krXCJweClcIjthWzBdLnN0eWxlW3NdPXRoaXMub3B0aW9ucy5lZmZlY3Quc2xpZGUuc3BlZWQrXCJtc1wiO3JldHVybiBhLm9uKFwidHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIE1TVHJhbnNpdGlvbkVuZFwiLGZ1bmN0aW9uKCl7YVswXS5zdHlsZVtsXT1cIlwiO2FbMF0uc3R5bGVbc109XCJcIjthLmNoaWxkcmVuKFwiOmVxKFwiK28rXCIpXCIpLmNzcyh7bGVmdDowfSk7YS5jaGlsZHJlbihcIjplcShcIityK1wiKVwiKS5jc3Moe2Rpc3BsYXk6XCJub25lXCIsbGVmdDowLHpJbmRleDowfSk7ZS5kYXRhKGgsXCJjdXJyZW50XCIsbyk7ZS5kYXRhKGgsXCJhbmltYXRpbmdcIiwhMSk7YS51bmJpbmQoXCJ0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgTVNUcmFuc2l0aW9uRW5kXCIpO2EuY2hpbGRyZW4oXCI6bm90KDplcShcIitvK1wiKSlcIikuY3NzKHtkaXNwbGF5Olwibm9uZVwiLGxlZnQ6MCx6SW5kZXg6MH0pO2guZGF0YS50b3VjaCYmaC5fc2V0dXB0b3VjaCgpO3JldHVybiBoLm9wdGlvbnMuY2FsbGJhY2suY29tcGxldGUobysxKX0pfXJldHVybiBhLnN0b3AoKS5hbmltYXRlKHtsZWZ0Oml9LHRoaXMub3B0aW9ucy5lZmZlY3Quc2xpZGUuc3BlZWQsZnVuY3Rpb24oKXthLmNzcyh7bGVmdDowfSk7YS5jaGlsZHJlbihcIjplcShcIitvK1wiKVwiKS5jc3Moe2xlZnQ6MH0pO3JldHVybiBhLmNoaWxkcmVuKFwiOmVxKFwiK3IrXCIpXCIpLmNzcyh7ZGlzcGxheTpcIm5vbmVcIixsZWZ0OjAsekluZGV4OjB9LGUuZGF0YShoLFwiY3VycmVudFwiLG8pLGUuZGF0YShoLFwiYW5pbWF0aW5nXCIsITEpLGgub3B0aW9ucy5jYWxsYmFjay5jb21wbGV0ZShvKzEpKX0pfX07ci5wcm90b3R5cGUuX2ZhZGU9ZnVuY3Rpb24odCl7dmFyIG4scixpLHMsbyx1PXRoaXM7bj1lKHRoaXMuZWxlbWVudCk7dGhpcy5kYXRhPWUuZGF0YSh0aGlzKTtpZighdGhpcy5kYXRhLmFuaW1hdGluZyYmdCE9PXRoaXMuZGF0YS5jdXJyZW50KzEpe2UuZGF0YSh0aGlzLFwiYW5pbWF0aW5nXCIsITApO3I9dGhpcy5kYXRhLmN1cnJlbnQ7aWYodCl7dC09MTtvPXQ+cj8xOi0xO2k9dH1lbHNle289dGhpcy5kYXRhLmRpcmVjdGlvbj09PVwibmV4dFwiPzE6LTE7aT1yK299aT09PS0xJiYoaT10aGlzLmRhdGEudG90YWwtMSk7aT09PXRoaXMuZGF0YS50b3RhbCYmKGk9MCk7dGhpcy5fc2V0QWN0aXZlKGkpO3M9ZShcIi5zbGlkZXNqcy1jb250cm9sXCIsbik7cy5jaGlsZHJlbihcIjplcShcIitpK1wiKVwiKS5jc3Moe2Rpc3BsYXk6XCJub25lXCIsbGVmdDowLHpJbmRleDoxMH0pO3RoaXMub3B0aW9ucy5jYWxsYmFjay5zdGFydChyKzEpO2lmKHRoaXMub3B0aW9ucy5lZmZlY3QuZmFkZS5jcm9zc2ZhZGUpe3MuY2hpbGRyZW4oXCI6ZXEoXCIrdGhpcy5kYXRhLmN1cnJlbnQrXCIpXCIpLnN0b3AoKS5mYWRlT3V0KHRoaXMub3B0aW9ucy5lZmZlY3QuZmFkZS5zcGVlZCk7cmV0dXJuIHMuY2hpbGRyZW4oXCI6ZXEoXCIraStcIilcIikuc3RvcCgpLmZhZGVJbih0aGlzLm9wdGlvbnMuZWZmZWN0LmZhZGUuc3BlZWQsZnVuY3Rpb24oKXtzLmNoaWxkcmVuKFwiOmVxKFwiK2krXCIpXCIpLmNzcyh7ekluZGV4OjB9KTtlLmRhdGEodSxcImFuaW1hdGluZ1wiLCExKTtlLmRhdGEodSxcImN1cnJlbnRcIixpKTtyZXR1cm4gdS5vcHRpb25zLmNhbGxiYWNrLmNvbXBsZXRlKGkrMSl9KX1yZXR1cm4gcy5jaGlsZHJlbihcIjplcShcIityK1wiKVwiKS5zdG9wKCkuZmFkZU91dCh0aGlzLm9wdGlvbnMuZWZmZWN0LmZhZGUuc3BlZWQsZnVuY3Rpb24oKXtzLmNoaWxkcmVuKFwiOmVxKFwiK2krXCIpXCIpLnN0b3AoKS5mYWRlSW4odS5vcHRpb25zLmVmZmVjdC5mYWRlLnNwZWVkLGZ1bmN0aW9uKCl7cmV0dXJuIHMuY2hpbGRyZW4oXCI6ZXEoXCIraStcIilcIikuY3NzKHt6SW5kZXg6MTB9KX0pO2UuZGF0YSh1LFwiYW5pbWF0aW5nXCIsITEpO2UuZGF0YSh1LFwiY3VycmVudFwiLGkpO3JldHVybiB1Lm9wdGlvbnMuY2FsbGJhY2suY29tcGxldGUoaSsxKX0pfX07ci5wcm90b3R5cGUuX2dldFZlbmRvclByZWZpeD1mdW5jdGlvbigpe3ZhciBlLHQscixpLHM7ZT1uLmJvZHl8fG4uZG9jdW1lbnRFbGVtZW50O3I9ZS5zdHlsZTtpPVwidHJhbnNpdGlvblwiO3M9W1wiTW96XCIsXCJXZWJraXRcIixcIktodG1sXCIsXCJPXCIsXCJtc1wiXTtpPWkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkraS5zdWJzdHIoMSk7dD0wO3doaWxlKHQ8cy5sZW5ndGgpe2lmKHR5cGVvZiByW3NbdF0raV09PVwic3RyaW5nXCIpcmV0dXJuIHNbdF07dCsrfXJldHVybiExfTtyZXR1cm4gZS5mbltzXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7aWYoIWUuZGF0YSh0aGlzLFwicGx1Z2luX1wiK3MpKXJldHVybiBlLmRhdGEodGhpcyxcInBsdWdpbl9cIitzLG5ldyByKHRoaXMsdCkpfSl9fSkoalF1ZXJ5LHdpbmRvdyxkb2N1bWVudCl9KS5jYWxsKHRoaXMpO1xuXG5cblxuICAgIC8qKlxuICAgICAqIER1bmxvcDogdGFic1xuICAgICAqIDI1LTA1LTIwMTY6IFZsYWRpc2xhdiBEb3Z6aGVua29cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiDQotCw0LHRi1xuICAgICAqL1xuXG4gICAgJChmdW5jdGlvbigpIHtcbiAgICAgICAgJCggXCIuanMtdGFiX3VpXCIgKS50YWJzKHtcbiAgICAgICAgICAgIHNob3c6IHsgZWZmZWN0OiBcImZhZGVcIiwgZHVyYXRpb246IDgwMCB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRHVubG9wOiBvYmplY3QtZml0IGZpeFxuICAgICAqIDI1LTA1LTIwMTY6IFZsYWRpc2xhdiBEb3Z6aGVua29cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiDQpNC40LrRgSDRgdCy0L7QudGB0YLQstCwIG9iamVjdCBmaXQg0LTQu9GPINCx0YDQsNGD0LfQtdGA0L7QslxuICAgICAqL1xuXG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICAgICBvYmplY3RGaXRJbWFnZXMoKTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgICogRHVubG9wOiBiYWNrIGZpeFxuICAgICAqIDE0LTA3LTIwMTY6IE1lbC4gQmxpbW1cbiAgICAgKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgKiDQpNC40LrRgSDQstGL0YHQvtGC0Ysg0LHRjdC60LPRgNCw0YPQvdC00LBcbiAgICAgKi9cblxuICAgIGZ1bmN0aW9uIHdyYXBwZXJfX2ltZ19iYWNrX2Jsb2NrX19vdmVyZmxvdygpIHtcbiAgICAgICAgaWYgKCgkKFwiLmItd3JhcHBlci1pbm5lclwiKS5oZWlnaHQoKSArICQoXCIuYi1oZWFkZXJcIikuaGVpZ2h0KCkgKyAkKFwiLmItZm9vdGVyXCIpLmhlaWdodCgpKSA8PSAkKFwiLmItd3JhcHBlclwiKS5oZWlnaHQoKSkge1xuICAgICAgICAgICAgJChcIi5iLXdyYXBwZXJfX2ltZy1iYWNrLWJsb2NrXCIpLmNzcyhcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChcIi5iLXdyYXBwZXJfX2ltZy1iYWNrLWJsb2NrXCIpLmNzcyhcIm92ZXJmbG93XCIsIFwidmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3JhcHBlcl9faW1nX2JhY2tfYmxvY2tfX292ZXJmbG93KCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3cmFwcGVyX19pbWdfYmFja19ibG9ja19fb3ZlcmZsb3coKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBcblxuXG4gICAgaWYgKE1vZGVybml6ci5tcSgnb25seSBhbGwnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gTm8gTWVkaWEgUXVlcnkgU3VwcG9ydCBEZXRlY3RlZCAtIGRvIHNvbWV0aGluZ1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL29sZGJyb3dzZXJcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZXRlY3RJRSgpIHtcbiAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgICAgICAgdmFyIHRyaWRlbnQgPSB1YS5pbmRleE9mKCdUcmlkZW50LycpO1xuICAgICAgICBpZiAodHJpZGVudCA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDExID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgdmFyIHJ2ID0gdWEuaW5kZXhPZigncnY6Jyk7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQodWEuc3Vic3RyaW5nKHJ2ICsgMywgdWEuaW5kZXhPZignLicsIHJ2KSksIDEwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlZGdlID0gdWEuaW5kZXhPZignRWRnZS8nKTtcbiAgICAgICAgaWYgKGVkZ2UgPiAwKSB7XG4gICAgICAgICAgIC8vIEVkZ2UgKElFIDEyKykgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgIHJldHVybiBwYXJzZUludCh1YS5zdWJzdHJpbmcoZWRnZSArIDUsIHVhLmluZGV4T2YoJy4nLCBlZGdlKSksIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBJRSA9IC9tc2llLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7IFxuXG4gICAgaWYgKElFICYmICFkZXRlY3RJRSgpKSB7XG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdvbGRicm93c2VyJyk9PT0tMSlcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9vbGRicm93c2VyXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9iaWxlX2RldGVjdCgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSkgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL3dlYk9TL2kpIHx8XG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGhvbmUvaSkgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQb2QvaSkgfHxcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvKSB8fCBcbiAgICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1dpbmRvd3MgUGhvbmUvaSkgfHwgXG4gICAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9adW5lV1A3L2kpXG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIHZhciBkdW5sb3BfbW9iaWxlX3NpdGUgPSBcImh0dHA6Ly9tLmR1bmxvcC10aXJlLnJ1L1wiO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1vYmlsZV9yZWRpcmVjdCgpIHtcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aF9vbl9sb2FkID0gJCh3aW5kb3cpLndpZHRoKCk7XG5cbiAgICAgICAgaWYgKCh3aW5kb3dfd2lkdGhfb25fbG9hZCA8IDEwMDApICYmIG1vYmlsZV9kZXRlY3QoKSkge1xuICAgICAgICAgICAgdmFyIGxvY2F0aW9uX2hyZWZfYXJyID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoXCIvXCIpO1xuXG4gICAgICAgICAgICBpZiAobG9jYXRpb25faHJlZl9hcnIuaW5kZXhPZigzKSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZHVubG9wX21vYmlsZV9zaXRlICsgbG9jYXRpb25faHJlZl9hcnJbM107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb2JpbGVfcmVkaXJlY3QoKTtcblxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgICAgICBtb2JpbGVfcmVkaXJlY3QoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiXSwiZmlsZSI6ImludGVybmFsLmpzIn0=
