window.onload = function() {
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  var tracker = new tracking.ColorTracker(Object.keys(tracking.ColorTracker.knownColors_));
  tracking.track('#video', tracker, { camera: true });

  tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText(('x: ' + rect.x + 'px').split("").reverse().join(""), rect.x + rect.width + 5, rect.y + 11);
      context.fillText(('y: ' + rect.y + 'px').split("").reverse().join(""), rect.x + rect.width + 5, rect.y + 22);
    });
  });

  window.pubSub = {
    subscribe: tracker.on.bind(tracker, 'track')
  };
};
