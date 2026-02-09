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
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goToSlide(currentSlide + 1);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToSlide(currentSlide - 1);
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dot') && e.clientX > window.innerWidth / 2) {
    goToSlide(currentSlide + 1);
  } else if (!e.target.closest('.nav-dot') && e.clientX <= window.innerWidth / 2 && currentSlide > 0) {
    goToSlide(currentSlide - 1);
  }
});
