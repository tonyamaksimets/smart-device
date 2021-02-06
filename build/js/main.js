'use strict';

(function () {
  var navigation = document.querySelector('.navigation');
  var office = document.querySelector('.office');

  if (navigation && office && window.screen.width <= 767) {

    navigation.classList.remove('navigation--nojs');
    office.classList.remove('office--nojs');
    navigation.classList.remove('navigation--opened');
    office.classList.remove('office--opened');

    var navButton = navigation.querySelector('button');
    var officeButton = office.querySelector('button');

    var onNavButtonClick = function () {
      navigation.classList.toggle('navigation--opened');
      office.classList.remove('office--opened');
    };

    var onOfficeButtonClick = function () {
      office.classList.toggle('office--opened');
      navigation.classList.remove('navigation--opened');
    };

    navButton.addEventListener('click', onNavButtonClick);
    officeButton.addEventListener('click', onOfficeButtonClick);
  }
})();

'use strict';

(function () {
  var ITEMS_IN_COLUMN = 4;
  var navigation = document.querySelector('.navigation');

  if (navigation && window.screen.width >= 1024) {
    var items = navigation.querySelectorAll('li');
    var list = navigation.querySelector('ul');

    var columns = Math.ceil(items.length / ITEMS_IN_COLUMN);
    var width = 0;

    navigation.classList.remove('navigation--nojs');

    for (var i = 0; i < columns; i++) {
      width += items[1 + i * ITEMS_IN_COLUMN].offsetWidth;
    }

    list.style.width = width + 'px';
  }
})();
