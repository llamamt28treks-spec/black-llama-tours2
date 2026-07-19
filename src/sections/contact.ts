import { buildTelLink, buildSmsLink, getPhoneNumber, getEmail } from '../lib/contactLinks';
import { mountInquiryForm } from '../components/inquiryForm';

export function mountContact(container: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'contact-section py-16 sm:py-24 bg-snow';

  section.innerHTML = `
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="font-display text-3xl sm:text-4xl md:text-5xl text-ink mb-4">
          Contact Us
        </h2>
        <p class="text-slate text-lg max-w-2xl mx-auto">
          Get in touch to start planning your Nepal adventure
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Contact Info & Map -->
        <div class="space-y-8">
          <div class="bg-surface rounded-xl p-6 shadow-sm">
            <h3 class="font-display text-xl text-ink mb-4">Get in Touch</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p class="font-medium text-ink">Address</p>
                  <p class="text-slate text-sm">Saatghumti, Thamel, Kathmandu, Nepal</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p class="font-medium text-ink">Phone</p>
                  <a href="${buildTelLink()}" class="text-slate text-sm hover:text-accent transition-colors">${getPhoneNumber()}</a>
                </div>
              </div>
              
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p class="font-medium text-ink">Email</p>
                  <a href="mailto:${getEmail()}" class="text-slate text-sm hover:text-accent transition-colors">${getEmail()}</a>
                </div>
              </div>
            </div>
            
            <div class="flex gap-3 mt-6">
              <a href="${buildTelLink()}" class="flex-1 bg-accent text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center min-h-[48px] flex items-center justify-center">
                Call Now
              </a>
              <a href="${buildSmsLink()}" class="flex-1 bg-glacier text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center min-h-[48px] flex items-center justify-center">
                Send SMS
              </a>
            </div>
          </div>
          
          <!-- Google Map -->
          <div class="bg-surface rounded-xl overflow-hidden shadow-sm h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0575!2d85.3079!3d27.7152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcf0c0e9e9%3A0x6b3c8c8c8c8c8c8c!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style="border:0;"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Black Llama Tours and Travels location in Thamel, Kathmandu"
            ></iframe>
          </div>
        </div>
        
        <!-- Inquiry Form -->
        <div id="inquiry-form-container"></div>
      </div>
    </div>
  `;

  container.appendChild(section);

  // Mount inquiry form
  const formContainer = section.querySelector('#inquiry-form-container') as HTMLElement;
  mountInquiryForm(formContainer);
}
