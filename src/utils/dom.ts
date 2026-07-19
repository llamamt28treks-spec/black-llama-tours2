/**
 * Query selector helper
 */
export function qs<T extends Element>(selector: string, parent: Element | Document = document): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Query selector all helper
 */
export function qsa<T extends Element>(selector: string, parent: Element | Document = document): NodeListOf<T> {
  return parent.querySelectorAll<T>(selector);
}

/**
 * Create element helper
 */
export function createEl<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: Record<string, string>,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  
  if (textContent) {
    el.textContent = textContent;
  }
  
  return el;
}
