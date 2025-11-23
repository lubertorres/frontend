// src/app/services/pedidos/pedidos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PedidoDetalle {
  detallePedidoID?: number;
  productoID: string;
  productoNombre?: string;
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
}

export interface Pedido {
  pedidoID?: string;
  clienteID?: string;
  clienteIdentificacion: string;
  clienteNombres?: string;
  clienteApellidos?: string;
  fechaPedido?: string;
  estado?: string;
  total?: string;
  detalles: PedidoDetalle[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiRegistrar = 'http://localhost:8000/api/pedidos/completo';
  private apiListar = 'http://localhost:8000/api/pedidos';

  constructor(private http: HttpClient) {}

  registrarPedido(payload: any): Observable<any> {
    return this.http.post(this.apiRegistrar, payload);
  }

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<{ ok: boolean; data: Pedido[] }>(this.apiListar)
      .pipe(map(resp => resp.data));
  }
}
