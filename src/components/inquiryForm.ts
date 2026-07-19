import { tours } from '../data/tours';
import { buildInquirySmsLink, buildMailtoLink } from '../lib/contactLinks';

export function mountInquiryForm(container: HTMLElement): void {
  const form = document.createElement('form');
  form.className = 'bg-surface rounded-xl p-6 shadow-sm';
  form.id = 'inquiry-form';

  const tourOptions = tours.map(tour => 
    `<option value="${tour.title}">${tour.title}</option>`
  ).join('');

  form.innerHTML = `
    <h3 class="font-display text-xl text-ink mb-4">Send an Inquiry</h3>
    <div class="space-y-4">
      <div>
        <label for="inquiry-name" class="block text-sm font-medium text-slate mb-1">Your Name</label>
        <input
          type="text"
          id="inquiry-name"
          name="name"
          required
          class="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-ink min-h-[44px]"
          placeholder="Enter your name"
        >
      </div>
      <div>
        <label for="inquiry-tour" class="block text-sm font-medium text-slate mb-1">Preferred Tour</label>
        <select
          id="inquiry-tour"
          name="tour"
          required
          class="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-ink min-h-[44px]"
        >
          <option value="">Select a tour</option>
          ${tourOptions}
        </select>
      </div>
      <div>
        <label for="inquiry-date" class="block text-sm font-medium text-slate mb-1">Preferred Date</label>
        <input
          type="date"
          id="inquiry-date"
          name="date"
          required
          class="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-ink min-h-[44px]"
        >
      </div>
      <div>
        <label for="inquiry-message" class="block text-sm font-medium text-slate mb-1">Message</label>
        <textarea
          id="inquiry-message"
          name="message"
          rows="4"
          required
          class="w-full px-4 py-3 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-ink resize-none"
          placeholder="Tell us about your travel plans..."
        ></textarea>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          class="flex-1 bg-accent text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity min-h-[44px] flex items-center justify-center"
        >
          Send via SMS
        </button>
        <button
          type="button"
          id="email-btn"
          class="flex-1 bg-glacier text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity min-h-[44px] flex items-center justify-center"
        >
          Email Instead
        </button>
      </div>
    </div>
  `;

  container.appendChild(form);

  // Handle SMS submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = (form.querySelector('#inquiry-name') as HTMLInputElement).value;
    const tour = (form.querySelector('#inquiry-tour') as HTMLSelectElement).value;
    const date = (form.querySelector('#inquiry-date') as HTMLInputElement).value;
    const message = (form.querySelector('#inquiry-message') as HTMLTextAreaElement).value;
    
    const smsLink = buildInquirySmsLink(name, tour, date, message);
    window.location.href = smsLink;
  });

  // Handle email submission
  const emailBtn = form.querySelector('#email-btn') as HTMLButtonElement;
  emailBtn.addEventListener('click', () => {
    const name = (form.querySelector('#inquiry-name') as HTMLInputElement).value;
    const tour = (form.querySelector('#inquiry-tour') as HTMLSelectElement).value;
    const date = (form.querySelector('#inquiry-date') as HTMLInputElement).value;
    const message = (form.querySelector('#inquiry-message') as HTMLTextAreaElement).value;
    
    const subject = `Tour Inquiry: ${tour}`;
    const body = `Hi, I'm ${name}, interested in ${tour} around ${date}.\n\n${message}`;
    
    const mailtoLink = buildMailtoLink(subject, body);
    window.location.href = mailtoLink;
  });
}
