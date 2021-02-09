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
