import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = "https://localhost:7037/api/auth"; // Ajusta tu puerto

  constructor(private http: HttpClient) {}

  // ============================
  //            LOGIN
  // ============================
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // ============================
  //          REGISTER
  // ============================
  register(nombre: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { nombre, email, password });
  }

  // ============================
  //         TOKEN STORAGE
  // ============================
  saveToken(token: string) {
    localStorage.setItem("auth_token", token);
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  logout() {
    localStorage.removeItem("auth_token");
  }

  isLogged(): boolean {
    return !!this.getToken();
  }
}
