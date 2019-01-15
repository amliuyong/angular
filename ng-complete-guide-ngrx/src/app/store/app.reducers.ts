import {shoppingListReducer, ShoppingListState} from '../shopping-list/store/shopping-list.reducers';
import {authReducers, AuthState} from '../auth/store/auth.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  shoppingList: ShoppingListState,
  auth: AuthState
}


export const reducers : ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducers
}
