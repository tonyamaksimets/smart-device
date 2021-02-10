'use strict';

(function () {
  var buttonOpen = document.querySelector('.page-header a:last-child');

  if (buttonOpen) {
    var body = document.querySelector('.page-body');
    var callback = body.querySelector('.callback');
    var buttonClose = callback.querySelector('button:first-child');
    var callbackName = callback.querySelector('input[type="text"]');
    var callbackTel = callback.querySelector('input[type="tel"]');
    var callbackMessage = callback.querySelector('textarea');
    var buttonSubmit = callback.querySelector('button[type="submit"]');

    var isStorageSupport = true;
    var storageName = '';
    var storageTel = '';
    var storageMessage = '';

    try {
      storageName = localStorage.getItem('name');
      storageTel = localStorage.getItem('email');
      storageMessage = localStorage.getItem('message');
    } catch (err) {
      isStorageSupport = false;
    }

    var closeCallback = function () {
      body.classList.remove('page-body--modal-opened');
      callback.classList.remove('callback--opened');

      document.removeEventListener('keydown', onCallbackEscPress);
      document.removeEventListener('click', onCallbackOutsideClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      buttonSubmit.removeEventListener('submit', onButtonSubmitClick);
    };

    var onCallbackEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCallback();
      }
    };

    var onCallbackOutsideClick = function (evt) {
      if (evt.target.matches('.callback')) {
        evt.preventDefault();
        closeCallback();
      }
    };

    var onButtonCloseClick = function () {
      closeCallback();
    };

    var onButtonSubmitClick = function () {
      if (isStorageSupport) {
        localStorage.setItem('name', callbackName.value);
        localStorage.setItem('tel', callbackTel.value);
        localStorage.setItem('message', callbackMessage.value);
      }
    };

    var openCallback = function (evt) {
      evt.stopPropagation();
      body.classList.add('page-body--modal-opened');
      callback.classList.add('callback--opened');

      if (storageName) {
        callbackName.value = storageName;
      }

      if (storageTel) {
        callbackTel.value = storageTel;
      }

      if (storageMessage) {
        callbackMessage.value = storageMessage;
      }

      callbackName.focus();

      document.addEventListener('keydown', onCallbackEscPress);
      document.addEventListener('click', onCallbackOutsideClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      buttonSubmit.addEventListener('submit', onButtonSubmitClick);
    };

    buttonOpen.addEventListener('click', openCallback);
  }
})();
