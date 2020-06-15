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