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