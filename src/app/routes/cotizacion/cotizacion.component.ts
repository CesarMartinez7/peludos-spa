import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment';
import { ResponseTable } from './models/planes.type';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetPdfService } from '../../services/pdf/get-pdf.service';
import { Component, ElementRef, inject, signal } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { LoadingTableComponent } from '../../components/loading-table/loading-table.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cotizacion',
  imports: [CommonModule, NavbarComponent, LoadingTableComponent],
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css'],
})
export class CotizacionComponent {
  @ViewChild('anchor') btndownload!: ElementRef<HTMLAnchorElement>;
  router = inject(Router);
  isLoading = true;
  selectedPlan = signal<boolean>(true);
  dataFinal!: ResponseTable;
  isDownload: boolean = false;
  isEstandar: boolean = true;
  ActivateRouter = inject(ActivatedRoute)
  pdfService = inject(GetPdfService);
  authService = inject(AuthService);
  HTTP = inject(HttpClient);
  StorageService = inject(StorageService);

  id_pet!: string | null

  ngOnInit(): void {
    this.getDataPlan();
    this.id_pet = this.ActivateRouter.snapshot.paramMap.get("id_pet")
  }

  constructor() {}

  getDataPlan(): void {
    const Headers = new HttpHeaders({
      Authorization: `Bearer ${this.StorageService.getLocalStorage('token')}`,
      'Content-Type': 'application/json',
    });

    this.HTTP.get<ResponseTable>(environment.urlPlans, {
      headers: Headers,
    }).subscribe({
      next: (data) => {
        this.dataFinal = data;
        this.isLoading = false;
      },
    });
  }

  changePlan() {
    this.selectedPlan.set(!this.selectedPlan());
  }

  verParametros(){
    const routerThree = this.router.parseUrl(this.router.url)
  }

  // ❌ Remplazar esto a sintaxis de angular.
  openTable(id: string) {
    const el = document.querySelector(`#${id}`) as HTMLDivElement;
    el.classList.toggle('max-h-0');
    el.classList.toggle('max-h-[928px]');
  }

  handleCLickSelectedPlanMouse(event: MouseEvent) {
    const element = event.target as HTMLDivElement;
    if (element.id !== 'selected') {
      this.isEstandar = false;
      this.StorageService.setSessionStorage('plan_id', '1');
    }
    if (element.id == '0') {
      this.isEstandar = true;
      this.StorageService.setSessionStorage('plan_id', '2');
    }
  }

  handleCLickBack() {
    window.history.back();
  }

  redirectToNext() {
    this.router.navigateByUrl(
      `/asistencias-opcionales/${this.StorageService.getSessionStorage(
        'id_managment'
      )}`
    );
  }

  async downloadPdf() {
    this.isDownload = true;
    const btn = this.btndownload.nativeElement;
    try {
      let response = await this.pdfService.obtenerPDF();
      if (response?.responseCode) {
        if (response?.data[0].file.startsWith('JVB')) {
          const base64 = 'data:application/pdf;base64,' + response.data[0].file;
          btn.href = base64;
          btn.download = response.data[0].file_name;
          btn.click();
          this.isDownload = false;
        }
      }
    } catch {
      throw 'Error en la peticion';
    }
  }
}
