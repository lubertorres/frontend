import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { PedidosService } from '../../services/pedidos/pedidos.service';

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
  mostrarModal = false;

  nuevo = {
    clienteID: '',
    detallesJSON: ''
  };

  columnas = [
    { key: 'pedidoID', label: 'ID Pedido' },
    { key: 'clienteFK', label: 'Cliente' },
    { key: 'fechaPedido', label: 'Fecha' },
    { key: 'total', label: 'Total' }
  ];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe({
      next: (resp) => {
        this.pedidos = resp;
      },
      error: (err) => console.error(err)
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  registrarPedido() {
    const payload = {
      ClienteID: Number(this.nuevo.clienteID),
      DetallesJSON: this.nuevo.detallesJSON
    };

    this.pedidosService.registrarPedido(payload).subscribe({
      next: (resp) => {
        alert('Pedido registrado con éxito');
        this.cerrarModal();
        this.cargarPedidos();
        this.nuevo = { clienteID: '', detallesJSON: '' };
      },
      error: (err) => alert('Error: ' + err.error.error)
    });
  }
}
