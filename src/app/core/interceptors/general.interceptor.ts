import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';


@Injectable()
export class GeneralInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({ headers: new HttpHeaders(environment.headersObj) 
	});
    return next.handle(clonedRequest);
  }
}