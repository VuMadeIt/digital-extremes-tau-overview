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

  initBlackRain(reduceMotion);
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
      y: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.planet'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Subtle fog / smoke sway
  gsap.utils.toArray('[data-fog], .fog-sway').forEach((fog, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.to(fog, {
      x: 36 * dir,
      y: 18 * dir,
      rotation: 2.2 * dir,
      duration: 14 + (i % 4) * 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
    gsap.to(fog, {
      opacity: Number.parseFloat(getComputedStyle(fog).opacity || '0.35') * 0.82,
      duration: 9 + i,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
})();

function initBlackRain(reduceMotion) {
  const root = document.querySelector('[data-fx-rain]');
  const canvas = document.querySelector('[data-rain-canvas]');
  const hits = document.querySelector('[data-rain-hits]');
  const audioBtn = document.querySelector('[data-rain-audio-toggle]');
  if (!root || !canvas || !hits) return;

  if (reduceMotion) {
    root.hidden = true;
    if (audioBtn) audioBtn.hidden = true;
    return;
  }

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let drops = [];
  let heavies = [];
  let lastHit = 0;
  let lastDrip = 0;
  let raf = 0;

  const audio = createRainAudio();

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedDrops();
  }

  function seedDrops() {
    const count = Math.min(160, Math.floor(width / 10));
    drops = Array.from({ length: count }, () => makeDrop(true));
    heavies = Array.from({ length: 10 }, () => makeHeavy(true));
  }

  function makeDrop(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20 - Math.random() * 80,
      len: 10 + Math.random() * 18,
      speed: 14 + Math.random() * 16,
      alpha: 0.12 + Math.random() * 0.22,
      width: 0.7 + Math.random() * 0.7,
    };
  }

  function makeHeavy(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -40,
      len: 22 + Math.random() * 28,
      speed: 20 + Math.random() * 18,
      alpha: 0.28 + Math.random() * 0.25,
      width: 1.2 + Math.random() * 1.1,
    };
  }

  function spawnHit(x, y, kind) {
    const el = document.createElement('span');
    el.className = kind === 'drip' ? 'fx-drip' : kind === 'ripple' ? 'fx-ripple' : 'fx-splash';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    hits.appendChild(el);
    window.setTimeout(() => el.remove(), kind === 'drip' ? 1500 : 800);
  }

  function surfaceTops() {
    const nodes = document.querySelectorAll(
      '[data-rain-surface], .section-divider, .qol__edge, .hub-tile, .promo-card, .mode-card, .starchart__map, .planet__image'
    );
    const list = [];
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > height || rect.width < 40) return;
      list.push(rect);
    });
    return list;
  }

  function maybeInteract(now) {
    if (now - lastHit < 90) return;
    const surfaces = surfaceTops();
    if (!surfaces.length) return;

    if (Math.random() < 0.55) {
      const rect = surfaces[Math.floor(Math.random() * surfaces.length)];
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + 1 + Math.random() * 3;
      spawnHit(x, y, Math.random() > 0.7 ? 'ripple' : 'splash');
      lastHit = now;
      if (audio.enabled && Math.random() > 0.65) audio.splash();
    }

    if (now - lastDrip > 900 && Math.random() < 0.35) {
      const rect = surfaces[Math.floor(Math.random() * surfaces.length)];
      const x = rect.left + 20 + Math.random() * Math.max(20, rect.width - 40);
      const y = rect.bottom - 2;
      spawnHit(x, y, 'drip');
      lastDrip = now;
      if (audio.enabled) audio.drip();
    }
  }

  function tick(now) {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < drops.length; i += 1) {
      const d = drops[i];
      d.y += d.speed;
      d.x += 0.15;
      if (d.y > height + 20) drops[i] = makeDrop(false);
      ctx.strokeStyle = `rgba(18, 18, 18, ${d.alpha})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 0.4, d.y + d.len);
      ctx.stroke();
    }

    for (let i = 0; i < heavies.length; i += 1) {
      const d = heavies[i];
      d.y += d.speed;
      if (d.y > height + 30) heavies[i] = makeHeavy(false);
      ctx.strokeStyle = `rgba(8, 8, 8, ${d.alpha})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - 0.8, d.y + d.len);
      ctx.stroke();
    }

    maybeInteract(now || performance.now());
    raf = window.requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  raf = window.requestAnimationFrame(tick);

  if (audioBtn) {
    audioBtn.addEventListener('click', async () => {
      const on = await audio.toggle();
      audioBtn.setAttribute('aria-pressed', String(on));
      audioBtn.textContent = on ? 'Rain audio on' : 'Rain audio off';
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.cancelAnimationFrame(raf);
      audio.suspend();
    } else {
      raf = window.requestAnimationFrame(tick);
      audio.resume();
    }
  });
}

function createRainAudio() {
  let ctx = null;
  let rainGain = null;
  let noiseNode = null;
  let enabled = false;

  async function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    rainGain = ctx.createGain();
    rainGain.gain.value = 0.028;
    rainGain.connect(ctx.destination);

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

    noiseNode = ctx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 780;
    filter.Q.value = 0.6;

    noiseNode.connect(filter);
    filter.connect(rainGain);
    noiseNode.start();
  }

  function blip(freq, duration, volume) {
    if (!ctx || !enabled) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.start(t);
    osc.stop(t + duration);
  }

  return {
    get enabled() {
      return enabled;
    },
    async toggle() {
      await ensure();
      if (!ctx) return false;
      enabled = !enabled;
      if (enabled) {
        if (ctx.state === 'suspended') await ctx.resume();
        rainGain.gain.value = 0.028;
      } else if (rainGain) {
        rainGain.gain.value = 0;
      }
      return enabled;
    },
    splash() {
      blip(180 + Math.random() * 90, 0.08, 0.012);
    },
    drip() {
      blip(320 + Math.random() * 80, 0.12, 0.01);
    },
    suspend() {
      ctx?.suspend?.();
    },
    resume() {
      if (enabled) ctx?.resume?.();
    },
  };
}
