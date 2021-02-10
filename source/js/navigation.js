'use strict';

(function () {
  var COLUMNS = 2;
  var navigation = document.querySelector('.navigation');

  if (navigation && window.screen.width >= 1024) {
    var items = navigation.querySelectorAll('li');
    var list = navigation.querySelector('ul');

    var itemInColumn = Math.ceil(items.length / COLUMNS);
    var width = 0;

    for (var j = items.length - itemInColumn; j < items.length; j++) {
      items[j].style.paddingRight = 0;
    }

    navigation.classList.remove('navigation--nojs');
    list.style.maxHeight = itemInColumn * items[0].offsetHeight + 'px';

    for (var i = 0; i < COLUMNS; i++) {
      width += items[1 + i * itemInColumn].offsetWidth;
    }
    list.style.width = width + 'px';
  }
})();
