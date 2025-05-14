import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { StorageService } from '../../services/storage/storage.service';
import { PetServices } from '../../services/pets/pets.service';
import { CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SkeletonCardMascotas } from './components/card-skeleton/card-skeleton.component';
import { BorderTopComponent } from '../../components/border-top/border-top.component';
import Swal from 'sweetalert2';
import {
  ResponseConfirmPlanPet,
  BodyRequestConfirmPlanPet,
} from '../../services/pets/pets.models';
@Component({
  selector: 'app-mascotas',
  imports: [
    NavbarComponent,
    SkeletonCardMascotas,
    CurrencyPipe,
    BorderTopComponent,
    CommonModule
  ],
  templateUrl: './mascotas.component.html',
  styleUrl: './mascotas.component.css',
})
export class MascotasComponent {
  dataResponse!: ResponseConfirmPlanPet;
  isLoading: boolean = true;

  RutesService = inject(Router);
  StorageService = inject(StorageService);
  PetsServives = inject(PetServices);

  ngOnInit(): void {
    this.getDataPlanConfirmPet();
  }

  changePLan(id_pet: string): void {
  
    this.RutesService.navigateByUrl(`/cotizacion/${id_pet}`);
  }

  editPlanAddicionales() {
    this.RutesService.navigateByUrl('/');
  }

  deletePlanOfPet(id_pet: string) {
    Swal.fire({
      title: 'ATENCIÓN',
      imageUrl: 'images/campana.png',
      text: '¿Estas seguro que deseas borrar a este peludito?',
      showCancelButton: true,
      confirmButtonText: 'CONFIRMAR',
      cancelButtonText: 'CANCELAR',
      customClass: {
        popup: 'popover',
        title: 'title font-extrabold',
        confirmButton: 'btn-yellow',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteRight(id_pet);
      } else if (result.isDismissed) {
        // Acción si se presiona "No, cancelar" o se cierra
        
      }
    });
  }

  finishClose() {
    Swal.fire({
      imageUrl: 'icons/circle-ex.svg',
      imageHeight: '120px',
      imageWidth: '120px',
      title: '¿Seguro qué deseas salir?',
      text: `El progreso realizado se perderá permanentemente`,
      confirmButtonText: "CANCELAR",
      cancelButtonText: 'SALIR',
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: 'popover',
        title: 'font-extrabold text-dark-blue font-bold title-bold',
        confirmButton: 'btn-yellow-custom',
        cancelButton:"button-border-primary-custom",
        actions: "flex flex-row justify-center"
      },
    }).then((result) => {
      if(result.dismiss){
        this.RutesService.navigateByUrl("/")
      }
    })
  }

  deleteRight(id_pet: string) {
    this.PetsServives.deletePet(id_pet, '1.0.0').subscribe((response) => {
      if (response.responseCode === 200) {
        Swal.fire({
          title: 'ATENCIÓN',
          text: `LA MASCOTA AH SIDO ELIMINADA CON EXITO`,
          confirmButtonText: 'CONFIRMAR',
          imageUrl: 'images/campana.png',
          confirmButtonAriaLabel: 'CONFIRMAR',
          customClass: {
            popup: 'popover',
            title: 'title font-extrabold',
            confirmButton: 'btn-yellow',
          },
        });
      }
    });
  }

  getDataPlanConfirmPet() {
    const body: BodyRequestConfirmPlanPet = {
      front_version: '1.0.0',
      id_managment: this.StorageService.getLocalStorage('id_managment') || '',
    };

    this.PetsServives.confirmPlansConfirmPet(body).subscribe((response) => {
      if (response.responseCode === 200) {
        null
        if (response.data.length === 0) {
          this.dataResponse = response;
          this.isLoading = false;
        } else {
          this.dataResponse = response;
          this.isLoading = false;
        }
      }
    });
  }
}
