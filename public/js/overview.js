(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-nav-panel]');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      panel?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const abilityRoot = document.querySelector('[data-ability-panel]');
  if (abilityRoot) {
    const tabs = abilityRoot.querySelectorAll('[data-ability-tab]');
    const panels = abilityRoot.querySelectorAll('[data-ability-panel-item]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const index = tab.getAttribute('data-ability-tab');
        tabs.forEach((t) => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-selected', String(t === tab));
        });
        panels.forEach((panelItem) => {
          panelItem.classList.toggle(
            'is-active',
            panelItem.getAttribute('data-ability-panel-item') === index
          );
        });
      });
    });
  }

  // Never leave content stuck invisible — critical for heading contrast QA
  if (reduceMotion || typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });

  const heroBits = document.querySelectorAll(
    '[data-animate="hero"] .hero__brand > *, [data-animate="hero"] .hero__platforms > *'
  );
  if (heroBits.length) {
    gsap.fromTo(
      heroBits,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
        clearProps: 'transform',
      }
    );
  }

  gsap.utils.toArray('[data-animate="section"]').forEach((section) => {
    const targets = section.querySelectorAll(
      '.heading-imbue, .brysko__name, .brysko__role, .tenno__copy h3, .mode-card, .hub-tile, .promo-card, .planet__copy, .qol-card'
    );
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 28, opacity: 0.2 },
      {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    );
  });

  gsap.utils.toArray('.planet__image').forEach((img) => {
    gsap.to(img, {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.planet'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
})();
