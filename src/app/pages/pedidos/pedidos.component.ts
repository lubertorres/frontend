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

  // Estado del formulario
  nuevo: Pedido = this.crearPedidoVacio();

  esSoloLectura = false;

  columnas = [
    { key: 'pedidoID', label: 'ID Pedido' },
    { key: 'clienteNombres', label: 'Cliente' },
    { key: 'fechaPedido', label: 'Fecha' },
    { key: 'total', label: 'Total' }
  ];

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.cargarPedidos();
    this.cargarProductos();
  }

  // ---------------------------------------
  // CREADORES
  // ---------------------------------------

  private crearPedidoVacio(): Pedido {
    return {
      clienteIdentificacion: '',
      detalles: []
    };
  }

  private crearDetalleVacio(): PedidoDetalle {
    return {
      productoID: 0,
      cantidad: 1,
      productoNombre: '',
      precioUnitario: 0,
      subtotal: 0
    };
  }

  // ---------------------------------------
  // CARGA DE DATOS
  // ---------------------------------------

  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe({
      next: (resp: Pedido[]) => this.pedidos = resp,
      error: (err: any) => console.error(err)
    });
  }

  cargarProductos() {
    this.productosService.obtenerProductos().subscribe({
      next: (resp: any) => {
        this.productos = resp.data.map((p: any) => ({
          ...p,
          productoID: String(p.productoID)  // 🔥 aseguramos STRING
        }));
      },
      error: (err: any) => console.error(err)
    });
  }

  // ---------------------------------------
  // MODAL
  // ---------------------------------------

  abrirModal() {
    this.esSoloLectura = false;

    // Asegurar que productos estén cargados antes del modal
    if (!this.productos.length) {
      this.cargarProductos();
    }

    this.nuevo = this.crearPedidoVacio();
    this.mostrarModal = true;
  }

  verDetalle(pedido: Pedido) {
    this.esSoloLectura = true;
    this.nuevo = { ...pedido };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  // ---------------------------------------
  // DETALLES
  // ---------------------------------------

  agregarDetalle() {
    this.nuevo.detalles.push(this.crearDetalleVacio());
  }

  eliminarDetalle(index: number) {
    this.nuevo.detalles.splice(index, 1);
  }

  trackByIndex(index: number) {
    return index;
  }

  // ---------------------------------------
  // REGISTRAR PEDIDO
  // ---------------------------------------

  registrarPedido() {
    const payload = {
      identificacion: this.nuevo.clienteIdentificacion,
      detalles: this.nuevo.detalles.map(d => ({
        productoID: String(d.productoID),
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

  editarPedido(pedido: any) {
    console.log("🔥 EDITAR EJECUTADO:", pedido);

    this.esSoloLectura = false;
    this.mostrarModal = true;

    this.nuevo = {
      pedidoID: Number(pedido.pedidoID),
      clienteID: Number(pedido.clienteID),
      clienteIdentificacion: pedido.clienteIdentificacion,
      clienteNombres: pedido.clienteNombres,
      clienteApellidos: pedido.clienteApellidos,
      detalles: pedido.detalles.map((d: any) => ({
        detallePedidoID: Number(d.detallePedidoID),
        productoID: Number(d.productoID),   // 🔥 FIX
        cantidad: Number(d.cantidad),       // 🔥 FIX
        precioUnitario: Number(d.precioUnitario),
        subtotal: Number(d.subtotal)
      }))
    };
  }

  eliminarPedido(row: any) {
    const id = row.pedidoID;

    console.log("ID enviado al backend:", id);

    this.pedidosService.eliminarPedido(id).subscribe({
      next: () => {
        alert("Pedido eliminado");
        this.cargarPedidos();
      },
      error: err => console.error(err)
    });
  }

  guardarPedido() {
    const payload = {
      detalles: this.nuevo.detalles.map(d => ({
        productoID: Number(d.productoID),
        cantidad: d.cantidad
      }))
    };

    // SI NO HAY pedidoID → ES NUEVO
    if (!this.nuevo.pedidoID) {
      this.registrarPedido();
      return;
    }

    // SI HAY pedidoID → EDITAR
    this.pedidosService.editarPedido(this.nuevo.pedidoID, payload).subscribe({
      next: () => {
        alert('Pedido actualizado correctamente');
        this.cerrarModal();
        this.cargarPedidos();
      },
      error: err => alert('Error actualizando: ' + err.error?.error)
    });
  }

}
