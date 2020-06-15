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