import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-border-top',
  imports: [],
  templateUrl: './border-top.component.html',
  styleUrl: './border-top.component.css'
})
export class BorderTopComponent {
  @Input() Path : string = "icons"
  @Input() NameFile: string = "dog-log.svg"
}
