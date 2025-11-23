import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private api = 'http://localhost:8000/api/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos() {
    return this.http.get<any[]>(this.api);
  }
}
