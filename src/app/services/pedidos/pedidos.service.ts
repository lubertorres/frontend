import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private api = 'http://localhost:8000/api/pedidos/completo';

  constructor(private http: HttpClient) {}

  registrarPedido(payload: any): Observable<any> {
    return this.http.post(this.api, payload);
  }

  obtenerPedidos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/pedidos');
  }
}
