import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { recepieservice } from '../recepie.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
  private router:Router,
    private route: ActivatedRoute,
    private recepieservice: recepieservice
  ) {}

  ngOnInit():void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initform();
    });
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(index);
  }
onAddIngrediants(){
  (<FormArray>this.recipeForm.get('ingrediants')).push(
    new FormGroup({
'name':new FormControl(null,Validators.required),
'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  )
}
onCancel(){
this.router.navigate(['../'],{relativeTo:this.route})
}
onSubmit(){
  if(this.editMode){
  this.recepieservice.onUpdateRecipe(this.recipeForm.value ,this.id);
}
else{
  this.recepieservice.onAddRecipe(this.recipeForm.value );
}
this.onCancel()
}
  private initform() {
    let recepieImgePath = '';
    let recepieDescription = '';
    let recipeName = '';
    let recipeIngrediant = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recepieservice.getRecipes(this.id);
      recipeName = recipe.name;
      recepieDescription = recipe.description
      recepieImgePath = recipe.imagePath;
      if (recipe.ingrediants) {
        for (let ingrediant of recipe.ingrediants) {
          recipeIngrediant.push(
            new FormGroup({
              name: new FormControl(ingrediant.name,Validators.required),
              amount: new FormControl(ingrediant.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );console.log(recipeIngrediant);
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagePath: new FormControl(recepieImgePath,Validators.required),
      description: new FormControl(recepieDescription,Validators.required),
      'ingrediants': recipeIngrediant
    });
  }
}
