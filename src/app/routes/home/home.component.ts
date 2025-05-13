import {
  ElementRef,
  QueryList,
  Signal,
  viewChild,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import Swal from 'sweetalert2';
import { Sidebar2Component } from '../../components/sidebar2/sidebar2.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Component, inject, signal } from '@angular/core';
import { PetServices } from '../../services/pets/pets.service';
import { GetPdfService } from '../../services/pdf/get-pdf.service';
import { RequestBodyPeludo } from '../../services/pets/pets.models';
import { StorageService } from '../../services/storage/storage.service';
import { TomadorService } from '../../services/tomador/tomador.service';
import { coberturas, asistencias, asistenciasPersonales } from './layers';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import ResponseGetTypeDocument, {
  Data,
} from '../../services/tomador/tomador.models';
import { SetRequestBodyTomador } from '../../services/tomador/tomador.models';
import { DataResponseRaces, ObjectRace } from '../../services/pets/pets.models';
import { SelectCustomComponent } from './components/select-custom/select-custom.component';
import { SelectTypeDocument } from './components/select-TypeDocument/select-typedocument.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Form,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Sidebar2Component,
    SelectCustomComponent,
    SelectTypeDocument,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  privateUrlSetPeludo =
    'https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com/dev/pets/set/peludo';

  @ViewChild(Sidebar2Component, { static: false }) sidebar!: Sidebar2Component;
  @ViewChildren('bloque') bloques!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChild('listracepets') listapets!: ElementRef<HTMLDivElement>;
  @ViewChild('downloadebook') btndownloadebook!: ElementRef<HTMLAnchorElement>;

  pdfService = inject(GetPdfService);
  scrollingState = signal('activo');
  openArrow = signal(false);
  camposInvalidos: Record<string, boolean> = {};
  activate: boolean = false;
  authServices = inject(AuthService);
  tomadorServices = inject(TomadorService);
  typesDocument!: ResponseGetTypeDocument;
  asistencias = asistencias;
  asistenciasPersonales = asistenciasPersonales;
  coberturas = coberturas;

  typeEdadResponse = [
    { name: 'Mes', value: '21' },
    { name: 'Año', value: '22' },
  ];

  isCloseTypeEdadPets: boolean = true;
  valueIdTypePet!: boolean;
  nameTypeAge: string = '';

  racesPeTs!: DataResponseRaces[];
  isLoadingRacesPets: boolean = true;
  isCloseRacePets: boolean = true;
  valueIdRacePet!: number;
  nameRaceSelected: string = '';

  isCloseTypeDocument: boolean = true;
  nameDocumentSelected: string = '';
  valueIdTypeDocument!: number;

  // Instancia de formGroup para utilizar con el formBuild
  form: FormGroup;

  StorageService = inject(StorageService);
  HTTP = inject(HttpClient);
  RacesServices = inject(PetServices);
  isSendingData: boolean = false;
  isDownload: boolean = false;
  // Estados de la creacion de el peludo y la del usuario
  successCreatePet: boolean = false;
  successCheckSarlaft: boolean = false;

  ngOnInit(): void {
    this.scrolling();
    this.RacesServices.getRacePet().subscribe((data) => {
      this.isLoadingRacesPets = false;
      this.racesPeTs = data.data;
    });
    this.tomadorServices.getDocumentsTypes().subscribe((data) => {
      this.typesDocument = data;
    });
  }

  openSidebar() {
    console.log('Estamos en el home funciton');
    this.sidebar.openNav();
  }

  scrolling() {
    if (typeof window === undefined) {
      return;
    } else {
      window.addEventListener('scroll', () => {
        this.scrollingState.set('activo2');
        if (window.scrollY === 0) {
          this.scrollingState.set('activo');
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private route: Router) {
    this.form = fb.group({
      name: ['Dexter', [Validators.required, Validators.maxLength(200)]],
      type_pet: ['1', Validators.required],
      gender: ['14', Validators.required],
      type_age: ['', Validators.required],
      age: [3, [Validators.required, Validators.min(1)]],
      race: ['', Validators.required],
      first_name: ['Cesar', [Validators.required]],
      middle_name: ['Luis', [Validators.required]],
      last_name: ['Martinez', [Validators.required]],
      second_surname: ['Castro', Validators.required],
      type_document: ['', Validators.required],
      document: [
        '1043134886',
        [
          Validators.pattern('^[0-9]*$'),
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: [
        'cesarwamartinez@gmail.com',
        [Validators.required, Validators.email],
      ],
      auth_terminos: [false, Validators.requiredTrue],
      comunications: [false],
    });
  }

  actualizarTypeDocument(data: Data): void {
    const { id, name } = data;
    this.form.get('type_document')?.setValue(id);
    console.log(`Actualizando el documento ${id} ${name}`);
    this.valueIdTypeDocument = id;
    this.nameDocumentSelected = name;
    console.log(id, name);
  }

  actualizarTypeEdad(id_type_age: string, name: string) {
    this.form.get('type_age')?.setValue(id_type_age);
    this.nameTypeAge = name;
    this.isCloseTypeEdadPets = false;
  }

  actualizarRaza(data: ObjectRace): void {
    const { id_race, name } = data;
    this.form.get('race')?.setValue(id_race);
    this.valueIdRacePet = id_race;
    this.nameRaceSelected = name;
  }

  angleTop() {
    if (window.scrollY === 0) {
      return;
    } else {
      window.scrollBy({
        top: -1000,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  angleDown() {
    
      window.scrollBy({
        top: 1000,
        left: 0,
        behavior: 'smooth',
      });
    
  }

  onFocus(): void {
    if (this.isCloseRacePets) {
      this.isCloseRacePets = false;
    } else {
      this.isCloseRacePets = true;
    }
  }

  onFocusGetDocument() {
    if (this.isCloseTypeDocument) {
      this.isCloseTypeDocument = false;
    } else {
      this.isCloseTypeDocument = true;
    }
  }

  onFocusTypeAge() {
    if (this.isCloseTypeEdadPets) {
      console.log('open');
      this.isCloseTypeEdadPets = false;
    } else {
      console.log('close');
      this.isCloseTypeEdadPets = true;
    }
  }

  guardarRegistroTomador(callback: () => void): void {
    const body: SetRequestBodyTomador = {
      id_managment: localStorage.getItem('id_managment') || '',
      first_name: this.form.get('first_name')?.value,
      middle_name: this.form.get('middle_name')?.value,
      last_name: this.form.get('last_name')?.value,
      second_surname: this.form.get('second_surname')?.value,
      type_document: this.form.get('type_document')?.value,
      document: this.form.get('document')?.value,
      email: this.form.get('email')?.value,
      communications: this.form.get('comunications')?.value,
      front_version: '1.0.0',
    };

    this.tomadorServices.setRequestTomador(body).subscribe((response) => {
      if (response.responseCode !== 200) {
        Swal.fire({
          title: 'ATENCIÓN',
          text: `${response.message}`,
          confirmButtonText: 'ENTENDIDO',
          imageUrl: 'images/campana.png',
          customClass: {
            popup: 'popover',
            title: 'title font-extrabold',
            confirmButton: 'btn-yellow',
          },
        });
        return;
      }

      this.successCheckSarlaft = true;
      callback();
    });
  }

  // ✅ Funciona perfecto, la mejora seria a psar asincrono
  guardarRegistroPet(): void {
    this.isSendingData = true;
    if (this.isSendingData) {
      console.log('Se esta enviando, por favor espera');
      this.form.disable();
    }
    const body: RequestBodyPeludo = {
      name: this.form.get('name')?.value, // ✅
      type_pet: this.form.get('type_pet')?.value, // ✅
      gender: this.form.get('gender')?.value, // ✅
      type_age: this.form.get('type_age')?.value, // ✅
      age: this.form.get('age')?.value, // ✅
      race: this.form.get('race')?.value, //✅
      auth: this.form.get('auth_terminos')?.value,
      id_managment: '',
      front_version: '1.0.0', // ✅
    };
    this.RacesServices.setPeludo(body).subscribe({
      next: (response) => {
        this.authServices.setTokenLocalStorage(
          'id_managment',
          response.data[0].id_managment
        );
        this.authServices.setTokenLocalStorage(
          'id_pet',
          response.data[0].id_pet
        );

        this.successCreatePet = true;
        this.guardarRegistroTomador(() => {
          if (this.successCreatePet && this.successCheckSarlaft) {
            this.StorageService.setSessionStorage(
              'all_data',
              JSON.stringify(body)
            );
            this.route.navigateByUrl(
              `cotizacion/${localStorage.getItem('id_managment')}`
            );
          }
        });

        this.isSendingData = false;
        if (!this.isSendingData) {
          this.form.enable();
        }
      },
      error: (err) => {
        console.error('Error al guardar peludo', err);
        Swal.fire({
          title: 'Ouch,',
          text: `${err.error.message}`,
          imageHeight: '232px',
          imageWidth: '232px',
          confirmButtonText: 'CERRAR',
          imageUrl: 'images/PERRO-CONOv2.png',
          customClass: {
            popup: 'popover-icon-pelu',
            title: 'text-[#27d6eb] text-[64px]',
            confirmButton: 'btn-yellow',
            image: 'bg-[#27d6eb] rounded-full',
          },
        });
        this.isSendingData = false;
        if (!this.isSendingData) {
          this.form.enable();
        }
      },
    });
  }

  validarDataFormulario() {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.log(this.camposInvalidos['auth']);
      if (this.camposInvalidos['auth']) {
        Swal.fire({
          title: 'ATENCIÓN',
          text: 'Debe aceptar las politicas de datos',
          confirmButtonText: 'ENTENDIDO',
          imageUrl: 'images/campana.png',
          customClass: {
            popup: 'popover',
            title: 'title font-extrabold',
            confirmButton: 'btn-yellow',
          },
        });
      }

      if (this.camposInvalidos)
        this.camposInvalidos = this.obtenerInvalidControls2(this.form);
      Swal.fire({
        title: 'ATENCIÓN',
        text: 'Debe llenar correctamente todos los campos en rojo',
        confirmButtonText: 'ENTENDIDO',
        imageUrl: 'images/campana.png',
        customClass: {
          popup: 'popover',
          title: 'title font-extrabold',
          confirmButton: 'btn-yellow',
        },
      });
      return;
    }
    this.guardarRegistroPet();
  }

  saveAllDataSessionStorage() {
    console.log('Aqui guardar toda la data en el localStorage');
  }

  async cobertAsPdf() {
    this.isDownload = true;
    const btn = this.btndownloadebook.nativeElement;
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

  async getTypesDocuments() {
    this.tomadorServices.getDocumentsTypes().subscribe((data) => {
      this.typesDocument = data;
    });
  }

  obtenerInvalidControls2(formGroup: FormGroup) {
    const invalidosControls: Record<string, boolean> = {};
    Object.keys(formGroup.controls).forEach((llaveKey) => {
      const controladorKey = formGroup.get(llaveKey);
      if (controladorKey && controladorKey.invalid) {
        invalidosControls[llaveKey] = true;
      }
    });
    return invalidosControls;
  }

  openCoberturas2() {
    this.bloques.forEach((bloque) => {
      const el = bloque.nativeElement;
      el.classList.toggle('max-h-0');
      el.classList.toggle('max-h-[928px]');
    });
  }

  scrollTo(id: string = 'porque') {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
