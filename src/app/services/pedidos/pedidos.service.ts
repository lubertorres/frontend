import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface PedidoDetalle {
  detallePedidoID?: number;
  productoID: number;
  productoNombre?: string;
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
}

export interface Pedido {
  pedidoID?: number;
  clienteID?: number;
  clienteIdentificacion: string;
  clienteNombres?: string;
  clienteApellidos?: string;
  fechaPedido?: string;
  estado?: string;
  total?: number | string;
  detalles: PedidoDetalle[];
}


@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiRegistrar = 'http://localhost:8000/api/pedidos/completo';
  private apiListar = 'http://localhost:8000/api/pedidos';

  constructor(private http: HttpClient) { }

  registrarPedido(payload: any): Observable<any> {
    return this.http.post(this.apiRegistrar, payload);
  }

  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<{ ok: boolean; data: Pedido[] }>(this.apiListar)
      .pipe(map(resp => resp.data));
  }

  eliminarPedido(id: string | number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/pedidos/${id}`);
  }

  editarPedido(id: string | number, payload: any): Observable<any> {
    return this.http.put(`http://localhost:8000/api/pedidos/${id}`, payload);
  }

  cambiarEstado(pedidoID: number, estado: string) {
    return this.http.put(`http://localhost:8000/api/pedidos/estado/${pedidoID}`, {
      estado
    });
  }

  filtrarPedidos(filtros: any): Observable<{ ok: boolean; data: any[] }> {
    let params = new HttpParams();

    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<{ ok: boolean; data: any[] }>(
      `${this.apiListar}/filtrar`,
      { params }
    );
  }
}
