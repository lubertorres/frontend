import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() visible = false;
  @Input() title: string = 'Modal';
  @Input() width: string = '500px';

  @Output() close = new EventEmitter<void>();

  cerrar() {
    this.close.emit();
  }
}
