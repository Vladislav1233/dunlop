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
