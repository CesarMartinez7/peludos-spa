import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { response } from 'express';


export interface ResponsePdf {
  responseCode: number
  message: string
  data: Data[]
}

interface Data {
  file_name: string
  file: string
}

@Injectable({
  providedIn: 'root',
})
export class GetPdfService {
  private url =
    'https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com/dev/anexos/ebook?front_version=1.0.0';

  HTTP = inject(HttpClient);
  constructor() {}

  
  async obtenerPDF(): Promise<ResponsePdf | undefined> {
    return await this.HTTP.get<ResponsePdf>(this.url).toPromise();
  }
}
