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
