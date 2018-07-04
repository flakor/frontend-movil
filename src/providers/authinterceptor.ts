// AuthInterceptor.ts
import { Injectable } from '@angular/core';

//...some imports...
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
   constructor() {}

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       // Get the auth header from your auth service.
       const authToken =  localStorage.getItem('myToken');
       const authReq = req.clone({headers: req.headers.set('Authorization', `${authToken}`)});
        // console.log('authReq')
        // console.log(authReq)
       return next.handle(authReq);
   }
}
