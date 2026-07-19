const PHONE_NUMBER = '+9779861242810';
const EMAIL = 'llamamt.28treks@gmail.com';

/**
 * Build a tel: link for click-to-call functionality
 */
export function buildTelLink(): string {
  return `tel:${PHONE_NUMBER}`;
}

/**
 * Build an sms: link for click-to-SMS functionality
 */
export function buildSmsLink(): string {
  return `sms:${PHONE_NUMBER}`;
}

/**
 * Build an SMS link with a prefilled inquiry body
 * Note: Using ?body= instead of &body= for broader iOS/Android compatibility
 */
export function buildInquirySmsLink(name: string, tour: string, date: string, message: string): string {
  const body = `Hi, I'm ${name}, interested in ${tour} around ${date}. ${message}`;
  return `sms:${PHONE_NUMBER}?body=${encodeURIComponent(body)}`;
}

/**
 * Build a mailto: link with prefilled subject and body
 */
export function buildMailtoLink(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Get the raw phone number for display purposes
 */
export function getPhoneNumber(): string {
  return PHONE_NUMBER;
}

/**
 * Get the raw email for display purposes
 */
export function getEmail(): string {
  return EMAIL;
}
