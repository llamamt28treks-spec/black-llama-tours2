import { buildTelLink, buildSmsLink } from '../lib/contactLinks';

export function mountHero(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-snow';

  section.innerHTML = `
    <div class="absolute inset-0 z-0">
      <img 
        src="/assets/images/hero/hero-himalaya-panorama.jpg" 
        alt="Himalayan mountain panorama" 
        class="w-full h-full object-cover"
        loading="eager"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-snow"></div>
    </div>
    
    <div class="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="hero-headline font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
        8 of the World's 10 Highest Peaks.<br>
        <span class="text-accent">One Underrated Country.</span>
      </h1>
      <p class="hero-subheadline text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
        Discover Nepal with Black Llama Tours and Travels. Your gateway to Himalayan adventures, cultural heritage, and unforgettable experiences.
      </p>
      <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center">
        <a href="${buildTelLink()}" class="bg-accent text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity min-h-[56px] flex items-center justify-center">
          Call Now
        </a>
        <a href="${buildSmsLink()}" class="bg-glacier text-white px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity min-h-[56px] flex items-center justify-center">
          Send SMS Inquiry
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  `;

  container.appendChild(section);
}
