import {Injectable} from '@angular/core';

import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  singupUser(email: string, password: string) {
    const credentials = {
      email,
      password
    };
    localStorage.setItem(email, JSON.stringify(credentials));
    console.log('AuthService signup: ' + email);

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));

  }

  signinUser(email: string, password: string) {
    const credentials = JSON.parse(localStorage.getItem(email));

    if (credentials && credentials.password === password) {
      console.log(email + ' sgined in');
      this.token = 'SING_IN_LOCAL';

      this.router.navigate(['/']);
      return true;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
          console.log(res);
          firebase.auth().currentUser.getIdToken().then(
            tk => this.token = tk
          );
        }
      )
      .catch(error => console.log(error));

    return false;
  }


  getToke() {
    firebase.auth().currentUser.getIdToken().then(
      tk => this.token = tk
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }


  logout() {
    this.token = null;
    this.router.navigate(['/signin']);
    firebase.auth().signOut();
  }

}
