import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly companyName = 'Elohim Computers';

  protected logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error('Logout failed', err),
    });
  }
}