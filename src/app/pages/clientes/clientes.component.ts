import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { FormsModule } from '@angular/forms'; // para ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  mostrarModal = false;

  nuevo = {
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: ''
  };

  clientes: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    // luego conectas con el servicio
    this.clientes = [];
  }

  registrarCliente() {
    console.log('Nuevo cliente:', this.nuevo);
  }
  
  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

}
