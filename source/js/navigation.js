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
