import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.modal';
import { shoppinglistservice } from '../shopping-list/shoppinglist.service';
import { Recepie } from './recepie.model';
@Injectable()
export class recepieservice {
  recepieselected = new Subject<Recepie>();
  changed = new Subject<Recepie[]>();
  private recepies: Recepie[] = [
    // new Recepie('paneer da pakoda','swaad bada' , 'https://cdn.pixabay.com/photo/2020/03/13/20/16/paneer-tikka-4929034_960_720.jpg',
    // [new Ingrediant ('pakoda',5),
    // new Ingrediant ('french',1.5)
    // ]),
    // new Recepie('chicken','kithon shuru kraan' , 'https://cdn.pixabay.com/photo/2017/04/04/17/33/food-2202358__340.jpg',
    // [new Ingrediant ('meat',1),
    // new Ingrediant ('french',1.5)
    // ])
  ];
  constructor(private slservice: shoppinglistservice) {}
  getRecipe() {
    return this.recepies.slice();
  }
  getR(){
    return this.recepies;
  }
  onOverride(r: Recepie[]) {
    this.recepies = r;
    this.changed.next(this.recepies.slice());
  }
  getRecipes(index: number) {
    return this.recepies[index];
  }
  addingredienttoshoppinglist(ingrediants: Ingrediant[]) {
    this.slservice.addingredients(ingrediants);
  }
  onAddRecipe(recipe: Recepie) {
    this.recepies.push(recipe);
    this.changed.next(this.recepies.slice());
  }
  onUpdateRecipe(recipe: Recepie, index: number) {
    this.recepies[index] = recipe;
    this.changed.next(this.recepies.slice());
  }
  onDeleteRecipe(i: number) {
    this.recepies.splice(i, 1);
    this.changed.next(this.recepies.slice());
  }
  onEmptyRecipe() {
    this.recepies = [];
    this.changed.next(this.recepies.slice());
  }
}
