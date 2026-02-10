(function () {
  var sections = document.querySelectorAll('.page-section');
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function setActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var navHeight = 80;
    var current = '';
    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      var top = section.offsetTop - navHeight;
      var height = section.offsetHeight;
      if (scrollY >= top - 50 && scrollY < top + height - 50) {
        current = id;
      }
    });
    if (!current && sections.length) {
      var first = sections[0].getAttribute('id');
      if (scrollY < sections[0].offsetTop) current = first;
      else current = sections[sections.length - 1].getAttribute('id');
    }
    navLinks.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === '#' + current) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var id = href.slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('load', setActiveNav);
})();
