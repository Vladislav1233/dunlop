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

    @@include('partials/filter_list_scroll.js')

    /** 
     * Dunlop: catalog filter_list
     * 03-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница каталога: Фильтры - левый - сезоны.
     */

    @@include('partials/filter_list_main.js')

    /** 
     * Dunlop: how-to-auto_productivity
     * 03-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Страница "как выбрать шины": индекс нагрузки + категория скорости - инициализация карусели.
     */

    @@include('partials/how-to-auto_performance-data.js')

    /**
     * Dunlop: main main_slider
     * 02-05-2016: A. Sokolova
     * ---------------------
     * Главная страница: Слайдер.
     */

    @@include('partials/main-slider.js')

    /**
     * Dunlop: technology technology_slider
     * 07-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница технологий: Слайдер.
     */

    @@include('partials/technology-slider.js')

    /**
     * Dunlop: contacts popup feedback validation
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Страница контактов: Валидаци формы.
     */

    @@include('partials/validate.js')

    /**
     * Dunlop: popups
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Попапы
     */

    @@include('partials/popup.js')

    /**
     * Dunlop: popups
     * 10-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Карта на странице "контакты"
     */

    @@include('partials/map-contacts.js')
    
    /**
     * Dunlop: select
     * 10-05-2016: Tatiana Shemenyova
     * ---------------------
     * Селекты
     */

    @@include('partials/contacts-select.js')

    /**
     * Dunlop: map
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Карта
     */

    @@include('partials/map_plugin.js')

    /**
     * Dunlop: history
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * История
     */

    @@include('partials/wheel.js')

    /**
     * Dunlop: history
     * 10-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Страница каталога
     */

    @@include('partials/catalog.js')

    /**
     * Dunlop: history
     * 18-05-2016: Vladimir Turosinskiy
     * ---------------------
     * Предзагрузчик на главной
     */

    @@include('partials/main-preloader-images.js')
    @@include('vendor/jquery.slides.min.js')


    /**
     * Dunlop: tabs
     * 25-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Табы
     */

    @@include('partials/tab_ui.js')

    /**
     * Dunlop: object-fit fix
     * 25-05-2016: Vladislav Dovzhenko
     * ---------------------
     * Фикс свойства object fit для браузеров
     */

    @@include('partials/object-fit.js')


    /**
     * Dunlop: back fix
     * 14-07-2016: Mel. Blimm
     * ---------------------
     * Фикс высоты бэкграунда
     */

    @@include('partials/photo-back.js')

    


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