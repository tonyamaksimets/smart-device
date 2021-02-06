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
