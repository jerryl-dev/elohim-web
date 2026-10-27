import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';

import { UserResponse } from '../models/user.model';
import { AuthService } from '../services/auth.service';

// Holds the refresh call while one is running, so simultaneous 401s share it.
let refreshInFlight: Observable<UserResponse> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthCall = req.url.startsWith('/api/auth/');

      if (error.status !== 401 || isAuthCall) {
        return throwError(() => error);
      }

      refreshInFlight ??= auth.refresh().pipe(
        finalize(() => (refreshInFlight = null)),
        shareReplay(1)
      );

      return refreshInFlight.pipe(
        catchError(() => {
          auth.currentUser.set(null);
          return throwError(() => error);
        }),
        switchMap(() => next(req))
      );
    })
  );
};