import './styles/base.css';
import { mountNavbar } from './components/navbar';
import { mountHero } from './sections/hero';
import { mountAbout } from './sections/about';
import { mountTours } from './sections/tours';
import { mountGallery } from './sections/gallery';
import { mountWhyBookWithUs } from './sections/whyBookWithUs';
import { mountContact } from './sections/contact';
import { mountFooter } from './sections/footer';
import { mountFloatingContactButtons } from './components/floatingContactButtons';
import { initSmoothScroll } from './lib/smoothScroll';
import { animateHeroEntrance, initScrollAnimations } from './lib/animations';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('App container not found');
    return;
  }

  // Mount navbar
  mountNavbar(app);

  // Mount sections in order
  mountHero(app);
  mountAbout(app);
  mountTours(app);
  mountGallery(app);
  mountWhyBookWithUs(app);
  mountContact(app);
  mountFooter(app);

  // Mount floating contact buttons
  mountFloatingContactButtons(app);

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize animations
  animateHeroEntrance();
  initScrollAnimations();
});
