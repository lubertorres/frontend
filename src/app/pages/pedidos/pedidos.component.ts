import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { PedidosService, Pedido, PedidoDetalle } from '../../services/pedidos/pedidos.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, DataTableComponent],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {

  pedidos: Pedido[] = [];
  productos: { productoID: string; nombre: string }[] = [];
  mostrarModal = false;

  // objeto usado para registrar o ver detalle
  nuevo: Pedido = {
    clienteIdentificacion: '',
    detalles: []
  };

  columnas = [
    { key: 'pedidoID', label: 'ID Pedido' },
    { key: 'clienteNombres', label: 'Cliente' },
    { key: 'fechaPedido', label: 'Fecha' },
    { key: 'total', label: 'Total' }
  ];

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarProductos();
  }

  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe({
      next: (resp: Pedido[]) => this.pedidos = resp,
      error: (err: any) => console.error(err)
    });
  }

  cargarProductos() {
    this.productosService.obtenerProductos().subscribe({
      next: (resp: any) => this.productos = resp.data,
      error: (err: any) => console.error(err)
    });
  }

  // Abrir modal para registrar pedido
  abrirModal() {
    this.nuevo = {
      clienteIdentificacion: '',
      detalles: []
    };
    this.mostrarModal = true;
  }

  // Abrir modal para ver detalle de un pedido existente
  verDetalle(pedido: Pedido) {
    this.nuevo = { ...pedido };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  agregarDetalle() {
    this.nuevo.detalles.push({
      productoID: '',
      cantidad: 1
    } as PedidoDetalle);
  }

  eliminarDetalle(index: number) {
    this.nuevo.detalles.splice(index, 1);
  }

  registrarPedido() {
    const payload = {
      identificacion: this.nuevo.clienteIdentificacion,
      detalles: this.nuevo.detalles.map(d => ({
        productoID: d.productoID,
        cantidad: d.cantidad
      }))
    };

    this.pedidosService.registrarPedido(payload).subscribe({
      next: () => {
        alert('Pedido registrado con éxito');
        this.cerrarModal();
        this.cargarPedidos();
      },
      error: (err: any) => alert('Error: ' + err.error?.error)
    });
  }

  // placeholders para editar/eliminar si quieres implementarlos
  editarPedido(pedido: Pedido) {
    alert('Función editar no implementada aún');
  }

  eliminarPedido(id?: string) {
    alert('Función eliminar no implementada aún');
  }
}
