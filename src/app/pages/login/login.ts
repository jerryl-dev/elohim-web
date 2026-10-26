import { Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected password = '';
  protected readonly errorMessage = signal('');
  protected readonly loading = signal(false);

  protected onSubmit(): void {
    this.errorMessage.set('');
    this.loading.set(true);

    this.auth.login(this.email, this.password).subscribe({
         next: () => {
        this.loading.set(false);
        this.router.navigate(['/account']);
      },
      
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.errorMessage.set(
          err.status === 401
            ? 'Wrong email or password.'
            : 'Something went wrong. Please try again.'
        );
      }
    });
  }
}