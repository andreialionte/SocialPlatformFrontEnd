import { CacheService } from './../../services/caching/cache.service';
import { HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest, HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  // only cache get requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // attempt to retrieve the cached response
  const cachedResponse = cacheService.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  // proceed with the http req and cache the response
  return next(req).pipe(
    tap((event: HttpEvent<any>) => {
      // cache the response if it is an httpresponse
      if (event.type === HttpEventType.Response) {
        cacheService.put(req.url, event);
      }
    })
  );
};



