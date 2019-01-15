import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppState} from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {AuthState} from '../auth/store/auth.reducers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs-compat/add/operator/map';
import 'rxjs-compat/add/operator/take';

@Injectable({
    providedIn: 'root'
  }
)
export class AuthInteceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.select('auth')
      .take(1)
      .switchMap(
      (authState: AuthState) => {
        const copiedReq = req.clone({
          params: req.params.set('auth', authState.token)
        });

        console.log("set params auth:", authState.token);
        return next.handle(copiedReq);
      }
    );
  }
}
