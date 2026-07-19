export function mountWhyBookWithUs(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'why-book';
  section.className = 'why-book-section py-16 sm:py-24 bg-surface';

  section.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Why Book With Us
        </h2>
        <p class="text-slate text-lg max-w-2xl mx-auto">
          We go above and beyond to make your Nepal experience unforgettable
        </p>
      </div>
      
      <div class="trust-signals grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">Local Expertise</h3>
            <p class="text-slate text-sm">Born and raised in Nepal, our guides know every trail, temple, and hidden gem</p>
          </div>
        </div>
        
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">24/7 Support</h3>
            <p class="text-slate text-sm">We're always available—call or SMS anytime, day or night</p>
          </div>
        </div>
        
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">Licensed Guides</h3>
            <p class="text-slate text-sm">All our guides are government-licensed and professionally trained</p>
          </div>
        </div>
        
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">Custom Itineraries</h3>
            <p class="text-slate text-sm">Flexible tours tailored to your interests, schedule, and budget</p>
          </div>
        </div>
        
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">Transparent Pricing</h3>
            <p class="text-slate text-sm">No hidden fees—what you see is what you pay</p>
          </div>
        </div>
        
        <div class="trust-signal flex items-start space-x-4 p-6 bg-snow rounded-xl">
          <div class="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <div>
            <h3 class="font-display text-lg text-ink mb-1">Sustainable Tourism</h3>
            <p class="text-slate text-sm">We support local communities and practice eco-friendly tourism</p>
          </div>
        </div>
      </div>
    </div>
  `;

  container.appendChild(section);
}
