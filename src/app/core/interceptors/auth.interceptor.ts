import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const StorageServices = inject(StorageService);
  const token = StorageServices.getLocalStorage('token');

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en la peticion', error);

      if (error.status === 401) {
        authService.getToken().subscribe((token) => {
          authService.setTokenLocalStorage(token, token);
        });
      }

      if (error.status === 504) {
        console.log(`Error 504 ${error.status}`);
      }

      return throwError(() => error);
    })
  );
};
