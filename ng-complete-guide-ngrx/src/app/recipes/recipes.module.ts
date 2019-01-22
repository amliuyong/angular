import {NgModule} from '@angular/core';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducer} from './store/recipe.reducers';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent
  ],
  imports:[
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    StoreModule.forFeature('recipes', recipeReducer)
  ]
})
export class RecipesModule {

}
