import {NgModule} from '@angular/core';
import {SignupComponent} from './signup/signup.component';
import {FormsModule} from '@angular/forms';
import {SigninComponent} from './signin/signin.component';
import {AuthRoutingModule} from './auth.routing.moudle';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    FormsModule,
    AuthRoutingModule
  ]

})
export class AuthModule{}
