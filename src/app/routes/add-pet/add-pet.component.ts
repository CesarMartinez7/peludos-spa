import { Component, inject } from '@angular/core';
import { SelectTypeDocument } from '../home/components/select-TypeDocument/select-typedocument.component';
import { Validators } from '@angular/forms';
import { SelectCustomComponent } from '../home/components/select-custom/select-custom.component';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { DataResponseRaces } from '../../services/pets/pets.models';
import { CommonModule } from '@angular/common';
import { ObjectRace } from '../../services/pets/pets.models';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';
import { PetServices } from '../../services/pets/pets.service';
@Component({
  selector: 'app-add-pet',
  imports: [
    SelectCustomComponent,
    ReactiveFormsModule,
    CommonModule,
    NavbarComponent,
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css',
})
export class AddPetComponent {
  isCloseRacePets: boolean = true;
  isCloseTypeDocument: boolean = true;
  isCloseTypeEdadPets: boolean = true;

  valueIdTypePet!: boolean;
  nameTypeAge: string = '';

  racesPeTs!: DataResponseRaces[];
  isLoadingRacesPets: boolean = true;
  valueIdRacePet!: number;
  nameRaceSelected: string = '';

  form: FormGroup;

  RacesServices = inject(PetServices);

  ngOnInit(): void {
    this.RacesServices.getRacePet().subscribe((data) => {
      this.isLoadingRacesPets = false;
      this.racesPeTs = data.data;
    });
  }

  typeEdadResponse = [
    { name: 'Mes', value: '21' },
    { name: 'Año', value: '22' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['Dexter', [Validators.required, Validators.maxLength(200)]],
      type_pet: ['', Validators.required],
      gender: ['', Validators.required],
      type_age: ['', Validators.required],
      age: [3, [Validators.required, Validators.min(1)]],
      race: ['', Validators.required],
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
      null
      this.isCloseTypeEdadPets = false;
    } else {
  
      this.isCloseTypeEdadPets = true;
    }
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
}
