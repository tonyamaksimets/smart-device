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

// 'use strict';

// (function () {
//   var sliderControlsList = document.querySelectorAll('.slider-control');
//   var featuresSlidesList = document.querySelectorAll('.feature-slide');

//   var feedbackLink = document.querySelector('.feedback-link');
//   var feedback = document.querySelector('.feedback');
//   var feedbackClose = feedback.querySelector('.close-button');
//   var feedbackName = feedback.querySelector('.feedback-field-name');
//   var feedbackEmail = feedback.querySelector('.feedback-field-email');
//   var feedbackMessage = feedback.querySelector('.feedback-field-message');
//   var feedbackForm = feedback.querySelector('.feedback-form');

//   var isStorageSupport = true;
//   var storageName = '';
//   var storageEmail ='';

//   try {
//     storageName = localStorage.getItem('name');
//     storageEmail = localStorage.getItem('email');
//   } catch (err) {
//     isStorageSupport = false;
//   }

//   var addSliderControlClickHandler = function(sliderControl, featuresSlide) {
//     sliderControl.addEventListener('click', function() {
//       for (var j = 0; j < sliderControlsList.length; j++) {
//         sliderControlsList[j].classList.remove('current');
//         featuresSlidesList[j].classList.remove('current-slide');
//       };

//       sliderControl.classList.add('current');
//       featuresSlide.classList.add('current-slide');
//     });
//   };

//   for (var i = 0; i < sliderControlsList.length; i++) {
//     addSliderControlClickHandler(sliderControlsList[i], featuresSlidesList[i]);
//   }


//   feedbackLink.addEventListener('click', function(evt) {
//     evt.preventDefault();
//     feedback.classList.add('open-modal');

//     if (storageName && storageEmail) {
//       feedbackName.value = storageName;
//       feedbackEmail.value = storageEmail;
//       feedbackMessage.focus();
//     } else if (!storageName && !storageEmail) {
//       feedbackName.focus();
//     } else if (storageName && !storageEmail) {
//       feedbackName.value = storageName;
//       feedbackEmail.focus();
//     } else {
//       feedbackEmail = storageEmail;
//       feedbackName.focus();
//     }
//   });

//   feedbackClose.addEventListener('click', function() {
//     feedback.classList.remove('open-modal');
//     feedback.classList.remove('error-modal');
//   });

//   window.addEventListener('keydown', function (evt) {
//     if (evt.keyCode === 27) {
//       if (feedback.classList.contains('open-modal')) {
//         evt.preventDefault();
//         feedback.classList.remove('open-modal');
//         feedback.classList.remove('error-modal');
//       }
//     }
//   });

//   feedbackForm.addEventListener('submit', function(evt) {
//     if (feedbackName.value && feedbackEmail.value && feedbackMessage.value) {
//       if (isStorageSupport) {
//         localStorage.setItem('name', feedbackName.value);
//         localStorage.setItem('email', feedbackEmail.value);
//       }
//     } else {
//       evt.preventDefault();
//       feedback.classList.remove('error-modal');
//       feedback.offsetWidth = feedback.offsetWidth;
//       feedback.classList.add('error-modal');
//     }
//   });

// })();

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

'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var anchors = body.querySelectorAll('a[href*="#"]');

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
    var telCharacter = /^\d$/;
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
        if (input.value.length > TEL_PREFIX_LENGTH && !(telCharacter).test(input.value[input.value.length - 1])) {
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
