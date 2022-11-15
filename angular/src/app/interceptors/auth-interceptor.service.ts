import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {​​catchError}​​ from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(public auth:AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any>
  {  ​
    const token = localStorage.getItem('token');
    if (token) 
    {​​
      const cloned = req.clone({​​
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      }​​);
      return next.handle(cloned).pipe(catchError((error: HttpErrorResponse) => {​​
        if (error.status === 401) {​​
          this.auth.logout();
        }​​
        return throwError(error);
      }​​));
    }​​ else {​​
      return next.handle(req);
    }​​
  }​​
}
