import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { recepieservice } from '../recepie.service';
import { DeactivateguardService } from './deactivate-guard.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, DeactivateguardService {
  changed=false
  recepieImgePath = '';
  recepieDescription = '';
  recipeName = '';
  allowEdit = false;
  id: number;
  editMode = false;
  recipe:any
  recipeForm: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recepieservice: recepieservice
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initform();
    });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
  onAddIngrediants() {
    (<FormArray>this.recipeForm.get('ingrediants')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit() {
    this.changed=true
    if (this.editMode) {
      this.recepieservice.onUpdateRecipe(this.recipeForm.value, this.id);
    } else {
      this.recepieservice.onAddRecipe(this.recipeForm.value);
    }
    alert(' Kindly open dropdown and click "SAVE DATA" to confirm your save ')
    this.onCancel();
  }
  initform() {
    let recipeIngrediant = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recepieservice.getRecipes(this.id);
      this.recipeName = recipe.name;
      this.recepieDescription = recipe.description;
      this.recepieImgePath = recipe.imagePath;
      if (recipe.ingrediants) {
        for (let ingrediant of recipe.ingrediants) {
          recipeIngrediant.push(
            new FormGroup({
              name: new FormControl(ingrediant.name, Validators.required),
              amount: new FormControl(ingrediant.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
          console.log(recipeIngrediant);
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(this.recipeName, Validators.required),
      imagePath: new FormControl(this.recepieImgePath, Validators.required),
      description: new FormControl(
        this.recepieDescription,
        Validators.required
      ),
      ingrediants: recipeIngrediant
    });
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.recipeName,'ek')
    console.log(this.recipeForm.controls.ingrediants.dirty)
    if (
      (this.recepieImgePath !== this.recipeForm.value['imagePath'] ||
        this.recipeName !== this.recipeForm.value['name'] || this.recepieDescription!==this.recipeForm.value['description'] || this.recipeForm.controls.ingrediants.dirty)&& !this.changed
    ) {
      return confirm('do u want to save changes?');
    } 
    else {
      return true;
    }
  }
}
