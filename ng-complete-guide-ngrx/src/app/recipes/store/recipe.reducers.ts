import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

export interface FeatureState {
  recipes: RecipeState
}

export interface RecipeState {
  recipes: Recipe[];
}


const initalState: RecipeState = {

  recipes: [
    new Recipe('A Test Recipe 1',
      'This is a test recipe 1',
      'https://p9.pstatp.com/weili/l/254897547361124533.jpg',

      [
        new Ingredient('Meat', 1),
        new Ingredient('Egg', 2),
      ]),
    new Recipe('A Test Recipe 2',
      'This is a test recipe 2',
      'http://pic40.photophoto.cn/20160725/1190119144432166_b.jpg',
      [
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 5),
      ])
  ]
};


export function recipeReducer(state = initalState, action) {

}
