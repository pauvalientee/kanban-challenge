import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = { email: '', password: '' };
  errorMessage = '';

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        this.router.navigate(['/kanban']);
      },
      error: (err) => {
        this.errorMessage = 'Email o contraseña incorrectos.';
      }
    });
  }

  loginAsGuest() {
    const guestCredentials = {
      email: 'admin@test.com',
      password: '123'
    };

    this.authService.login(guestCredentials).subscribe({
      next: (res) => {
        this.router.navigate(['/kanban']);
      },
      error: (err) => {
        this.errorMessage = 'El usuario de prueba no está disponible.';
      }
    });
  }
}
