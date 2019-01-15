import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {AppState} from '../store/app.reducers';
import {Store} from '@ngrx/store';
import {Logout, SetToken, Signin, Signup} from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private store: Store<AppState>
  ) {
  }

  singupUser(email: string, password: string) {
    const credentials = {
      email,
      password
    };
    localStorage.setItem(email, JSON.stringify(credentials));
    this.store.dispatch(new Signup());
    console.log('AuthService signup: ' + email);

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new Signup());

        }
      )
      .catch(error => console.log(error));

  }

  signinUser(email: string, password: string) {
    const credentials = JSON.parse(localStorage.getItem(email));

    if (credentials && credentials.password === password) {
      console.log(email + ' sgined in');
      const token = 'SING_IN_LOCAL';

      this.store.dispatch(new Signin());
      this.store.dispatch(new SetToken(token));

      this.router.navigate(['/']);
      return true;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
          console.log(res);
          this.store.dispatch(new Signin());

          firebase.auth().currentUser.getIdToken().then(
            tk => this.store.dispatch(new SetToken(tk))
          );
        }
      )
      .catch(error => console.log(error));

    return false;
  }


  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/signin']);
    firebase.auth().signOut();
  }

}
