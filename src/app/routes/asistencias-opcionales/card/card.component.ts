import { Component, inject } from '@angular/core';
import { ResponseAsistenciasOpcionales } from '../models/asistencias-opcionales.model';
import { Daum } from '../models/asistencias-opcionales.model';
import { Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() asistencias!: Daum;
  @Input() paquetesSeleccionados!: number[];
  @Input() $index!: number;
  @Input() saldoFinalPrueba!: number;

  StorageServices = inject(StorageService);

  totalPaquetesSeleccionados(monto: number, index: number, id_plan: number) {
    console.log('Antes de empeza el proceso');
    console.log(sessionStorage);
    if (this.paquetesSeleccionados.includes(id_plan)) {
      this.paquetesSeleccionados = this.paquetesSeleccionados.filter(
        (n) => n !== id_plan
      );
      this.saldoFinalPrueba = this.saldoFinalPrueba - monto;
      this.StorageServices.setSessionStorage(
        'selected_plan',
        JSON.stringify(this.paquetesSeleccionados)
      );

      return;
    } else {
      this.paquetesSeleccionados = [...this.paquetesSeleccionados, id_plan];
      this.StorageServices.setSessionStorage(
        'selected_plan',
        JSON.stringify(this.paquetesSeleccionados)
      );
      this.saldoFinalPrueba = this.saldoFinalPrueba + monto;
    }
  }

  openTable(id: string | number) {
    const el = document.getElementById(`${id}`) as HTMLDivElement;
    el.classList.toggle('max-h-0');
    el.classList.toggle('max-h-[928px]');
  }
}
