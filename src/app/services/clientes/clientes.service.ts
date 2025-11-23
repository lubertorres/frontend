import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ClientesResponse {
  ok: boolean;
  data: any[];
}

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  private apiUrl = 'http://127.0.0.1:8000/api/clientes';

  constructor(private http: HttpClient) { }

  obtenerClientes() {
    return this.http.get<ClientesResponse>('http://localhost:8000/api/clientes');
  }

  crearCliente(payload: any) {
    return this.http.post(this.apiUrl, payload);
  }
}

