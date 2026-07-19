import { buildTelLink, buildSmsLink, getPhoneNumber, getEmail } from '../lib/contactLinks';

export function mountFooter(container: HTMLElement): void {
  const footer = document.createElement('footer');
  footer.className = 'bg-ink text-white py-12';

  footer.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Logo & About -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <img src="/assets/images/logo/black_llamas.jpeg" alt="Black Llama Tours and Travels" class="h-10 w-auto">
          </div>
          <p class="text-slate text-sm leading-relaxed">
            Your trusted local partner for exploring the wonders of Nepal. From Himalayan treks to cultural heritage tours, we craft unforgettable experiences.
          </p>
        </div>
        
        <!-- Contact Info -->
        <div>
          <h4 class="font-display text-lg mb-4">Contact</h4>
          <div class="space-y-2 text-sm">
            <p class="text-slate">Saatghumti, Thamel, Kathmandu, Nepal</p>
            <a href="${buildTelLink()}" class="text-slate hover:text-white transition-colors block">${getPhoneNumber()}</a>
            <a href="mailto:${getEmail()}" class="text-slate hover:text-white transition-colors block">${getEmail()}</a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div>
          <h4 class="font-display text-lg mb-4">Quick Links</h4>
          <div class="space-y-2 text-sm">
            <a href="#about" class="text-slate hover:text-white transition-colors block">About Us</a>
            <a href="#tours" class="text-slate hover:text-white transition-colors block">Tours & Packages</a>
            <a href="#gallery" class="text-slate hover:text-white transition-colors block">Gallery</a>
            <a href="#contact" class="text-slate hover:text-white transition-colors block">Contact</a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-slate/20 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-slate text-sm mb-4 md:mb-0">
          © ${new Date().getFullYear()} Black Llama Tours and Travels. All rights reserved.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-slate hover:text-white transition-colors" aria-label="Facebook">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
            </svg>
          </a>
          <a href="#" class="text-slate hover:text-white transition-colors" aria-label="Instagram">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
            </svg>
          </a>
          <a href="#" class="text-slate hover:text-white transition-colors" aria-label="WhatsApp">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.47,15.71c-.29-.15-1.71-.84-1.97-.94-.27-.09-.47-.14-.66.15-.2.29-.76.94-.94,1.13-.17.2-.35.22-.64.07a12.71,12.71,0,0,1-3.73-2.29c-1.36-1.21-2.27-2.71-2.54-3-.26-.31-.03-.48.11-.62.11-.11.25-.27.37-.41s.17-.25.25-.42.08-.31-.04-.45-.66-1.59-.91-2.18-.24-.57-.49-.49-.66.02-.75.06a1.35,1.35,0,0,0-.49.23,3.08,3.08,0,0,0-.95,1.44,5.33,5.33,0,0,0,1.1,5.66,23.87,23.87,0,0,0,9.14,4.54c.63.24,1.19.36,1.67.31.51-.05,1.71-.7,1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.2-.55-.35ZM12.05,20.59h0a9.83,9.83,0,0,1-5.28-1.54l-.38-.22-3.94,1,.05-.4L3.9,16.3A9.86,9.86,0,0,1,2.18,12,9.82,9.82,0,0,1,12.05,2.18,9.82,9.82,0,0,1,21.92,12,9.82,9.82,0,0,1,12.05,20.59ZM12.05,0A12,12,0,0,0,0,12a11.89,11.89,0,0,0,1.6,6l-1.6,5.86L6,22.32A11.95,11.95,0,0,0,12.05,24,12,12,0,0,0,24,12,12,12,0,0,0,12.05,0Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `;

  container.appendChild(footer);
}
