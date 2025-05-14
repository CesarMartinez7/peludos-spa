import { Router } from '@angular/router';
import { QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetServices } from '../../services/pets/pets.service';
import { BodyRequestAddSetPlan } from '../../services/pets/pets.models';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { CardSkeletonComponent } from './skeletons/card-skeleton.component';
import { BorderTopComponent } from '../../components/border-top/border-top.component';
import { CardComponent } from './card/card.component';
import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { ResponseAsistenciasOpcionales } from './models/asistencias-opcionales.model';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-asistencias-opcionales',
  imports: [NavbarComponent, CommonModule, CardSkeletonComponent, BorderTopComponent, CardComponent],
  templateUrl: './asistencias-opcionales.component.html',
  styleUrl: './asistencias-opcionales.component.css',
})
export class AsistenciasOpcionalesComponent {
  @ViewChildren('card') cards!: QueryList<ElementRef<HTMLDivElement>>;
  isLoading = true;
  ROUTER = inject(Router);
  DataResponseAsistencias!: ResponseAsistenciasOpcionales;
  numerosArrayGenerator!: number[];
  saldoFinalPrueba: number = 0;
  paquetesSeleccionados: number[] = [];

  // Injectables
  PetServices = inject(PetServices);
  StorageServices = inject(StorageService)

  creacionAddPetPlan(): void {
    const urlTree = this.ROUTER.parseUrl(this.ROUTER.url)
    const body: BodyRequestAddSetPlan = {
      front_version: '1.0.0',
      id_managment: this.StorageServices.getSessionStorage("id_managment") || "",
      id_pet: urlTree.queryParams["id_pet"] || "",
      id_plan: Number(this.StorageServices.getSessionStorage("plan_id")),
      optional_assistances: JSON.parse(this.StorageServices.getSessionStorage('selected_plan') || ""),
    };

    this.PetServices.setAddPetPlan(body).subscribe((response) => {
      if (response.responseCode === 200) {
        console.log('Peticion ejecutada con exito');
        this.ROUTER.navigateByUrl("/mascotas")
      }
    });
  }

  ngOnInit() {
    this.numerosArrayGenerator = Array.from({ length: 4 }, (_, i) => i + 1);
    if (typeof window === 'undefined') {
      null
    } else {
      this.PetServices.getAsistenciasPersonales().subscribe((data) => {
        this.DataResponseAsistencias = data;
        this.isLoading = false;
      });
    }
  }


  

  totalPaquetesSeleccionados(monto: number, index: number, id_plan: number) {
    if (this.paquetesSeleccionados.includes(id_plan)) {
      this.paquetesSeleccionados = this.paquetesSeleccionados.filter(
        (n) => n !== id_plan
      );
      this.saldoFinalPrueba = this.saldoFinalPrueba - monto;
      return;
    } else {
      this.paquetesSeleccionados.push(id_plan);
      this.StorageServices.setSessionStorage("selected_plan", JSON.stringify(this.paquetesSeleccionados))
      this.saldoFinalPrueba = this.saldoFinalPrueba + monto;
    }
  }

  openTable(id: string | number) {
    const el = document.getElementById(`${id}`) as HTMLDivElement;
    el.classList.toggle('max-h-0');
    el.classList.toggle('max-h-[928px]');
  }

  redirectoNextRoute() {
    this.creacionAddPetPlan();

    // this.ROUTER.navigateByUrl(
    //   `nuevaruta/${localStorage.getItem('id_managment')}`
    // );
  }

  constructor() {}
}
