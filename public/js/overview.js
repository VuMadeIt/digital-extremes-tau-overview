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
      '.heading-imbue, .brysko__name, .brysko__role, .tenno__copy h3, .mode-card, .hub-tile, .promo-card, .planets__copy, .qol-card'
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

  gsap.utils.toArray('.planets__fornax-planet, .planets__perita-planet').forEach((img) => {
    gsap.to(img, {
      y: -14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.planets',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Fog: mostly side-to-side sway; rotation capped well under 10°; 70% slower
  gsap.utils.toArray('[data-fog], .fog-sway').forEach((fog, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const flip =
      fog.classList.contains('planets__smoke--fornax-b') ||
      fog.classList.contains('planets__smoke--perita-b');
    gsap.set(fog, { scaleX: flip ? -1 : 1, rotation: 0 });
    gsap.to(fog, {
      x: 14 * dir,
      y: 1.5 * dir,
      rotation: 2.2 * dir,
      duration: (22 + (i % 4) * 4) / 0.3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  });
})();

/**
 * Sheepeuh-style canvas rain — black, long/thin streaks + surface splashes.
 * Adapted from http://sheepeuh.com/rain/ (no GUI / toys).
 */
function initBlackRain(reduceMotion) {
  const root = document.querySelector('[data-fx-rain]');
  const canvas = document.querySelector('[data-rain-canvas]');
  const audioBtn = document.querySelector('[data-rain-audio-toggle]');
  if (!root || !canvas) return;

  if (reduceMotion) {
    root.hidden = true;
    if (audioBtn) audioBtn.hidden = true;
    return;
  }

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let particules = [];
  let gouttes = [];
  let raf = 0;
  let userMuted = false;
  let surfaceCache = [];
  let surfaceCacheAt = 0;

  // Tuned black rain — longer + thinner than demo defaults
  const controls = {
    rain: 3, // spawn burst size per frame
    dropMin: 18,
    dropMax: 42,
    dropWidthDiv: 8.5, // vitesseY / this = streak width (thinner)
    speedBoost: 5,
    splashCount: 6,
  };

  const audio = createRainAudio();

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    surfaceCacheAt = 0;
  }

  function rainColor(alpha) {
    return `rgba(0, 0, 0, ${alpha})`;
  }

  function spawnRain(x, y, count) {
    let n = count == null ? 2 : count;
    while (n--) {
      const vitesseY = controls.dropMin + Math.random() * (controls.dropMax - controls.dropMin);
      particules.push({
        vitesseX: Math.random() * 0.2 - 0.05,
        vitesseY,
        x,
        y,
        alpha: 0.55 + Math.random() * 0.4,
      });
    }
  }

  const tipCache = new Map();
  const silhouetteCache = new Map();

  async function loadJson(url) {
    if (!url) return null;
    if (tipCache.has(url)) return tipCache.get(url);
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      const data = await res.json();
      tipCache.set(url, data);
      return data;
    } catch (_) {
      tipCache.set(url, null);
      return null;
    }
  }

  async function loadSilhouette(url) {
    if (!url) return null;
    if (silhouetteCache.has(url)) return silhouetteCache.get(url);
    const data = await loadJson(url);
    silhouetteCache.set(url, data);
    return data;
  }

  function collectRainZones() {
    return Array.from(document.querySelectorAll('[data-rain-zone]')).map((zone) =>
      zone.getBoundingClientRect()
    );
  }

  function zoneRects() {
    return collectRainZones().filter((r) => r.width > 0 && r.height > 0);
  }

  function anyZoneVisible(rects) {
    return rects.some((r) => r.bottom > 0 && r.top < height);
  }

  function pointInZones(x, y, rects) {
    for (let i = 0; i < rects.length; i += 1) {
      const r = rects[i];
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
    }
    return false;
  }

  function collectSurfaces() {
    const list = [];
    document.querySelectorAll('[data-rain-surface], [data-rain-border]').forEach((node) => {
      // Only splash inside active rain sections (Starchart / Tenno)
      if (!node.closest('[data-rain-zone]')) return;

      const rect = node.getBoundingClientRect();
      if (rect.bottom < -40 || rect.top > height + 40) return;
      if (rect.width < 8 || rect.height < 2) return;

      const shingles = node.hasAttribute('data-rain-shingles');
      const silUrl = node.getAttribute('data-rain-silhouette') || '';
      const sil = silUrl ? silhouetteCache.get(silUrl) : null;
      const edge = node.getAttribute('data-rain-edge') || (sil && sil.edge) || 'top';

      list.push({
        node,
        rect,
        shingles,
        sil,
        edge,
        x0: rect.left,
        x1: rect.right,
        yHit: rect.top + 2,
      });
    });
    return list;
  }

  function surfaces() {
    const now = performance.now();
    if (now - surfaceCacheAt > 100) {
      surfaceCache = collectSurfaces();
      surfaceCacheAt = now;
    }
    return surfaceCache;
  }

  /** Screen Y of opaque shingle edge at this screen X (silhouette, not box). */
  function silhouetteY(surf, screenX) {
    const { rect, sil, edge } = surf;
    if (!sil || !sil.heights || !sil.heights.length) {
      return edge === 'bottom' ? rect.bottom - 2 : rect.top + 2;
    }
    const u = (screenX - rect.left) / rect.width;
    if (u < 0 || u > 1) return null;
    const idx = Math.min(
      sil.heights.length - 1,
      Math.max(0, Math.floor(u * sil.heights.length))
    );
    let ny = sil.heights[idx];
    // Flipped bottom divider: map tip edge to bottom of element
    if (edge === 'bottom') {
      return rect.top + (1 - ny) * rect.height;
    }
    return rect.top + ny * rect.height;
  }

  function nearestTip(surf, screenX) {
    const sil = surf.sil;
    if (!sil || !sil.tips || !sil.tips.length) return null;
    const { rect } = surf;
    let best = null;
    let bestD = Infinity;
    for (let i = 0; i < sil.tips.length; i += 1) {
      const t = sil.tips[i];
      const tx = rect.left + t.x * rect.width;
      const d = Math.abs(tx - screenX);
      if (d < bestD) {
        bestD = d;
        best = {
          x: tx,
          y: rect.top + t.y * rect.height,
          d: bestD,
        };
      }
    }
    return best;
  }

  function hitSurface(drop) {
    const list = surfaces();
    const tipY = drop.y + drop.vitesseY * 1.15;

    for (let s = 0; s < list.length; s += 1) {
      const surf = list[s];
      if (drop.x < surf.x0 - 4 || drop.x > surf.x1 + 4) continue;

      if (surf.shingles && surf.sil) {
        const edgeY = silhouetteY(surf, drop.x);
        if (edgeY == null) continue;

        // Hit the painted shingle contour (not the image box)
        if (tipY >= edgeY && drop.y <= edgeY + 28) {
          const tip = nearestTip(surf, drop.x);
          // Prefer snap to tip when close — rain "flows" to points
          if (tip && tip.d < 36) {
            return {
              x: tip.x,
              y: tip.y,
              flow: true,
              slope: edgeY - tip.y,
            };
          }
          // Hit angled face — bounce with slight slide toward nearest tip
          let hx = drop.x;
          let hy = edgeY;
          if (tip) {
            hx += (tip.x - drop.x) * 0.35;
            hy = silhouetteY(surf, hx) ?? edgeY;
          }
          return { x: hx, y: hy, flow: false };
        }
      } else {
        // Flat UI surface (ability card top, etc.)
        if (tipY >= surf.yHit && drop.y <= surf.yHit + 16) {
          return { x: drop.x, y: surf.yHit };
        }
      }
    }
    return null;
  }

  function explosion(x, y, count, opts) {
    let n = count == null ? controls.splashCount : count;
    const outward = opts && opts.flow ? 1.35 : 1;
    while (n--) {
      gouttes.push({
        vitesseX: (Math.random() * 3.2 - 1.6) * outward,
        vitesseY: (Math.random() * -3.4 - 0.5) * (opts && opts.flow ? 1.15 : 1),
        x,
        y,
        radius: 0.45 + Math.random() * 1.15,
        alpha: 0.85 + Math.random() * 0.15,
      });
    }
  }

  function update() {
    const zones = zoneRects();
    const zonesOn = anyZoneVisible(zones);

    // Fully hide canvas rain outside Starchart / Tenno
    canvas.style.opacity = zonesOn ? '0.85' : '0';
    if (!zonesOn) {
      particules.length = 0;
      gouttes.length = 0;
      return;
    }

    for (let i = 0; i < particules.length; i += 1) {
      const p = particules[i];
      p.x += p.vitesseX;
      p.y += p.vitesseY + controls.speedBoost;

      // Cull drops that leave the allowed sections
      if (!pointInZones(p.x, p.y, zones) && p.y > 0) {
        // Allow a short fall-in from above a zone, else remove
        const aboveZone = zones.some(
          (r) => p.x >= r.left && p.x <= r.right && p.y < r.top && p.y > r.top - 80
        );
        if (!aboveZone) {
          particules.splice(i--, 1);
          continue;
        }
      }

      const hit = hitSurface(p);
      if (hit) {
        explosion(hit.x, hit.y, hit.flow ? 7 : 5, { flow: hit.flow });
        particules.splice(i--, 1);
        if (audio.enabled && Math.random() > 0.72) audio.splash();
        continue;
      }

      if (p.y > height - 12) {
        explosion(p.x, height - 8, 3);
        particules.splice(i--, 1);
      }
    }

    for (let i = 0; i < gouttes.length; i += 1) {
      const g = gouttes[i];
      g.x += g.vitesseX;
      g.y += g.vitesseY;
      g.vitesseY += 0.12; // gravity on splash droplets
      g.radius -= 0.055;
      g.alpha -= 0.012;
      if (g.radius < 0 || g.alpha <= 0) {
        gouttes.splice(i--, 1);
      }
    }

    // Spawn only across visible rain-zone widths
    let n = controls.rain;
    while (n--) {
      const visible = zones.filter((r) => r.bottom > 0 && r.top < height);
      if (!visible.length) break;
      const r = visible[Math.floor(Math.random() * visible.length)];
      const x = r.left + Math.random() * Math.max(1, r.width);
      const y = Math.min(r.top, 0) - 20 - Math.random() * 40;
      spawnRain(x, y, 1);
    }
  }

  function occluderRects() {
    const sel =
      '.promo-card, .mode-card, .starchart__map, .hub-tile, .qol-card, .planets__fornax-art, .planets__perita-art, .planets__fornax-planet, .planets__perita-planet, .planets__copy, .planets__structure, .planets__rocks, .tenno__visual, .tenno__copy, .tenno__inner > .heading-imbue, .brysko__content, .ability-panel, .soundtrack__card, .update-summary__cards, .update-summary__copy';
    const list = [];
    document.querySelectorAll(sel).forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) return;
      if (rect.bottom < -20 || rect.top > height + 20) return;
      // Slight pad so streaks don't kiss the edge of images
      list.push({
        left: rect.left - 4,
        top: rect.top - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      });
    });
    return list;
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const zones = zoneRects();
    if (!zones.length) return;

    ctx.save();
    ctx.beginPath();
    zones.forEach((r) => {
      ctx.rect(r.left, r.top, r.width, r.height);
    });
    ctx.clip();

    for (let i = 0; i < particules.length; i += 1) {
      const p = particules[i];
      const streakW = Math.max(0.45, p.vitesseY / controls.dropWidthDiv);
      const streakH = p.vitesseY * 1.35; // longer drops
      ctx.globalAlpha = p.alpha * 0.92;
      ctx.fillStyle = rainColor(1);
      ctx.fillRect(p.x, p.y, streakW, streakH);
    }

    const tau = Math.PI * 2;
    for (let i = 0; i < gouttes.length; i += 1) {
      const g = gouttes[i];
      ctx.globalAlpha = g.alpha;
      ctx.fillStyle = rainColor(1);
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.radius, 0, tau);
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Punch rain out of images / components so streaks never sit on top of UI
    occluderRects().forEach((r) => {
      ctx.clearRect(r.left, r.top, r.width, r.height);
    });

    ctx.restore();
  }

  function tick() {
    update();
    render();
    raf = window.requestAnimationFrame(tick);
  }

  function syncAudioBtn() {
    if (!audioBtn) return;
    audioBtn.setAttribute('aria-pressed', String(audio.enabled));
    audioBtn.textContent = audio.enabled ? 'Rain audio on' : 'Rain audio off';
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener(
    'scroll',
    () => {
      surfaceCacheAt = 0;
    },
    { passive: true }
  );

  // Preload shingle silhouette maps so rain hits the painted edge, not the box
  document.querySelectorAll('[data-rain-silhouette]').forEach((node) => {
    loadSilhouette(node.getAttribute('data-rain-silhouette'));
  });

  raf = window.requestAnimationFrame(tick);

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

    const unlock = async () => {
      if (userMuted) return;
      const rect = audioZone.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
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
