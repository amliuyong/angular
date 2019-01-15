import {Action} from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SINGUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN= 'SET_TOKEN';


export class TrySignup implements Action {
  type: string = TRY_SIGNUP;
  constructor(public payload: {username: string, password: string}) {}

}

export class Signup implements Action {
  type: string = SIGNUP;

}

export class Signin implements Action {
  type: string = SIGNIN;

}

export class Logout implements Action {
  type: string = LOGOUT;

}

export class SetToken implements Action {
  type: string = SET_TOKEN;
  constructor(public payload: string){

  }

}

export type AuthActions = Signup |Signin |Logout |SetToken | TrySignup;



