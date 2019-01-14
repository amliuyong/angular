import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {RecipesRoutingModule} from '../recipes/recipes-routing.module';
import {RecipesModule} from '../recipes/recipes.module';

// @Injectable({
//   providedIn: 'root'
// })

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
    return this.auth.isAuthenticated();
  }
}
