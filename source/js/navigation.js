'use strict';

(function () {
  var COLUMNS = 2;
  var navigation = document.querySelector('.navigation');

  if (navigation && window.screen.width >= 1024) {
    var items = navigation.querySelectorAll('li');
    var list = navigation.querySelector('ul');

    var itemInColumn = Math.ceil(items.length / COLUMNS);
    var width = 0;
    var height = 0;

    for (var j = items.length - itemInColumn; j < items.length; j++) {
      items[j].style.paddingRight = 0;
    }

    navigation.classList.remove('navigation--nojs');

    for (var k = 0; k < itemInColumn; k++) {
      items[k].style.maxWidth = 'none';

      if (items[k + itemInColumn] && items[k].offsetHeight > items[k + itemInColumn].offsetHeight) {
        items[k + itemInColumn].style.height = items[k].offsetHeight + 'px';
      } else if (items[k + itemInColumn] && items[k].offsetHeight < items[k + itemInColumn].offsetHeight) {
        items[k].style.height = items[k + itemInColumn].offsetHeight + 'px';
      }

      height += items[k].offsetHeight;
    }

    list.style.maxHeight = height + 'px';

    for (var i = 0; i < COLUMNS; i++) {
      width += items[i * itemInColumn].offsetWidth;
    }
    list.style.width = width + 'px';
  }
})();
