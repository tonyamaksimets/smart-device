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
