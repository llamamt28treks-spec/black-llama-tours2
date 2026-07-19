import { tours } from '../data/tours';
import { Destination, TourType } from '../types/tour';
import { renderTourCard } from '../components/tourCard';
import { mountFilterBar } from '../components/filterBar';
import { animateFilterChange } from '../lib/animations';

export function mountTours(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'tours';
  section.className = 'tours-section py-16 sm:py-24 bg-surface';

  section.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Tours & Packages
        </h2>
        <p class="text-slate text-lg max-w-2xl mx-auto">
          Explore our carefully crafted tour packages showcasing the best of Nepal
        </p>
      </div>
      
      <div id="filter-container"></div>
      
      <div id="tours-grid" class="tours-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      </div>
    </div>
  `;

  container.appendChild(section);

  const filterContainer = section.querySelector('#filter-container') as HTMLElement;
  const toursGrid = section.querySelector('#tours-grid') as HTMLElement;

  // Render all tour cards initially
  tours.forEach((tour) => {
    const card = renderTourCard(tour);
    toursGrid.appendChild(card);
  });

  // Mount filter bar
  mountFilterBar(filterContainer, (selectedDestinations, selectedTypes) => {
    filterTours(toursGrid, selectedDestinations, selectedTypes);
    animateFilterChange();
  });

  function filterTours(grid: HTMLElement, selectedDestinations: Set<Destination>, selectedTypes: Set<TourType>): void {
    const cards = grid.querySelectorAll('.tour-card');
    
    cards.forEach((card) => {
      const cardDestinations = ((card as HTMLElement).dataset.destinations || '').split(',') as Destination[];
      const cardTypes = ((card as HTMLElement).dataset.types || '').split(',') as TourType[];
      
      const matchesDestination = selectedDestinations.size === 0 || 
        cardDestinations.some(dest => selectedDestinations.has(dest));
      
      const matchesType = selectedTypes.size === 0 || 
        cardTypes.some(type => selectedTypes.has(type));
      
      if (matchesDestination && matchesType) {
        (card as HTMLElement).style.display = 'block';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  }
}
