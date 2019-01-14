import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
   url: string = '.../recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authServer: AuthService
             ) {
  }

  storeRecieps() {
    localStorage.setItem('recipes', JSON.stringify(this.recipeService.getRecipes()));
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  getRecipes() {
    const recipesRestored = JSON.parse(localStorage.getItem('recipes'));
    console.log("recipesRestored", recipesRestored);
    this.recipeService.setRecipes(recipesRestored);

    const token = this.authServer.getToke();

    const urlWithToken = this.url +"?auth="+token;
    console.log('getRecipes:', urlWithToken);
    this.http.get(urlWithToken)
      .subscribe(
        (res: Response) => {
          console.log('res', res);
          res.json().then(
            (recipes) => {
              console.log(recipes);
              this.recipeService.setRecipes(recipes);
            }).catch((err) => {
            console.log(err);
          });
        },
        (err) => {
          console.log('getRecipes error:', err);
        }
      );
  }
}
