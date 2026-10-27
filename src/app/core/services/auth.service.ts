import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

import { UserResponse } from '../models/user.model';

const AUTH_URL = '/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly currentUser = signal<UserResponse | null>(null);

  register(fullName: string, email: string, password: string): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${AUTH_URL}/register`, { fullName, email, password })
      .pipe(tap(user => this.currentUser.set(user)));
  }

  login(email: string, password: string): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${AUTH_URL}/login`, { email, password })
      .pipe(tap(user => this.currentUser.set(user)));
  }

  refresh(): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${AUTH_URL}/refresh`, {})
      .pipe(tap(user => this.currentUser.set(user)));
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${AUTH_URL}/logout`, {})
      .pipe(tap(() => this.currentUser.set(null)));
  }

  getMe(): Observable<UserResponse> {
    return this.http
      .get<UserResponse>('/api/users/me')
      .pipe(tap(user => this.currentUser.set(user)));
  }

  restoreSession(): Observable<UserResponse | null> {
    return this.getMe().pipe(catchError(() => of(null)));
  }
}