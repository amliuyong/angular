import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AppState} from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {AuthState} from './store/auth.reducers';

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select('auth')
      .take(1)
      .map(
      (authState: AuthState) => authState.authenticated
    );

  }
}
