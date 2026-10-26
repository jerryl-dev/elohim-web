import { Component, inject } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  styleUrl: './account.css'
})
export class Account {
  protected readonly auth = inject(AuthService);
}