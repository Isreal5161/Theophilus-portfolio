const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const revealItems = document.querySelectorAll('.reveal');
const designReel = document.querySelector('.design-reel');
const galleryGrid = document.querySelector('.gallery-grid');
const galleryDesigns = [
  '2a455ac44ea2c95e2a4b7e4b0a5f9c15.jpg',
  '3c0186db2ebbae81839501e52c50fbb9.jpg',
  '3cba3ea861be3f4dae9fc378ec583645.jpg',
  '6dddde9da9d017bf36e3a154fdc48980.jpg',
  '6fd5c24a5ce6accfff041e4ec4a7e17e.jpg',
  '08c6c16ec482ebf4c8c8e84f8dbacc0a.jpg',
  '9df674b4b97ad2a4ff126c49a2d3dc14.jpg',
  '33ed57e2d418da71c4fc0e1256d812e4.jpg',
  '36d4c024c5c386e27ce15ae3e0848ae2.jpg',
  '65a9f860849be3b274c799814068ce7b.jpg',
  '87e28165aa3062b491386226d7693b77.jpg',
  '263fa694522a2d22a4a0d8a13779795b.jpg',
  '287fdaa96f4fd96a1e319de4cafbec80.jpg',
  '311da81766a59c8364db4a500b49e5c3.jpg',
  '654adaaf764b0365f58b6d68d7ded714.jpg',
  '47368f7dd4708cf1326f4dabfea65640.jpg',
  '51475eb0e5906cec784a5606c1a2ab4f.jpg',
  '91512f4f5c7573f8b0e639241acc8319.jpg',
  '93702739e0c873536711dfa2739f392f.jpg',
  '3147336528af09171fb83565440e85ad.jpg',
  'WhatsApp Image 2026-10-09 at 9.51.35 AM (1).jpeg',
  'WhatsApp Image 2026-10-09 at 9.51.35 AM (2).jpeg',
  'WhatsApp Image 2026-10-09 at 9.51.35 AM.jpeg',
  'WhatsApp Image 2026-10-09 at 9.51.36 AM.jpeg',
  'a9c17f75c451dc0aa54fb2777f738cac.jpg',
  'b04c1675471e77d5c10bb5d285792fcd.jpg',
  'b9dcf31fdadaa9b0e6ae4985113a40d1.jpg',
  'be7281d4e6b243b27db0ab2d05c7c019.jpg',
  'c925e2e0fad62286a2cbd933b1d361fc.jpg',
  'd52b1928f5b2a7a975d740ac33818e31.jpg',
  'daf3892faa118e6797f22ba7c678e12b.jpg',
  'dcdbe121eedb3074a1573c6965f699a7.jpg',
  'e0550c2a23006d5c41250dc4f6dcace9.jpg',
  'f87c1fe278383fa011935b68c08201a8.jpg',
];

if (galleryGrid) {
  galleryDesigns.forEach((filename, index) => {
    const imagePath = `gallery-designs-images/${filename}`;
    const item = document.createElement('a');
    item.className = 'gallery-item';
    item.href = '#';
    item.dataset.image = imagePath;
    item.setAttribute('aria-label', `Open portfolio design ${index + 1}`);

    const image = document.createElement('img');
    image.src = imagePath;
    image.alt = `Portfolio design ${index + 1}`;
    image.loading = 'lazy';
    item.append(image);
    galleryGrid.append(item);
  });
}

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const closeLightboxButton = document.querySelector('.lightbox-close');

const setHeaderState = () => {
  if (window.scrollY > 16) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

setHeaderState();
window.addEventListener('scroll', setHeaderState);

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (designReel) {
  const slides = [...designReel.querySelectorAll('.design-reel-slide')];
  const currentCounter = designReel.querySelector('[data-reel-current]');
  const pauseButton = designReel.querySelector('[data-reel-toggle]');
  const previousButton = designReel.querySelector('[data-reel-prev]');
  const nextButton = designReel.querySelector('[data-reel-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let timer;
  let paused = reducedMotion.matches;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('active', slideIndex === activeIndex);
    });
    if (currentCounter) {
      currentCounter.textContent = String(activeIndex + 1).padStart(2, '0');
    }
  };

  const stopAutoplay = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (!paused && !reducedMotion.matches) {
      timer = window.setInterval(() => showSlide(activeIndex + 1), 3600);
    }
  };

  const updatePauseButton = () => {
    if (pauseButton) {
      pauseButton.textContent = paused ? 'Play' : 'Pause';
      pauseButton.setAttribute('aria-pressed', String(paused));
    }
  };

  previousButton?.addEventListener('click', () => showSlide(activeIndex - 1));
  nextButton?.addEventListener('click', () => showSlide(activeIndex + 1));
  pauseButton?.addEventListener('click', () => {
    paused = !paused;
    updatePauseButton();
    startAutoplay();
  });
  designReel.addEventListener('mouseenter', stopAutoplay);
  designReel.addEventListener('mouseleave', startAutoplay);
  designReel.addEventListener('focusin', stopAutoplay);
  designReel.addEventListener('focusout', (event) => {
    if (!designReel.contains(event.relatedTarget)) startAutoplay();
  });
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      paused = true;
      updatePauseButton();
    }
    startAutoplay();
  });

  updatePauseButton();
  startAutoplay();
}

if (galleryItems.length && lightbox && lightboxImage) {
  galleryItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const imageSrc = item.getAttribute('data-image');
      if (imageSrc) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('open');
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightboxImage.src = '';
  };

  closeLightboxButton?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));
