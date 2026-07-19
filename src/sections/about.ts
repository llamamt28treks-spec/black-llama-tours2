export function mountAbout(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'about-section py-16 sm:py-24 bg-snow';

  section.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="font-display text-3xl sm:text-4xl md:text-5xl text-ink mb-6">
          About Black Llama Tours
        </h2>
        <div class="w-20 h-1 bg-accent mx-auto mb-8"></div>
        <p class="text-slate text-lg leading-relaxed mb-6">
          Based in the heart of Thamel, Kathmandu, Black Llama Tours and Travels is your trusted local partner for exploring the wonders of Nepal. We're not just tour operators—we're passionate travelers who call this magnificent country home.
        </p>
        <p class="text-slate text-lg leading-relaxed mb-8">
          From the towering peaks of the Everest region to the tranquil lakes of Pokhara, from the ancient temples of Kathmandu Valley to the wildlife-rich jungles of Chitwan, we craft experiences that connect you deeply with Nepal's natural beauty and rich cultural heritage.
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div class="bg-surface p-6 rounded-xl">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg text-ink mb-2">Local Expertise</h3>
            <p class="text-slate text-sm">Based in Kathmandu with deep knowledge of every destination</p>
          </div>
          <div class="bg-surface p-6 rounded-xl">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg text-ink mb-2">Licensed & Insured</h3>
            <p class="text-slate text-sm">Fully licensed tour operator with comprehensive insurance</p>
          </div>
          <div class="bg-surface p-6 rounded-xl">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="font-display text-lg text-ink mb-2">Personalized Service</h3>
            <p class="text-slate text-sm">Custom itineraries tailored to your preferences and budget</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);
}
