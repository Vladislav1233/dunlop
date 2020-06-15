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

