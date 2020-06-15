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