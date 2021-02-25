'use strict';

(function () {
  var buttonsOpen = document.querySelectorAll('.modal-link');

  if (buttonsOpen) {
    var body = document.querySelector('.page-body');
    var callback = body.querySelector('.callback');
    var buttonClose = callback.querySelector('button:last-child');
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
      window.scrollTo(0, -body.style.top.slice(0, -2));
      body.style.top = '';
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
      evt.preventDefault();
      evt.stopPropagation();
      body.style.top = -window.scrollY + 'px';
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

    buttonsOpen.forEach(function (button) {
      button.addEventListener('click', openCallback);
    });
  }
})();

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

'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var anchorFeatures = body.querySelector('a[href="#features"]');
  var anchorFeedback = body.querySelector('a[href="#feedback"]');
  var anchors = [];

  if (anchorFeatures) {
    anchors.push(anchorFeatures);
  }

  if (anchorFeedback) {
    anchors.push(anchorFeedback);
  }

  if (anchors) {
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (evt) {
        evt.preventDefault();

        var target = anchor.getAttribute('href').slice(1);

        document.getElementById(target).scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    });
  }
})();

'use strict';

(function () {
  var TEL_LENGTH = 14;
  var TEL_PREFIX_LENGTH = 3;
  var TEL_PREFIX = '+7(';
  var BRACKET_SYMBOL = 6;

  var textInputs = document.querySelectorAll('input[type="text"]');
  var telInputs = document.querySelectorAll('input[type="tel"]');
  var checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
  var textareas = document.querySelectorAll('textarea');

  if (textInputs) {
    var onTextInputInput = function (input) {
      return function () {
        if (!input.value && input.matches('[required]')) {
          input.setCustomValidity('Обязательное поле');
          input.parentNode.classList.add('feedback__field-block--invalid');
        } else {
          input.setCustomValidity('');
          input.parentNode.classList.remove('feedback__field-block--invalid');
        }
        input.reportValidity();
      };
    };

    textInputs.forEach(function (input) {
      input.addEventListener('input', onTextInputInput(input));
    });
  }

  if (checkboxInputs) {
    var onCheckboxChange = function (input) {
      return function () {
        if (!input.checked && input.matches('[required]')) {
          input.setCustomValidity('Обязательное поле');
          input.parentNode.classList.add('feedback__field-block--invalid');
        } else {
          input.setCustomValidity('');
          input.parentNode.classList.remove('feedback__field-block--invalid');
        }
        input.reportValidity();
      };
    };

    checkboxInputs.forEach(function (input) {
      input.addEventListener('input', onCheckboxChange(input));
    });
  }

  if (telInputs) {
    var preValueLength = TEL_PREFIX_LENGTH;

    var onTelInputFocus = function (input) {
      return function () {
        if (!input.value) {
          input.value = TEL_PREFIX;
        }
      };
    };

    var onTelInputBlur = function (input) {
      return function () {
        if (input.value === TEL_PREFIX) {
          input.value = '';
        }
      };
    };

    var onTelInputInput = function (input) {
      return function () {
        var replasedExpression = [];
        replasedExpression.push(input.value.slice(TEL_PREFIX_LENGTH, BRACKET_SYMBOL).replace(/\D/g, ''));
        replasedExpression.push(input.value.slice(BRACKET_SYMBOL + 1).replace(/\D/g, ''));
        replasedExpression.push(input.value.slice(BRACKET_SYMBOL).replace(/\D/g, ''));

        if (input.value.length > TEL_PREFIX_LENGTH && input.value.length < (BRACKET_SYMBOL + 1) && replasedExpression[0] !== input.value.slice(TEL_PREFIX_LENGTH, BRACKET_SYMBOL)) {
          input.value = TEL_PREFIX + replasedExpression[0];
          input.setCustomValidity('Телефон должен содержать только цифры');
          input.parentNode.classList.add('feedback__field--invalid');
        } else if (preValueLength === BRACKET_SYMBOL && input.value.length === (BRACKET_SYMBOL + 1) && replasedExpression[2] !== input.value.slice(BRACKET_SYMBOL)) {
          input.value = input.value.slice(0, BRACKET_SYMBOL) + replasedExpression[2];
          input.setCustomValidity('Телефон должен содержать только цифры');
          input.parentNode.classList.add('feedback__field--invalid');
        } else if (input.value.length > BRACKET_SYMBOL + 1 && replasedExpression[1] !== input.value.slice(BRACKET_SYMBOL + 1)) {
          input.value = input.value.slice(0, BRACKET_SYMBOL + 1) + replasedExpression[1];
          input.setCustomValidity('Телефон должен содержать только цифры');
          input.parentNode.classList.add('feedback__field--invalid');
        } else if (preValueLength === (TEL_PREFIX_LENGTH + 1) && input.value.length === TEL_PREFIX_LENGTH && input.matches('[required]')) {
          input.setCustomValidity('Обязательное поле');
          input.parentNode.classList.add('feedback__field-block--invalid');
        } else if (input.value.length < TEL_LENGTH || input.value.length > TEL_LENGTH) {
          input.setCustomValidity('Телефон должен содержать 11 цифр');
          input.parentNode.classList.add('feedback__field-block--invalid');
        } else {
          input.setCustomValidity('');
          input.parentNode.classList.remove('feedback__field-block--invalid');
        }

        if (preValueLength === (BRACKET_SYMBOL - 1) && input.value.length === BRACKET_SYMBOL) {
          input.value += ')';
        }

        if (preValueLength === BRACKET_SYMBOL && input.value.length === (BRACKET_SYMBOL + 1)) {
          input.value = input.value.slice(0, BRACKET_SYMBOL) + ')' + input.value.slice(BRACKET_SYMBOL);
        }

        if (input.value.length < TEL_PREFIX_LENGTH) {
          input.value = TEL_PREFIX;
        }


        input.reportValidity();

        preValueLength = input.value.length;
      };
    };

    telInputs.forEach(function (input) {
      input.addEventListener('input', onTelInputInput(input));
      input.addEventListener('focus', onTelInputFocus(input));
      input.addEventListener('blur', onTelInputBlur(input));
    });
  }

  if (textareas) {
    var onTextareaInput = function (textarea) {
      return function () {
        if (!textarea.value && textarea.matches('[required]')) {
          textarea.setCustomValidity('Обязательное поле');
          textarea.parentNode.classList.add('feedback__field-block--invalid');
        } else {
          textarea.setCustomValidity('');
          textarea.parentNode.classList.remove('feedback__field-block--invalid');
        }
        textarea.reportValidity();
      };
    };

    textareas.forEach(function (textarea) {
      textarea.addEventListener('input', onTextareaInput(textarea));
    });
  }
})();
