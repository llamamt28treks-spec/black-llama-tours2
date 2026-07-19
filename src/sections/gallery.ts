export function mountGallery(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'gallery';
  section.className = 'gallery-section py-16 sm:py-24 bg-snow';

  const galleryImages = [
    { src: '/assets/images/gallery/gallery-rafting-trishuli.jpg', alt: 'White water rafting on Trishuli River' },
    { src: '/assets/images/gallery/gallery-mountain-flight-view.jpg', alt: 'Scenic mountain flight view of Himalayas' },
    { src: '/assets/images/gallery/gallery-sherpa-village.jpg', alt: 'Traditional Sherpa village in the mountains' },
    { src: '/assets/images/gallery/gallery-prayer-flags.jpg', alt: 'Colorful Buddhist prayer flags against mountains' },
  ];

  section.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Gallery
        </h2>
        <p class="text-slate text-lg max-w-2xl mx-auto">
          Glimpses of the incredible experiences that await you in Nepal
        </p>
      </div>
      
      <div class="gallery-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${galleryImages.map(img => `
          <div class="gallery-item relative overflow-hidden rounded-xl aspect-video">
            <img 
              src="${img.src}" 
              alt="${img.alt}" 
              loading="lazy"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            >
          </div>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(section);
}
