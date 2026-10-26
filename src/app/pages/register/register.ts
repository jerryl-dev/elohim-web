import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private readonly auth = inject(AuthService);

  protected fullName = '';
  protected email = '';
  protected password = '';

  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');
  protected readonly loading = signal(false);

  protected onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.loading.set(true);

    this.auth.register(this.fullName, this.email, this.password).subscribe({
      next: user => {
        this.loading.set(false);
        this.successMessage.set(`Account created. Welcome, ${user.fullName}!`);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 409) {
          this.errorMessage.set('That email is already registered. Try logging in.');
        } else if (err.status === 400) {
          this.errorMessage.set('Please check your details and try again.');
        } else {
          this.errorMessage.set('Something went wrong. Please try again.');
        }
      }
    });
  }
}