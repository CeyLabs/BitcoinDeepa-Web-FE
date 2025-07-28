export const FB_PIXEL_ID = '1818035272112095';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export const fbEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};
