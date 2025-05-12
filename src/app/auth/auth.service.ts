import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface AuthResponse {
  responseCode: number;
  message: string;
  data: Array<{
    token: string;
    access_token: string;
    parametrics: Record<string, string>;
  }>;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://f74jiq3xx3.execute-api.us-east-1.amazonaws.com/dev/poliza/authorizer?front_version=1.0.0';

  constructor(private http: HttpClient) {}

  getToken(): Observable<string> {
    return this.http.get<AuthResponse>(this.apiUrl).pipe(
      map(response => {
        if (!response.data || response.data.length === 0) {
          throw new Error('No hay datos en la respuesta');
        }
        return response.data[0].token; 
      }),
      tap(token => this.setTokenLocalStorage("token", token)),
      catchError(error => {
        
        console.error('Error en login:', error);
        return throwError(() => new Error('Error al obtener token'));
      })
    );
  }
  

  getTokenAuth(){
    return this.http.get(this.apiUrl)
  }

  private saveLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }

  getTokenLocalStorage(name: string){
    return localStorage.getItem(name) || ""
  }

  setTokenLocalStorage(name: string, value: string){
    localStorage.setItem(name, value)
  }
  
}