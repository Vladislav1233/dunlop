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
