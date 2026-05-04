(function () {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const scrollCue = document.getElementById('scroll-cue');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);

        // Hide scroll cue once first section below hero is visible
        if (scrollCue && entry.target.id === 'about') {
          scrollCue.style.opacity = '0';
          scrollCue.style.transition = 'opacity 0.3s ease';
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
