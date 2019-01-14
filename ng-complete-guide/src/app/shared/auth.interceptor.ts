import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
  }
)
export class AuthInteceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const copiedReq = req.clone(
      {
       // headers: req.headers.append('Authorization', 'Bearer XXXX'),
        params: req.params.set('auth', this.authService.token)
      });
    console.log('Intercepted! copiedReq:', copiedReq);
    return next.handle(copiedReq);
  }
}
