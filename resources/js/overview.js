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

  gsap.utils.toArray('[data-fog], .fog-sway').forEach((fog, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.to(fog, {
      x: 28 * dir,
      y: 14 * dir,
      rotation: 1.6 * dir,
      duration: 16 + (i % 4) * 2.5,
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
  let userMuted = false;

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
    const count = Math.min(110, Math.floor(width / 14));
    drops = Array.from({ length: count }, () => makeDrop(true));
    heavies = Array.from({ length: 6 }, () => makeHeavy(true));
  }

  function makeDrop(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -24 - Math.random() * 90,
      len: 9 + Math.random() * 14,
      speed: 12 + Math.random() * 14,
      alpha: 0.07 + Math.random() * 0.12,
      width: 0.55 + Math.random() * 0.5,
    };
  }

  function makeHeavy(randomY) {
    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -40,
      len: 16 + Math.random() * 18,
      speed: 16 + Math.random() * 14,
      alpha: 0.12 + Math.random() * 0.14,
      width: 0.9 + Math.random() * 0.7,
    };
  }

  function activeRainZones() {
    return Array.from(document.querySelectorAll('[data-rain-zone]')).filter((zone) => {
      const rect = zone.getBoundingClientRect();
      return rect.bottom > 80 && rect.top < height - 80;
    });
  }

  function spawnHit(x, y, kind) {
    const el = document.createElement('span');
    if (kind === 'drip') el.className = 'fx-drip';
    else if (kind === 'ripple') el.className = 'fx-ripple';
    else el.className = Math.random() > 0.55 ? 'fx-splash fx-splash--wide' : 'fx-splash';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    hits.appendChild(el);
    window.setTimeout(() => el.remove(), kind === 'drip' ? 1500 : 700);
  }

  function splashTargets() {
    const list = [];

    document.querySelectorAll('[data-rain-marker]').forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > height) return;
      list.push({
        type: 'marker',
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        dripY: rect.bottom,
      });
    });

    document.querySelectorAll('[data-rain-ledge]').forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < -20 || rect.top > height + 20) return;
      for (let i = 0; i < 6; i += 1) {
        const t = (i + 0.2 + Math.random() * 0.5) / 6;
        list.push({
          type: 'ledge',
          x: rect.left + rect.width * t,
          y: rect.top + 3,
          dripY: rect.top + 8,
        });
      }
    });

    return list;
  }

  function maybeInteract(now) {
    if (now - lastHit < 100) return;
    const targets = splashTargets();
    if (!targets.length) return;

    if (Math.random() < 0.5) {
      const target = targets[Math.floor(Math.random() * targets.length)];
      spawnHit(target.x + (Math.random() * 6 - 3), target.y, 'splash');
      if (Math.random() > 0.5) {
        spawnHit(target.x + (Math.random() * 10 - 5), target.y + 2, 'ripple');
      }
      lastHit = now;
      if (audio.enabled && Math.random() > 0.65) audio.splash();
    }

    if (now - lastDrip > 650 && Math.random() < 0.45) {
      const target = targets[Math.floor(Math.random() * targets.length)];
      spawnHit(target.x + (Math.random() * 4 - 2), target.dripY, 'drip');
      lastDrip = now;
      if (audio.enabled && Math.random() > 0.5) audio.drip();
    }
  }

  function tick(now) {
    ctx.clearRect(0, 0, width, height);

    const zonesOn = activeRainZones().length > 0;
    canvas.style.opacity = zonesOn ? '0.5' : '0.22';

    // Straight vertical rain only
    for (let i = 0; i < drops.length; i += 1) {
      const d = drops[i];
      d.y += d.speed;
      if (d.y > height + 24) drops[i] = makeDrop(false);
      ctx.strokeStyle = `rgba(10, 10, 10, ${d.alpha})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();
    }

    for (let i = 0; i < heavies.length; i += 1) {
      const d = heavies[i];
      d.y += d.speed;
      if (d.y > height + 30) heavies[i] = makeHeavy(false);
      ctx.strokeStyle = `rgba(5, 5, 5, ${d.alpha})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len);
      ctx.stroke();
    }

    maybeInteract(now || performance.now());
    raf = window.requestAnimationFrame(tick);
  }

  function syncAudioBtn() {
    if (!audioBtn) return;
    audioBtn.setAttribute('aria-pressed', String(audio.enabled));
    audioBtn.textContent = audio.enabled ? 'Rain audio on' : 'Rain audio off';
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  raf = window.requestAnimationFrame(tick);

  // Autoplay rain audio when Tau's Starchart scrolls into view
  const audioZone = document.querySelector('[data-rain-audio-zone]');
  if (audioZone && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (userMuted) return;
          if (entry.isIntersecting) {
            const ok = await audio.setEnabled(true);
            if (ok) syncAudioBtn();
          } else if (audio.enabled) {
            await audio.setEnabled(false);
            syncAudioBtn();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(audioZone);

    // Browsers often require one gesture before AudioContext starts —
    // unlock on first scroll/pointer once starchart is near.
    const unlock = async () => {
      if (userMuted) return;
      const rect = audioZone.getBoundingClientRect();
      const near = rect.top < window.innerHeight && rect.bottom > 0;
      if (near) {
        await audio.setEnabled(true);
        syncAudioBtn();
      }
    };
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('wheel', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', async () => {
      const on = await audio.toggle();
      userMuted = !on;
      syncAudioBtn();
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
  let enabled = false;

  async function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    rainGain = ctx.createGain();
    rainGain.gain.value = 0;
    rainGain.connect(ctx.destination);

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

    const noiseNode = ctx.createBufferSource();
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
    async setEnabled(on) {
      await ensure();
      if (!ctx) return false;
      try {
        if (on && ctx.state === 'suspended') await ctx.resume();
      } catch (_) {
        return false;
      }
      enabled = Boolean(on);
      if (rainGain) rainGain.gain.value = enabled ? 0.03 : 0;
      return enabled;
    },
    async toggle() {
      return this.setEnabled(!enabled);
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
