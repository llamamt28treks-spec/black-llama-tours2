import { Tour } from '../types/tour';
import { buildTelLink, buildSmsLink } from '../lib/contactLinks';

export function renderTourCard(tour: Tour): HTMLElement {
  const card = document.createElement('div');
  card.className = 'tour-card bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1';
  card.dataset.id = tour.id;
  card.dataset.destinations = tour.destinations.join(',');
  card.dataset.types = tour.types.join(',');

  const typeBadges = tour.types.map(type => 
    `<span class="inline-block px-2 py-1 text-xs font-medium bg-glacier/10 text-glacier rounded-full">${type}</span>`
  ).join('');

  card.innerHTML = `
    <div class="relative h-48 overflow-hidden">
      <img src="${tour.image}" alt="${tour.title}" loading="lazy" class="w-full h-full object-cover">
      <div class="absolute top-3 right-3 flex flex-wrap gap-1">
        ${typeBadges}
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-display text-lg text-ink mb-2">${tour.title}</h3>
      <p class="text-slate text-sm mb-3 line-clamp-2">${tour.description}</p>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center text-slate text-sm">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          ${tour.duration}
        </div>
        <div class="flex items-center text-slate text-sm">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          ${tour.destinations[0]}
        </div>
      </div>
      <div class="flex gap-2">
        <a href="${buildTelLink()}" class="flex-1 bg-accent text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center min-h-[44px] flex items-center justify-center">
          Call
        </a>
        <a href="${buildSmsLink()}" class="flex-1 bg-glacier text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center min-h-[44px] flex items-center justify-center">
          SMS
        </a>
      </div>
    </div>
  `;

  return card;
}
