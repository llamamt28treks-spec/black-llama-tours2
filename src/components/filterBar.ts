import { Destination, TourType } from '../types/tour';

const DESTINATIONS: Destination[] = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Everest Region',
  'Lumbini',
  'Nagarkot',
  'Bhaktapur/Patan',
  'Annapurna',
  'Mustang',
  'Bardia',
];

const TOUR_TYPES: TourType[] = [
  'Cultural & Heritage',
  'Adventure & Trekking',
  'Wildlife Safari',
  'Honeymoon',
  'Spiritual/Pilgrimage',
  'Family-Friendly',
  'Luxury',
];

export function mountFilterBar(container: HTMLElement, onFilterChange: (selectedDestinations: Set<Destination>, selectedTypes: Set<TourType>) => void): void {
  const filterBar = document.createElement('div');
  filterBar.className = 'mb-8';

  filterBar.innerHTML = `
    <div class="mb-6">
      <h3 class="text-sm font-semibold text-ink mb-3">Filter by Destination</h3>
      <div class="flex flex-wrap gap-2" id="destination-filters">
        ${DESTINATIONS.map(dest => `
          <button
            data-destination="${dest}"
            class="filter-tag px-3 py-2 text-xs font-medium rounded-full border border-line text-slate hover:border-accent hover:text-accent transition-all min-h-[44px] min-w-[44px]"
            aria-label="Filter by ${dest}"
          >
            ${dest}
          </button>
        `).join('')}
      </div>
    </div>
    <div>
      <h3 class="text-sm font-semibold text-ink mb-3">Filter by Tour Type</h3>
      <div class="flex flex-wrap gap-2" id="type-filters">
        ${TOUR_TYPES.map(type => `
          <button
            data-type="${type}"
            class="filter-tag px-3 py-2 text-xs font-medium rounded-full border border-line text-slate hover:border-accent hover:text-accent transition-all min-h-[44px] min-w-[44px]"
            aria-label="Filter by ${type}"
          >
            ${type}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  container.appendChild(filterBar);

  const selectedDestinations = new Set<Destination>();
  const selectedTypes = new Set<TourType>();

  const destinationButtons = filterBar.querySelectorAll('[data-destination]');
  const typeButtons = filterBar.querySelectorAll('[data-type]');

  destinationButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const dest = btn.getAttribute('data-destination') as Destination;
      
      if (selectedDestinations.has(dest)) {
        selectedDestinations.delete(dest);
        btn.classList.remove('bg-accent', 'text-white', 'border-accent');
        btn.classList.add('border-line', 'text-slate');
      } else {
        selectedDestinations.add(dest);
        btn.classList.add('bg-accent', 'text-white', 'border-accent');
        btn.classList.remove('border-line', 'text-slate');
      }
      
      onFilterChange(selectedDestinations, selectedTypes);
    });
  });

  typeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type') as TourType;
      
      if (selectedTypes.has(type)) {
        selectedTypes.delete(type);
        btn.classList.remove('bg-accent', 'text-white', 'border-accent');
        btn.classList.add('border-line', 'text-slate');
      } else {
        selectedTypes.add(type);
        btn.classList.add('bg-accent', 'text-white', 'border-accent');
        btn.classList.remove('border-line', 'text-slate');
      }
      
      onFilterChange(selectedDestinations, selectedTypes);
    });
  });
}
