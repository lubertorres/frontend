import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ProductosService } from '../../services/productos/productos.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    DataTableComponent
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  pedidos: any[] = [];
  productos: any[] = [];   // <<< productos para dropdown
  mostrarModal = false;

  nuevo = {
    clienteID: '',
    detalles: [] as { productoID: number; cantidad: number }[]
  };

  columnas = [
    { key: 'pedidoID', label: 'ID Pedido' },
    { key: 'clienteFK', label: 'Cliente' },
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
      next: (resp) => this.pedidos = resp,
      error: (err) => console.error(err)
    });
  }

  cargarProductos() {
    this.productosService.obtenerProductos().subscribe({
      next: (resp) => this.productos = resp,
      error: (err) => console.error(err)
    });
  }

  abrirModal() {
    this.nuevo = {
      clienteID: '',
      detalles: []   // Reinicia detalles
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  agregarDetalle() {
    this.nuevo.detalles.push({
      productoID: 0,
      cantidad: 1
    });
  }

  eliminarDetalle(index: number) {
    this.nuevo.detalles.splice(index, 1);
  }

  registrarPedido() {
    const payload = {
      ClienteID: Number(this.nuevo.clienteID),
      DetallesJSON: JSON.stringify(this.nuevo.detalles)
    };

    this.pedidosService.registrarPedido(payload).subscribe({
      next: () => {
        alert('Pedido registrado con éxito');
        this.cerrarModal();
        this.cargarPedidos();
      },
      error: (err) => alert('Error: ' + err.error?.error)
    });
  }
}
