import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- IMPORTANTE

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  mensaje = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.mensaje = "Intentando login...";

    this.auth.login(this.email, this.password).subscribe({
      next: (resp) => {
        this.auth.saveToken(resp.data.token);
        this.mensaje = "Login correcto ✔";

        // 🔥 Redireccionar a dashboard (pantalla después de login)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // 🔥 Mostrar SOLO el mensaje del backend
        this.mensaje = err.error?.mensaje || "Error desconocido";
      }
    });
  }
}
