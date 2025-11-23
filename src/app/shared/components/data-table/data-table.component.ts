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
  @Output() onDelete = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();

  editar(row: any) { this.onEdit.emit(row); }
  eliminar(row: any) { this.onDelete.emit(row); }

}
