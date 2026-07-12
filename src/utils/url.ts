/**
 * Dynamic URL helper to auto-detect production domain and fall back to local dev or environment variables.
 */
export function getBaseUrl(): string {
  // Read configured environment variables if available
  const envUrl = (import.meta.env?.VITE_APP_URL as string) || (import.meta.env?.NEXT_PUBLIC_APP_URL as string);

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || 
                        hostname === '127.0.0.1' || 
                        hostname === '0.0.0.0' ||
                        hostname.startsWith('192.168.') || // Local network IP
                        hostname.startsWith('10.') ||
                        hostname.startsWith('172.');
                        
    if (isLocalhost && envUrl) {
      return envUrl.replace(/\/$/, '');
    }
    return window.location.origin;
  }
  
  return envUrl ? envUrl.replace(/\/$/, '') : 'http://localhost:5173';
}
