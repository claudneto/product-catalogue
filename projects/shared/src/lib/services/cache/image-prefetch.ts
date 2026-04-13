import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagePrefetchService {
  async prefetch(urls: string[]): Promise<void> {
    const uniqueUrls = [...new Set(urls.filter(Boolean))];

    await this.waitForServiceWorker();
    await Promise.allSettled(uniqueUrls.map((url) => fetch(url, { method: 'GET', mode: 'cors' })));
  }

  private async waitForServiceWorker(): Promise<void> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    try {
      await navigator.serviceWorker.ready;
    } catch {
      // If the service worker is unavailable, fall back to regular fetches.
    }
  }
}
