import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize Lenis smooth scrolling
 */
export function initSmoothScroll(): void {
  // Skip if user prefers reduced motion
  if (prefersReducedMotion()) {
    return;
  }

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    if (lenis) {
      lenis.raf(time);
    }
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/**
 * Scroll to a specific element
 */
export function scrollToElement(target: string | HTMLElement, offset: number = 0): void {
  if (prefersReducedMotion()) {
    // Fall back to native scroll
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }

  if (lenis) {
    if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        lenis.scrollTo(el as HTMLElement, { offset });
      }
    } else {
      lenis.scrollTo(target, { offset });
    }
  }
}

/**
 * Stop smooth scrolling (useful for cleanup)
 */
export function stopSmoothScroll(): void {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
