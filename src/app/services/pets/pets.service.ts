import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Response } from './pets.models';
import { RequestBodyPeludo } from './pets.models';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseAddSetPeludo } from './pets.models';
import { BodyRequestAddSetPlan } from './pets.models';
import { ResponseAsistenciasOpcionales } from '../../routes/asistencias-opcionales/models/asistencias-opcionales.model';
import { StorageService } from '../storage/storage.service';
import {
  BodyRequestConfirmPlanPet,
  ResponseConfirmPlanPet,
} from './pets.models';

interface ResponseSetPeludo {
  responseCode: number;
  message: string;
  data: Array<Data>;
}
interface Data {
  id_managment: string;
  id_pet: string;
}

interface GlobalResponse {
  responseCode: number
  message:string;
  data: unknown[]
}


@Injectable({
  providedIn: 'root',
})
export class PetServices {
  private apiUrl = 'https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com';
  private mod = '/dev';
  StorageService = inject(StorageService);

  HTTP = inject(HttpClient);
  getRacePet() {
    const DinamicHeaders = new HttpHeaders({
      Authorization: `Bearer ${this.StorageService.getLocalStorage('token')}`,
      'Content-Type': 'application/json',
    });
    return this.HTTP.get<Response>(
      `${this.apiUrl}${this.mod}/get/parametrics?route=pets_races`,
      { headers: DinamicHeaders }
    );
  }

  setPeludo(body: RequestBodyPeludo): Observable<ResponseSetPeludo> {
    return this.HTTP.post<ResponseSetPeludo>(
      `${this.apiUrl}/${this.mod}/pets/set/peludo`,
      body
    );
  }

  setAddPetPlan(body: BodyRequestAddSetPlan): Observable<ResponseAddSetPeludo> {
    return this.HTTP.post<ResponseAddSetPeludo>(
      `${this.apiUrl}${this.mod}/pets/plans/add`,
      body
    );
  }

  getAsistenciasPersonales() {
    return this.HTTP.post<ResponseAsistenciasOpcionales>(
      `${this.apiUrl}${this.mod}/pets/get_assistances_by_plan`,
      {
        id_plan: Number(this.StorageService.getSessionStorage('plan_id')),
        front_version: '1.0.0',
      }
    );
  }

  confirmPlansConfirmPet(
    body: BodyRequestConfirmPlanPet
  ): Observable<ResponseConfirmPlanPet> {
    return this.HTTP.post<ResponseConfirmPlanPet>(
      `${this.apiUrl}${this.mod}/pets/plans/confirm`,
      body
    );
  }

  deletePet(id_pet: string, front_version: string) {
    return this.HTTP.post<GlobalResponse>(`${this.apiUrl}${this.mod}/pets/delete`, {
      id_pet,
      front_version,
    });
  }
}
