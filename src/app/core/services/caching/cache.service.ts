import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private cache: Map<string, HttpEvent<any>> = new Map();
  
  constructor() { }

  // Store the response in cache
  put(url: string, response: HttpEvent<any>): void {
    this.cache.set(url, response);
  }

  // Retrieve the cached response
  get(url: string): HttpEvent<any> | undefined {
    return this.cache.get(url);
  }

  // Clear the cache (optionally, you may not need this in your current scenario)
  clear(): void {
    this.cache.clear();
  }
}
