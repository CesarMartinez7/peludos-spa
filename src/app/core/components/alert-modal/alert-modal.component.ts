import { Component, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-alert-modal',
  imports: [CommonModule],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css',
})
export class AlertModalComponent {
  @Input() message: string = 'Alerta Default';
  @Input() title: string = 'Default Title';
  @Input() show: boolean = false;
  @Output() close = new EventEmitter();
  @Input() haveImage: boolean = true
  @Input() imageSrc : string = ""
  @Input() stringInnerHtml : string = ""

  closeAlert(): void {
    console.log("Hola en")
    this.close.emit();
  }
}
