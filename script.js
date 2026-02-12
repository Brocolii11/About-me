// Loading screen - dismiss on click or keypress when ready to start
const loadingScreen = document.getElementById('loadingScreen');
const loadingMusic = document.getElementById('loadingMusic');
const presentationMusic = document.getElementById('presentationMusic');

function playLoadingMusic() {
  if (loadingMusic) {
    loadingMusic.volume = 0.5;
    loadingMusic.play().catch(() => {}); // Autoplay may be blocked
  }
}

function dismissLoading() {
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    if (loadingMusic) loadingMusic.pause();
    if (loadingMusic) loadingMusic.currentTime = 0;
    if (presentationMusic) {
      presentationMusic.volume = 0.5;
      presentationMusic.play().catch(() => {});
    }
    loadingScreen.classList.add('hidden');
  }
}

// Try to play loading music on load (may be blocked by browser until user interacts)
playLoadingMusic();

if (loadingScreen) {
  loadingScreen.addEventListener('click', () => {
    playLoadingMusic(); // Ensure music can start on first click if blocked
    setTimeout(dismissLoading, 0);
  });
  document.addEventListener('keydown', () => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      playLoadingMusic();
      setTimeout(dismissLoading, 0);
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
