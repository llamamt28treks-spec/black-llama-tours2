import { buildTelLink, buildSmsLink } from '../lib/contactLinks';

export function mountFloatingContactButtons(container: HTMLElement): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'fixed bottom-6 right-6 z-40 flex flex-col gap-3 floating-contact';
  wrapper.style.paddingBottom = 'env(safe-area-inset-bottom, 24px)';

  wrapper.innerHTML = `
    <a href="${buildTelLink()}" class="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform min-w-[44px] min-h-[44px]" aria-label="Call us">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
    </a>
    <a href="${buildSmsLink()}" class="w-14 h-14 bg-glacier text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform min-w-[44px] min-h-[44px]" aria-label="Send SMS">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
    </a>
  `;

  container.appendChild(wrapper);
}
