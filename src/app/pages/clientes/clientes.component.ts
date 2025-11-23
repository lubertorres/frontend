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

  nuevo = {
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
  ];

  data: any[] = [];
  isLoading = false;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clientesService.obtenerClientes().subscribe({
      next: (resp) => {
        this.data = resp.data;
        console.log('Clientes obtenidos:', this.data);
      },
      error: (err) => {
        console.error('Error obteniendo clientes:', err);
      }
    });
  }


  registrarCliente() {
    this.clientesService.crearCliente(this.nuevo).subscribe({
      next: (resp) => {
        console.log('Cliente creado:', resp);

        this.nuevo = {
          nombres: '',
          apellidos: '',
          identificacion: '',
          email: '',
          telefono: '',
          direccion: ''
        };
        console.log('Cliente creado:', this.nuevo.toString());

        this.cerrarModal();
        this.obtenerClientes();
      },
      error: (err) => {
        console.error('Error registrando cliente:', err);
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
