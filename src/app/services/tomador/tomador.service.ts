import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import ResponseGetTypeDocument from './tomador.models';
import { SetRequestBodyTomador } from './tomador.models';
import { ResponseBodyTomador } from './tomador.models';


@Injectable({
  providedIn: 'root'
})
export class TomadorService {

  HTTP = inject(HttpClient)

  private url = 'https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com/dev/get/parametrics?route=documents_type&front_version=1.0.0'; 
  private urlRequestTomador = "https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com/dev/check_sarlaft"

  getDocumentsTypes(){
    return this.HTTP.get<ResponseGetTypeDocument>(this.url)
  }

  setRequestTomador(body: SetRequestBodyTomador){
    return this.HTTP.post<ResponseBodyTomador>(this.urlRequestTomador, body)
  }

  constructor() { }
}
