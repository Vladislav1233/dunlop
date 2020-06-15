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
