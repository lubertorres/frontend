import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];

  @Input() isLoading: boolean = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<any>();

  eliminar(id: number) {
    this.onDelete.emit(id);
    console.log('Eliminar ID:', id);
  }

  editar(row: any) {
    this.onEdit.emit(row);
  }

}
