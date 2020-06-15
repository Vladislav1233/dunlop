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
