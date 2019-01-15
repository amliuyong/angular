import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {AppState} from '../../store/app.reducers';
import {Store} from '@ngrx/store';
import {Signup, TrySignup} from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.singupUser(email, password);

    console.log('dispatch: TrySignup');
    this.store.dispatch(new TrySignup(
      {username:email, password: password}));

  }
}
