import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import 'rxjs-compat/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  //@Effect()
  // authSignup = this.actions$.ofType(TRY_SIGNUP)
  //   .map((action: TrySignup) => {
  //     return action.payload;
  //   }).map(
  //     () => 'TrySignup_TOKEN'
  //   ).mergeMap(
  //     (token: string) => {
  //       console.log('AuthEffects token:', token);
  //       return [
  //         {
  //           type: SIGNUP
  //         },
  //         {
  //           type: SET_TOKEN,
  //           payload: token
  //         }
  //       ];
  //     }
  //   );

  constructor(private actions$: Actions) {

  }


}
