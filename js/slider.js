(function () {
  var slider = document.getElementById('slider');
  var panels = document.querySelectorAll('.panel');
  var navLinks = document.querySelectorAll('.nav a[data-panel]');
  var panelIds = ['intro', 'about', 'projects', 'skills', 'contact'];

  function getPanelIndex() {
    var w = window.innerWidth;
    var scrollLeft = slider.scrollLeft;
    return Math.round(scrollLeft / w);
  }

  function goToPanel(index) {
    index = Math.max(0, Math.min(index, panels.length - 1));
    var w = window.innerWidth;
    slider.scrollTo({ left: index * w, behavior: 'smooth' });
    setActiveNav(index);
  }

  function setActiveNav(index) {
    var name = panelIds[index];
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-panel') === name);
    });
  }

  // Nav click: slide to panel
  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var panel = a.getAttribute('data-panel');
      var index = panelIds.indexOf(panel);
      if (index !== -1) goToPanel(index);
    });
  });

  // Slider scroll: update nav
  slider.addEventListener('scroll', function () {
    setActiveNav(getPanelIndex());
  });

  // Keyboard: left/right to slide
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToPanel(getPanelIndex() - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToPanel(getPanelIndex() + 1);
    }
  });

  // Touch swipe (optional): threshold in px
  var touchStartX = 0;
  slider.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      goToPanel(getPanelIndex() + (dx < 0 ? 1 : -1));
    }
  });
})();
