import {AuthActions, LOGOUT, SET_TOKEN, SetToken, SIGNIN, SIGNUP} from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;

}

const initalState: AuthState = {
  token: null,
  authenticated: false

};

export function authReducers(state = initalState, action: AuthActions) {

  if (action.type === SIGNIN || action.type === SIGNUP) {
    return {
      ...state,
      authenticated: true
    };
  } else if (action.type === LOGOUT) {
    return {
      ...state,
      token: null,
      authenticated: false
    };

  } else if (action.type === SET_TOKEN) {
    return {
      ...state,
      token: (<SetToken>action).payload
    }
  }

  else {
    return state;
  }

}
