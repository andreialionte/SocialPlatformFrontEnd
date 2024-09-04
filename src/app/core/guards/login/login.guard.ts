import { CanActivateFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  

  const isAuthenticated = authService.isAuthenticated();

  const requestedUrl = state.url;

  if (isAuthenticated) {
    if (requestedUrl === '/login' || requestedUrl === '/register' || requestedUrl === '/') {
      return router.createUrlTree(['/dashboard']);
    }
    // access to protected routes (/dashboard, /add-friend, /view-friend-requests)
    return true;
  } else {
    if (requestedUrl === '/dashboard' || requestedUrl === "/add-friend" || requestedUrl === "/view-friend-requests") {
      return router.createUrlTree(['/']);
    }
    // access to login/register pages
    return true;
  }
};
