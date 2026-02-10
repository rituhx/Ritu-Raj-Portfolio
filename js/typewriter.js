(function () {
  var lines = [
    'Creating digital experiences that matter.',
    'I design and build clean, purposeful solutions. Explore my work and let\'s connect.'
  ];
  var el = document.getElementById('typewriter-text');
  if (!el) return;

  var lineIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 70;
  var deleteSpeed = 35;
  var pauseAfterType = 2200;
  var pauseAfterDelete = 600;

  function tick() {
    var line = lines[lineIndex];
    if (isDeleting) {
      charIndex--;
      el.textContent = line.slice(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(tick, pauseAfterDelete);
        return;
      }
      setTimeout(tick, deleteSpeed);
    } else {
      charIndex++;
      el.textContent = line.slice(0, charIndex);
      if (charIndex >= line.length) {
        isDeleting = true;
        setTimeout(tick, pauseAfterType);
        return;
      }
      setTimeout(tick, typeSpeed);
    }
  }

  setTimeout(tick, 400);
})();
