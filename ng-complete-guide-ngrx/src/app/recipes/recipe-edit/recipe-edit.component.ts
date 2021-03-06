import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('editMode:' + this.editMode);
      this.initForm();
    });
  }


  private initForm() {
    let recipeName = '';
    let recipImagePath = '';
    let recipDescription = '';

    let recipeIngredients = new FormArray([]);


    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipImagePath = recipe.imagePath;
      recipDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }

    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipImagePath, Validators.required),
        'description': new FormControl(recipDescription, Validators.required),
        'ingredients': recipeIngredients
      }
    );
  }

  onSubmit() {
    console.log('editMode:' + this.editMode);
    console.log(this.recipeForm);

    //  http://img3.imgtn.bdimg.com/it/u=2571441832,4098450639&fm=200&gp=0.jpg

    /*
    const name = this.recipeForm.value['name'];
    const imagePath = this.recipeForm.value['imagePath'];
    const description = this.recipeForm.value['description'];
    const ingredients = this.recipeForm.value['ingredients'];
    const newRecipe = new Recipe(name, description, imagePath, ingredients);
   */

    const newRecipe: Recipe = this.recipeForm.value;
    console.log('newRecipe', newRecipe);

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.router.navigate(['../'], {relativeTo: this.route});


  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    const ingredients: FormArray = <FormArray>this.recipeForm.get('ingredients');
    ingredients.removeAt(index);

  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
