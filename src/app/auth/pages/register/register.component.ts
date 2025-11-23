import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  mensaje = '';
  cargando = false;

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    if (!this.nombre || !this.email || !this.password) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.authService.register(this.nombre, this.email, this.password)
      .subscribe({
        next: (resp) => {
          if (resp.codigoRespuesta === 0) {
            this.mensaje = 'Registro exitoso ✔';

            // Guardar token
            localStorage.setItem('token', resp.data?.token);

            // Redirigir al login o dashboard
            setTimeout(() => this.router.navigate(['/login']), 1000);
          } else {
            this.mensaje = resp.mensaje;
          }
          this.cargando = false;
        },
        error: (e) => {
          this.mensaje = 'Error al comunicarse con el servidor';
          this.cargando = false;
        }
      });
  }
}
