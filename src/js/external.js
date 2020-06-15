/*
 * Third party
 */
// тут подключаются сторонние библиотеки (желательно минифицированные) через gulp-file-include

@@include('../../bower_components/modernizr/modernizr.js')

// 02-05-2016: Tatiana Shemenyova
// Используем https://github.com/malihu/malihu-custom-scrollbar-plugin
// Для скроллбара в выпадашках фильтров на странице каталога
@@include('../../bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js')

// 03-05-2016: Dovzhenko Vladislav
// Используем https://github.com/kenwheeler/slick/   (slick-slider)
// Для слайдера индекса нагрузки на странице - как выбрать шины
@@include('../../bower_components/slick-carousel/slick/slick.min.js')

// 06-05-2016: Dovzhenko Vladislav
// Используем jquery UI
// Для Jquery компонентов
@@include('../../bower_components/jquery-ui/jquery-ui.min.js')


// 10-05-2016: Tatiana Shemenyova
// Используем https://github.com/jzaefferer/jquery-validation
// Для валидации форм
@@include('../../bower_components/jquery-validation/dist/jquery.validate.min.js')

// 10-05-2016: Tatiana Shemenyova
// Используем https://github.com/select2/select2
// Для селекта в формах. 
@@include('../../bower_components/select2/dist/js/select2.min.js')

/**
 * Dunlop: main preloader image
 * 18-05-2016: Vladimir Turosinskiy
 * ---------------------
 * Предзагрузчик изображений на главной
 * Используем https://github.com/FiNGAHOLiC/jquery.imgpreloader
 */
@@include('../js/vendor/jquery.imgpreloader.js')

/**
 * Dunlop: main fix object fit for slider bg
 * 02-06-2016: Mel. Blimm
 * ---------------------
 * Фикс свойства object fit для браузеров
 * https://github.com/bfred-it/object-fit-images/
 */
@@include('../../node_modules/object-fit-images/dist/ofi.browser.js')
