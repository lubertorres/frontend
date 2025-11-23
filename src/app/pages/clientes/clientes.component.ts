import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes/clientes.service';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    DataTableComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  mostrarModal = false;
  editando = false; // ⚡ Para saber si estamos editando

  nuevo = {
    clienteID: 0,
    nombres: '',
    apellidos: '',
    identificacion: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  columns = [
    { label: 'ID', key: 'clienteID' },
    { label: 'Identificación', key: 'identificacion' },
    { label: 'Nombres', key: 'nombres' },
    { label: 'Apellidos', key: 'apellidos' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'telefono' },
    { label: 'Dirección', key: 'direccion' },
    { label: 'Fecha Registro', key: 'fechaRegistro' },
    { label: 'Estado', key: 'estado' },
  ];

  data: any[] = [];
  isLoading = false;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.isLoading = true;
    this.clientesService.obtenerClientes().subscribe({
      next: (resp) => {
        this.data = resp.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error obteniendo clientes:', err);
        this.isLoading = false;
      }
    });
  }

  // ⚡ Registrar o actualizar según editando
  registrarCliente() {
    if (this.editando) {
      // Actualizar
      this.clientesService.actualizarCliente(this.nuevo).subscribe({
        next: (resp: any) => {
          alert('Cliente actualizado correctamente');
          this.cerrarModal();
          this.obtenerClientes();
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el cliente');
        }
      });
      return;
    }

    // Insertar
    this.clientesService.crearCliente(this.nuevo).subscribe({
      next: (resp) => {
        alert('Cliente registrado correctamente');
        this.cerrarModal();
        this.obtenerClientes();
      },
      error: (err) => {
        console.error('Error registrando cliente:', err);
        alert('Error al registrar cliente');
      }
    });
  }

  eliminarCliente(row: any) {
    if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;

    this.clientesService.eliminarCliente(row.id).subscribe({
      next: (resp: any) => {
        alert(resp.mensaje);
        this.obtenerClientes();
      },
      error: (err) => {
        console.error(err);
        alert('Error al eliminar el cliente');
      }
    });
  }

  abrirModal() {
    this.editando = false;
    this.nuevo = {
      clienteID: 0,
      nombres: '',
      apellidos: '',
      identificacion: '',
      email: '',
      telefono: '',
      direccion: ''
    };
    this.mostrarModal = true;
  }

  abrirEdicion(cliente: any) {
    this.editando = true;
    this.nuevo = { ...cliente };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.editando = false;
    this.nuevo = {
      clienteID: 0,
      nombres: '',
      apellidos: '',
      identificacion: '',
      email: '',
      telefono: '',
      direccion: ''
    };
  }
}
