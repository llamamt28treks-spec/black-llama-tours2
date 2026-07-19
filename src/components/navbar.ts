import { buildTelLink, buildSmsLink } from '../lib/contactLinks';

export function mountNavbar(container: HTMLElement): void {
  const nav = document.createElement('nav');
  nav.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent';
  nav.id = 'navbar';

  nav.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#hero" class="flex items-center space-x-2">
          <img src="/assets/images/logo/black_llamas.jpeg" alt="Black Llama Tours and Travels" class="h-10 w-auto">
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#about" class="text-ink hover:text-accent transition-colors text-sm font-medium">About</a>
          <a href="#tours" class="text-ink hover:text-accent transition-colors text-sm font-medium">Tours</a>
          <a href="#gallery" class="text-ink hover:text-accent transition-colors text-sm font-medium">Gallery</a>
          <a href="#contact" class="text-ink hover:text-accent transition-colors text-sm font-medium">Contact</a>
        </div>

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-surface transition-colors" aria-label="Toggle menu">
          <svg class="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="md:hidden hidden bg-surface border-t border-line">
        <div class="px-4 py-4 space-y-3">
          <a href="#about" class="block text-ink hover:text-accent transition-colors py-2 text-sm font-medium">About</a>
          <a href="#tours" class="block text-ink hover:text-accent transition-colors py-2 text-sm font-medium">Tours</a>
          <a href="#gallery" class="block text-ink hover:text-accent transition-colors py-2 text-sm font-medium">Gallery</a>
          <a href="#contact" class="block text-ink hover:text-accent transition-colors py-2 text-sm font-medium">Contact</a>
          <div class="pt-3 border-t border-line space-y-2">
            <a href="${buildTelLink()}" class="block w-full text-center bg-accent text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity min-h-[44px] flex items-center justify-center">
              Call Now
            </a>
            <a href="${buildSmsLink()}" class="block w-full text-center bg-glacier text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity min-h-[44px] flex items-center justify-center">
              Send SMS
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(nav);

  // Mobile menu toggle
  const mobileMenuBtn = nav.querySelector('#mobile-menu-btn') as HTMLButtonElement;
  const mobileMenu = nav.querySelector('#mobile-menu') as HTMLDivElement;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });

  // Navbar background transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('bg-surface/95', 'backdrop-blur-md', 'shadow-sm');
      nav.classList.remove('bg-transparent');
    } else {
      nav.classList.remove('bg-surface/95', 'backdrop-blur-md', 'shadow-sm');
      nav.classList.add('bg-transparent');
    }
  });
}
