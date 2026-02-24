import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  newUser = {
    username: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.newUser).subscribe({
      next: (res) => {
        this.successMessage = '¡Cuenta creada con éxito! Redirigiendo al login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error detallado:', err);
        this.errorMessage = err.error?.message || 'Error al crear la cuenta. Inténtalo de nuevo.';
      }
    });
  }
}
