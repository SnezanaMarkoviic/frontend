import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userDataRaw = localStorage.getItem('userData');

  if (!userDataRaw) {
    router.navigate(['/log-in']);
    return false;
  }

  const userData = JSON.parse(userDataRaw);
  const requiredRole = route.data?.['tip'];

  // Ako je ruta za određenu ulogu (npr. "kandidat" ili "regruter")
  if (requiredRole && userData.tip?.toLowerCase() !== requiredRole.toLowerCase()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};