import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Animate hero entrance
 */
export function animateHeroEntrance(): void {
  if (prefersReducedMotion()) return;

  const timeline = gsap.timeline();
  
  timeline
    .from('.hero-headline', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
    })
    .from(
      '.hero-subheadline',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.4'
    )
    .from(
      '.hero-cta',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );
}

/**
 * Animate section scroll reveal
 */
export function animateSectionReveal(sectionClass: string): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    sectionClass,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionClass,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animate tour cards with stagger
 */
export function animateTourCards(): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.tour-card',
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.tours-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animate filter tag transitions
 */
export function animateFilterChange(): void {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll('.tour-card');
  
  cards.forEach((card) => {
    const isVisible = (card as HTMLElement).style.display !== 'none';
    
    if (isVisible) {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.to(card, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
  });
}

/**
 * Animate floating buttons entrance
 */
export function animateFloatingButtons(): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.floating-contact',
    {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: 'body',
        start: 'top 10%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animate gallery images
 */
export function animateGallery(): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.gallery-item',
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.gallery-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animate trust signals
 */
export function animateTrustSignals(): void {
  if (prefersReducedMotion()) return;

  gsap.fromTo(
    '.trust-signal',
    {
      opacity: 0,
      x: -20,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.trust-signals',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Initialize all scroll animations
 */
export function initScrollAnimations(): void {
  if (prefersReducedMotion()) return;

  // Animate sections on scroll
  const sections = ['.about-section', '.tours-section', '.gallery-section', '.why-book-section', '.contact-section'];
  sections.forEach((section) => {
    animateSectionReveal(section);
  });

  // Animate specific components
  animateTourCards();
  animateGallery();
  animateTrustSignals();
  animateFloatingButtons();
}
