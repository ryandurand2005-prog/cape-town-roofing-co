(function () {

  // ── Sticky header ────────────────────────────────────────────
  var header   = document.getElementById('site-header');
  var sentinel = document.getElementById('header-sentinel');
  var bizName  = document.getElementById('header-business-name');

  if (header && sentinel) {
    var stickyObs = new IntersectionObserver(function (entries) {
      var leaving = !entries[0].isIntersecting;
      header.classList.toggle('scrolled', leaving);
      if (bizName) bizName.style.color = leaving ? 'var(--color-primary)' : '';
    }, { threshold: 0 });
    stickyObs.observe(sentinel);
  }

  // Scrolled styles injected here (can't use Tailwind pseudo-class on dynamic class)
  var style = document.createElement('style');
  style.textContent = '#site-header.scrolled { background-color: #ffffff; box-shadow: 0 1px 8px rgba(0,0,0,0.08); } #site-header.scrolled .nav-link { color: #374151; } #site-header.scrolled .nav-link:hover { color: var(--color-primary); }';
  document.head.appendChild(style);


  // ── Mobile menu ──────────────────────────────────────────────
  var menuBtn   = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  var iconMenu  = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var open = mobileNav.style.maxHeight && mobileNav.style.maxHeight !== '0px';
      mobileNav.style.maxHeight = open ? '0px' : '400px';
      menuBtn.setAttribute('aria-expanded', String(!open));
      if (iconMenu)  iconMenu.classList.toggle('hidden', !open);
      if (iconClose) iconClose.classList.toggle('hidden', open);
    });

    document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.style.maxHeight = '0px';
        menuBtn.setAttribute('aria-expanded', 'false');
        if (iconMenu)  iconMenu.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      });
    });
  }


  // ── Active nav link ──────────────────────────────────────────
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('font-bold', active);
          link.style.color = active ? 'var(--color-accent)' : '';
        });
      });
    }, { threshold: 0.5 });

    sections.forEach(function (s) { activeObs.observe(s); });
  }


  // ── Sticky bottom bar (mobile) ───────────────────────────────
  var stickyBar = document.getElementById('sticky-bar');
  var heroSection = document.getElementById('hero');
  var contactSection = document.getElementById('contact');

  if (stickyBar && heroSection) {
    var barObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var isHero    = entry.target.id === 'hero';
        var isContact = entry.target.id === 'contact';

        if (isContact) {
          // Hide when contact is visible
          if (entry.isIntersecting) {
            stickyBar.style.opacity    = '0';
            stickyBar.style.transform  = 'translateY(100%)';
            stickyBar.setAttribute('aria-hidden', 'true');
            stickyBar.classList.add('pointer-events-none');
          } else {
            stickyBar.style.opacity    = '1';
            stickyBar.style.transform  = 'translateY(0)';
            stickyBar.setAttribute('aria-hidden', 'false');
            stickyBar.classList.remove('pointer-events-none');
          }
        }
        if (isHero) {
          // Show when hero scrolls out
          if (!entry.isIntersecting) {
            stickyBar.style.opacity   = '1';
            stickyBar.style.transform = 'translateY(0)';
            stickyBar.setAttribute('aria-hidden', 'false');
            stickyBar.classList.remove('pointer-events-none');
          } else {
            stickyBar.style.opacity   = '0';
            stickyBar.style.transform = 'translateY(100%)';
            stickyBar.setAttribute('aria-hidden', 'true');
            stickyBar.classList.add('pointer-events-none');
          }
        }
      });
    }, { threshold: 0.1 });

    barObs.observe(heroSection);
    if (contactSection) barObs.observe(contactSection);
  }

})();
