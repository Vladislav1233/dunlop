if ($('#js-map-contacts').length) {
	ymaps.ready(init);

	function init() {

	    var myMap;

	    myMap = new ymaps.Map("js-map-contacts", {
	        center: [55.727891, 37.449641],
	        zoom: 16,
	    });

	    myMap.controls.add('typeSelector').add('mapTools').add('zoomControl').add('scaleLine');

    	var iconStyle = ymaps.templateLayoutFactory.createClass('<a href="javascript:void(0);" title="title" class="b-product-map__baloon-map b-product-map__baloon-map--contacts">' +
            // '<img src="images/inhtml/logo-min.svg" alt="" title="" class="b-product-map__logo">' +
            '</a>');
        var placemark = new ymaps.Placemark([55.727891, 37.449641],
            {
       
            },
            {
                iconImageHref: '/lang/ru/images/inhtml/logo-min.svg',
                //iconImageSize: [53, 36],
                //iconImageOffset: [-106, -174],
                iconLayout: iconStyle,
                //hideIcon: false
            });

        myMap.geoObjects.add(placemark);
	}
}