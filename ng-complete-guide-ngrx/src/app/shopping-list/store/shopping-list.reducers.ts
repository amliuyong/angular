import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS, AddIngredient, AddIngredients,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT, STOP_EDIT,
  UPDATE_INGREDIENT
} from './shopping-list.actions';


export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomato', 15),
    new Ingredient('Orange', 25),

  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {

  switch (action.type) {
    case ADD_INGREDIENT:
      const act1: AddIngredient = <AddIngredient>action;
      return {
        ...state,
        ingredients: [...state.ingredients, act1.payload]
      };

    case ADD_INGREDIENTS:
      const act2: AddIngredients = <AddIngredients>action;

      return {
        ...state,
        ingredients: [...state.ingredients, ...act2.payload]
      };

    case UPDATE_INGREDIENT:
      // @ts-ignore
      console.log('UPDATE_INGREDIENT payload:', action.payload);
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        // @ts-ignore
        ...action.payload.ingredient,

      };

      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case DELETE_INGREDIENT:
      const oldingredients = [...state.ingredients];
      oldingredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    case START_EDIT:
      // @ts-ignore
      const editedIngredient = {...state.ingredients[<number>action.payload]};
      console.log('START_EDIT', editedIngredient);
      return {
        ...state,
        editedIngredient: editedIngredient,
        // @ts-ignore
        editedIngredientIndex: <number>action.payload
      };

    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    default :
      return state;
  }
}
