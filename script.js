// Loading screen - dismiss on click or keypress when ready to start
const loadingScreen = document.getElementById('loadingScreen');
const loadingMusic = document.getElementById('loadingMusic');
const presentationMusic = document.getElementById('presentationMusic');

/* ========== HIDDEN: Audio Visualizer (frequency bars)
   To re-enable: 1) Uncomment this block, 2) Add showVisualizer() to dismissLoading,
   3) Uncomment the canvas in index.html, 4) Uncomment the CSS in styles.css

const visualizerCanvas = document.getElementById('audioVisualizer');
let audioCtx = null;
let presentationAnalyser = null;
let visualizerAnimationId = null;

const VISUALIZER_COLORS = [
  '#00b894', '#00d4aa', '#55efc4', '#81ecec',
];

function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function initVisualizer() {
  if (presentationAnalyser) return;
  getAudioContext().resume();
  const ctx = getAudioContext();
  const source = ctx.createMediaElementSource(presentationMusic);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = 0.8;
  analyser.minDecibels = -60;
  analyser.maxDecibels = -10;
  source.connect(analyser);
  analyser.connect(ctx.destination);
  presentationAnalyser = analyser;
}

function resizeVisualizer() {
  if (!visualizerCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = visualizerCanvas.getBoundingClientRect();
  visualizerCanvas.width = rect.width * dpr;
  visualizerCanvas.height = rect.height * dpr;
  const ctx = visualizerCanvas.getContext('2d');
  if (ctx) ctx.scale(dpr, dpr);
}

function getVisualizerSize() {
  if (!visualizerCanvas) return { width: 0, height: 0 };
  return visualizerCanvas.getBoundingClientRect();
}

function drawVisualizer() {
  if (!visualizerCanvas || !presentationAnalyser) return;
  const onLoading = loadingScreen && !loadingScreen.classList.contains('hidden');
  if (onLoading) {
    visualizerAnimationId = requestAnimationFrame(drawVisualizer);
    return;
  }
  const ctx = visualizerCanvas.getContext('2d');
  const { width, height } = getVisualizerSize();
  const bufferLength = presentationAnalyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  presentationAnalyser.getByteFrequencyData(dataArray);
  const barCount = 64;
  const barWidth = width / barCount;
  const gap = 2;
  const padding = 4;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < barCount; i++) {
    const step = Math.floor(bufferLength / barCount);
    let sum = 0;
    for (let j = 0; j < step; j++) sum += dataArray[i * step + j];
    const barHeight = Math.max(4, (sum / step / 255) * (height - padding * 2));
    const x = i * barWidth + gap / 2;
    const barW = Math.max(1, barWidth - gap);
    const y = height - padding - barHeight;
    const colorIndex = Math.min(Math.floor((i / barCount) * VISUALIZER_COLORS.length), VISUALIZER_COLORS.length - 1);
    const baseColor = VISUALIZER_COLORS[colorIndex];
    const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.5, baseColor);
    gradient.addColorStop(1, 'rgba(129, 236, 236, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barW, barHeight);
  }
  visualizerAnimationId = requestAnimationFrame(drawVisualizer);
}

function showVisualizer() {
  if (visualizerCanvas) {
    visualizerCanvas.classList.add('visible');
    resizeVisualizer();
  }
  initVisualizer();
  drawVisualizer();
}

window.addEventListener('resize', () => {
  if (visualizerCanvas?.classList.contains('visible')) resizeVisualizer();
});

========== END HIDDEN ========== */

function playLoadingMusic() {
  if (loadingMusic) {
    loadingMusic.muted = false;
    loadingMusic.volume = 1;
    loadingMusic.play().catch((err) => console.warn('Loading music:', err.message));
  }
}

const CROSSFADE_DURATION_MS = 1500;

function crossfade(outAudio, inAudio, durationMs) {
  if (!outAudio || !inAudio) return;
  inAudio.volume = 0;
  inAudio.play().catch((err) => console.warn('Presentation music:', err.message));

  const steps = 40;
  const stepMs = durationMs / steps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    const t = step / steps;
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    outAudio.volume = Math.max(0, 1 - eased);
    inAudio.volume = Math.min(0.5, eased * 0.5);

    if (step >= steps) {
      clearInterval(interval);
      outAudio.pause();
      outAudio.currentTime = 0;
    }
  }, stepMs);
}

function dismissLoading() {
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    loadingScreen.classList.add('hidden');
    crossfade(loadingMusic, presentationMusic, CROSSFADE_DURATION_MS);
    // showVisualizer(); // uncomment when re-enabling visualizer
  }
}

// Log audio load errors (file not found, wrong path, etc.)
[loadingMusic, presentationMusic].forEach((el) => {
  if (el) {
    el.addEventListener('error', () => {
      const err = el.error;
      console.warn('Audio load error:', el.id, err?.message || 'Failed to load. Use a local server (npx serve) if opening from file://');
    });
  }
});

// Try to start loading music immediately (autoplay in HTML + play() here)
playLoadingMusic();

// Brief delay before dismiss so loading music has a moment to play when user clicks
const DISMISS_DELAY_MS = 400;

if (loadingScreen) {
  loadingScreen.addEventListener('click', () => {
    playLoadingMusic();
    setTimeout(dismissLoading, DISMISS_DELAY_MS);
  });
  document.addEventListener('keydown', () => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      playLoadingMusic();
      setTimeout(dismissLoading, DISMISS_DELAY_MS);
    }
  });
}

// Slide presentation
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentSlide = 0;

// Create dots
const dotsContainer = document.getElementById('navDots');
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('data-index', i);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.nav-dot');

function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });

  document.getElementById('slideNumber').textContent = `${currentSlide + 1} / ${totalSlides}`;
}

document.addEventListener('keydown', (e) => {
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToSlide(currentSlide - 1);
  }
});

document.addEventListener('click', (e) => {
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) return;
  if (e.target.closest('.loading-screen')) return;
  if (!e.target.closest('.nav-dot') && e.clientX > window.innerWidth / 2) {
    goToSlide(currentSlide + 1);
  } else if (!e.target.closest('.nav-dot') && e.clientX <= window.innerWidth / 2 && currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});
