function adriver_counter(counter, place) {
    var RndNum4NoCash = Math.round(Math.random() * 1000000000);
    var ar_Tail = 'unknown';
    if (document.referrer) ar_Tail = escape(document.referrer);

    var place = (place ? '&sz=' + place : '');
    var html = '<img src="http://ad.adriver.ru/cgi-bin/rle.cgi?' + 'sid=' + counter + place + '&bt=21&pz=0&rnd=' + RndNum4NoCash + '&tail256=' + ar_Tail + '" border="0" width="1" height="1" />';

    $("#adriver_counter").html(html);
}

(function ($) {
    $.fn.historySlider = function (options) {
        var settings = {slideSpeed: 800};
        $.extend(settings, options);

        var target = $(this),
            sausage = $('#history-slider div.sausage'),
            yearRefs = $('.paging a'),
            wheel = $('#wheel'),
            wheelDiv = $('#wheel div'),
            wheelShadow = $('#wheel i'),
            yearBtn = $('.paging div'),
            yearBtnNumber = yearBtn.find('span'),
            yearBtnStep = 80,
            yearBtnSpeed = 80,

            wheelSize = 362,
            wheelPos,
            wheelRotationCounter = 0,
            newWheelRotationCounter = 0,
            wheelNumber = 0,
            wheelTrueNumber,

            direction,
            stepCount = 0,
            leftStepCount = 0,
            slideTime,
            startPosition,
            slideLength,
            wheelStep,
            nextTarget,
            destination,
            index = 0,
            cur = 0,
            wheelInt,
            sign = true,
            sign2 = true,
            sign3 = true,
            isIE = false,
            isIOs = (navigator.platform.indexOf("iPhone") != -1) || (navigator.platform.indexOf("iPod") != -1) || (navigator.platform.indexOf("iPad") != -1) ? true : false;



        init = function () {

            if (isIOs) {
                wheel.css("display", "none");
                sausage.css("background-image", "url('/lang/ru/images/content/history/history_sample.jpg')");
            }

            if (isIE)
                wheelDiv.css('background', "url('/lang/ru/images/content/history/pic-history-wheels-ie.png') 0 0 no-repeat");

            fitSize();

            $(window).bind('resize', function () {
                if (sign)
                    fitSize();

                sign = false;
                setTimeout(function () {
                    sign = true;
                }, 1000);
            });

            yearBtnNumber.eq(0).fadeIn(settings.slideSpeed / 16);
            yearBtn.draggable({
                axis: 'x',
                containment: 'parent',
                stop: function () {
                    var shift = parseInt($(this).css('left'));
                    index = Math.floor(shift / yearBtnStep);

                    var tail = shift % yearBtnStep;

                    if (tail > 52)
                        index++;

                    cur = yearRefs.filter('.active').index();

                    $(this).animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                    rotateInit();
                }
            });
            yearRefs.bind('click', function (e) {
                e.preventDefault();

                if (!sign3)
                    return;

                index = $(this).index();
                cur = yearRefs.filter('.active').index();

                var counter = 184731;
                var placement = '';

                adriver_counter(counter, placement);
                yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);
                rotateInit();
            });

        };

        function sideSlide(direction) {
            if (direction == 'left') {
                cur = yearRefs.filter('.active').index();
                if (cur > 0) {
                    index = cur - 1;

                    yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                    rotateInit();
                }
            } else if (direction == 'right') {
                cur = yearRefs.filter('.active').index();
                if (cur < 8) {
                    index = cur + 1;

                    yearBtn.animate({left: index * yearBtnStep + 'px'}, yearBtnSpeed);

                    rotateInit();
                }
            }
        }

        rotateInit = function () {
            if (index != cur) {
                stepCount = yearRefs.eq(index).attr('name') - yearRefs.eq(cur).attr('name');

                if (stepCount > 0) {
                    direction = 'right';
                } else {
                    stepCount = -1 * stepCount;
                    direction = 'left';
                    leftStepCount = 0;
                }

                rotate(direction);
                yearBtnNumber.filter(':visible').fadeOut(1);
                yearBtnNumber.eq(index).fadeIn(settings.slideSpeed);

                sign3 = false;
                yearBtn.draggable('disable');
            }
        };

        rotate = function () {
            startPosition = parseInt(sausage.css('left'));
            if (direction == 'right') {
                nextTarget = yearRefs.eq(index - stepCount + 1);

                wheelPos = 0;
                slideLength = parseInt(nextTarget.attr('rel')) + startPosition;
                destination = -1 * nextTarget.attr('rel');

            } else {
                nextTarget = yearRefs.eq(cur - leftStepCount - 1);
                if (!(isIE && wheelPos > 5)) {
                    wheelPos = 3;
                }
                slideLength = Math.abs(parseInt(nextTarget.attr('rel')) + startPosition);
                destination = -1 * nextTarget.attr('rel');
            }

            wheelStep = slideLength / 32;
            wheelRotationCounter = 0;
            sign2 = true;
            if (!isIOs)
                sausage.css('left', startPosition + 'px').animate({'left': destination + 'px'}, {
                    duration: settings.slideSpeed,
                    easing: 'linear',
                    step: function _stepCallback(now, opts) {
                        newWheelRotationCounter = Math.floor(Math.abs(Math.abs(startPosition) - Math.abs(now)) / wheelStep);
                        if (wheelRotationCounter != newWheelRotationCounter) {
                            wheelRotationCounter = newWheelRotationCounter;
                            rotateWheel(direction);
                        }
                    },
                    complete: function _completeCallback() {
                        stepCount--;
                        leftStepCount++;
                        wheelNumber = parseInt(nextTarget.attr('name')) - 1;
                        wheelRotationCounter = 0;
                        wheelPos = 1;

                        if (stepCount > 0)
                            rotate(direction);
                        else {
                            yearRefs.removeClass('active'); //Remove all active class
                            yearRefs.eq(index).addClass('active'); //Add active class
                            if (!(isIE && (wheelNumber == '3' || wheelNumber == '8'))) {
                                setTimeout(function () {
                                    wheelDiv.css('backgroundPosition', '0 ' + (-1 * wheelNumber * wheelSize) + 'px');
                                }, settings.slideSpeed / 32);
                            }

                            if (isIE) {
                                if (wheelNumber == '3' || wheelNumber == '8') {
                                    wheelShadow.css('display', 'none');
                                    wheelPos = 8;
                                } else {
                                    wheelShadow.css('display', 'block');
                                }
                            }

                            sign3 = true;
                            yearBtn.draggable('enable');
                        }
                    }
                });
            else {
                stepCount--;
                leftStepCount++;
                wheelRotationCounter = 0;
                wheelPos = 1;
                destination += 300;
                sausage.css({
                    '-webkit-transform': 'translate3d(' + destination + 'px, 0px, 0px)',
                    '-webkit-transition': '-webkit-transform ' + (settings.slideSpeed / 1000) + 's linear'
                });
                
/*                wheelInt = setInterval(function () {
                    rotateWheel(direction);
                }, settings.slideSpeed / 32);*/

                if (stepCount > 0) {
                    setTimeout(function () {
                        rotate(direction);
                        clearInterval(wheelInt);
                    }, settings.slideSpeed);
                }
                else {
                    setTimeout(function () {
                        yearRefs.removeClass('active'); //Remove all active class
                        yearRefs.eq(index).addClass('active'); //Add active class
                        sign3 = true;
                        yearBtn.draggable('enable');
                    }, settings.slideSpeed);
                }
            }
        };

        function rotateWheel(direction) {

            if (direction == 'right') {
                if (isIE) {
                    if (wheelRotationCounter < 16 && !wheelShadow.is(':visible')) {
                        wheelShadow.css('display', 'block');
                    }

                    if (wheelPos < 5 || wheelPos > 8)
                        wheelPos++;

                    if (wheelPos == 4)
                        wheelPos = 1;

                    if (wheelRotationCounter == 16)
                        wheelPos = 5;
                    if (wheelRotationCounter == 18) {
                        wheelPos = 6;
                        wheelShadow.css('display', 'none');
                    }
                    if (wheelRotationCounter == 20) {
                        wheelPos = 7;
                        wheelNumber++;
                    }

                    if (wheelNumber != '3' && wheelNumber != '8') {
                        if (wheelRotationCounter == 22) {
                            wheelPos = 6;
                            wheelShadow.css('display', 'block');
                        }
                        if (wheelRotationCounter == 24)
                            wheelPos = 5;
                        if (wheelRotationCounter > 24 && wheelPos > 4)
                            wheelPos = 1;
                    }
                } else {

                    if (wheelDiv.add(wheelShadow).css('opacity') == '0' && (wheelRotationCounter < 16)) {
                        wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 4);
                    }

                    wheelPos++;

                    if (wheelPos == 4)
                        wheelPos = 1;

                    if (wheelRotationCounter > 16 && sign2) {
                        sign2 = false;

                        if (wheelNumber != '2' && wheelNumber != '7')
                            wheelDiv.add(wheelShadow).animate({opacity: '.4'}, settings.slideSpeed / 6, function () {
                                wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 6);
                            });
                        else {
                            wheelDiv.add(wheelShadow).animate({opacity: '0'}, settings.slideSpeed / 3);
                        }
                    }

                    if (wheelRotationCounter == 20) {
                        wheelPos = 1;
                        wheelNumber++;
                    }
                }

                if (wheelNumber > 4 && wheelNumber < 9)
                    wheelTrueNumber = 4;
                else
                    wheelTrueNumber = wheelNumber;

                if (!isIOs)
                    wheelDiv.css('backgroundPosition', (-1 * wheelSize * wheelPos) + 'px ' + (-1 * wheelTrueNumber * wheelSize) + 'px');

            } else {
                if (isIE) {
                    if (wheelRotationCounter < 8 && !wheelShadow.is(':visible')) {
                        wheelShadow.css('display', 'block');
                    }

                    if (wheelPos < 5 || wheelPos > 8)
                        wheelPos--;

                    if (wheelPos == 0)
                        wheelPos = 3;

                    if (wheelRotationCounter == 8)
                        wheelPos = 5;
                    if (wheelRotationCounter == 10) {
                        wheelPos = 6;
                        wheelShadow.css('display', 'none');
                    }
                    if (wheelRotationCounter == 12) {
                        wheelPos = 7;
                        wheelNumber--;
                    }
                    if (wheelNumber != '3' && wheelNumber != '8') {
                        if (wheelRotationCounter == 14) {
                            wheelPos = 6;
                            wheelShadow.css('display', 'block');
                        }
                        if (wheelRotationCounter == 16)
                            wheelPos = 5;
                        if (wheelRotationCounter > 16 && wheelPos > 4)
                            wheelPos = 1;
                    }
                } else {

                    wheelPos--;

                    if (wheelPos <= 0)
                        wheelPos = 3;

                    if (wheelRotationCounter > 8 && sign2) {
                        sign2 = false;

                        if (wheelNumber != '4' && wheelNumber != '9')
                            wheelDiv.add(wheelShadow).animate({opacity: '.4'}, settings.slideSpeed / 6, function () {
                                wheelDiv.add(wheelShadow).animate({opacity: '1'}, settings.slideSpeed / 6);
                            });
                        else
                            wheelDiv.add(wheelShadow).animate({opacity: '0'}, settings.slideSpeed / 3);
                    }

                    if (wheelRotationCounter == 12) {
                        wheelPos = 1;
                        wheelNumber--;
                    }
                }

                if (wheelNumber > 4 && wheelNumber < 9)
                    wheelTrueNumber = 4;
                else
                    wheelTrueNumber = wheelNumber;

                if (!isIOs)
                    wheelDiv.css('backgroundPosition', (-1 * wheelSize * wheelPos) + 'px ' + (-1 * wheelTrueNumber * wheelSize) + 'px');
            }
        }

        function fitSize() {
            var index,
                windowWidth = $(window).width(),
                windowHeight = $(window).height(),

                paging = $('.paging'),
                wrap = $('#wrapper-history'),
                yearRef9 = yearRefs.eq(8),
                wrapOffset,//wrap margin-left - путь по которому крутится колесо
                wheelOffset,//wheel margin-left - отступы колеса
                slidesOffset,//left - baserel
                slide9Offset1,//rel
                slide9Offset2,
                sizeDelimeter;

            if (windowWidth < 1000) {
                wrapOffset = 2;
                wheelOffset = 19;
                slidesOffset = 300;//rel
                slide9Offset1 = 405;
                slide9Offset2 = 405;
                sizeDelimeter = 1050;
            } else if (windowWidth >= 1000 && windowWidth < 1280) {
                wrapOffset = 133;
                wheelOffset = 39;
                slidesOffset = 300;
                slide9Offset1 = 270;
                slide9Offset2 = 370;
                sizeDelimeter = 1200;
            } else if (windowWidth >= 1280 && windowWidth < 1440) {
                wrapOffset = 211;
                wheelOffset = -1;
                slidesOffset = 150;
                slide9Offset1 = 200;
                slide9Offset2 = 250;
                sizeDelimeter = 1400;
            } else if (windowWidth >= 1440 && windowWidth < 1700) {
                wrapOffset = 291;
                wheelOffset = -92;
                slidesOffset = 50;
                slide9Offset1 = 122;
                slide9Offset2 = 180;
                sizeDelimeter = 1600;
                yearBtnStep = 96;
                yearBtnSpeed = 96;
            } else {
                wrapOffset = 460;
                wheelOffset = -138;
                slidesOffset = 0;
                slide9Offset1 = -45;
                slide9Offset2 = 50;
                sizeDelimeter = 1700;
                yearBtnStep = 96;
                yearBtnSpeed = 96;
            }

            index = yearRefs.filter('.active').index();
            wrap.css('marginLeft', wrapOffset + 'px');
            wheel.css('marginLeft', wheelOffset + 'px');

            yearRefs.each(function () {
                $(this).attr('rel', parseInt($(this).attr('baserel')) + slidesOffset);
            });

            if (index != 8)

                sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slidesOffset + 'px');

            if (windowWidth > sizeDelimeter) {
                yearRef9.attr('rel', parseInt(yearRef9.attr('baserel')) + slide9Offset1);
                if (index == 8)
                    sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slide9Offset1 + 'px');
            } else {
                yearRef9.attr('rel', parseInt(yearRef9.attr('baserel')) + slide9Offset2);
                if (index == 8)
                    sausage.css('left', -1 * yearRefs.filter('.active').attr('baserel') - slide9Offset2 + 'px');
            }
        }

        init();
    };

    $.fn.wheelDataSlider = function (options) {
        var settings = {speed: 400};
        $.extend(settings, options);

        var target = $(this),
            refs = $(this).find('div.params-nav a'),
            tables_div = target.find('div.tables');
        tables = tables_div.find('table.table_top,table.table_bottom').not('.ls-list');

        height = tables.eq(0).css('height');

        if (tables.eq(1).length > 0) {
            height2 = tables.eq(1).css('height');
            height = height > height2 ? height : height2;
        }

        if (!tables_div.hasClass('ls-no-height')) {
            tables_div.css('height', height);
        }

        if (tables.length == 1)
            tables.eq(0).fadeIn(settings.speed);
        else
            tables_div.find('.table_' + $(this).find('div.params-nav a.active').attr('rel')).fadeIn(settings.speed);

        if (refs.length > 1) {
            refs.bind('click', function (e) {
                e.preventDefault();

                if ($(this).hasClass('active'))
                    return false;

                refs.removeClass('active');
                $(this).addClass('active');

                tables.fadeToggle(settings.speed);

                return true;
            });
        }
        else {
            refs.eq(0).css('cursor', 'default');
            refs.bind('click', function (e) {
                return false;
            });
        }
    };

    if ($('#history-slider').length) {
        $('#history-slider').historySlider();
    }
})(jQuery);