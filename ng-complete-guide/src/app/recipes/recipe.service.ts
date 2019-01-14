import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
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
  ];

  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService) {
  }


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }


  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());

  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());

  }
}
