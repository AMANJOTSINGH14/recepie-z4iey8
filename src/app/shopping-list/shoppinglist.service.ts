
import { Subject } from 'rxjs';
import { Ingrediant } from '../shared/ingrediant.modal';
export class shoppinglistservice{
changed = new Subject<Ingrediant[]>();
startedEditing=new Subject<number>();
 private ingrediants:Ingrediant[] =[
  new Ingrediant('apple' , 5),
  new Ingrediant('oranges' , 10)
];
getingrediant(){
  return this.ingrediants;
}
getingrediantone(index:number){
  return this.ingrediants[index];

}
addingrediant(ingrediantss:Ingrediant){
  this.ingrediants.push(ingrediantss);
this.changed.next(this.ingrediants);
}
addingredients(ingreddiantss:Ingrediant[]){
  this.ingrediants.push(...ingreddiantss);
  this.changed.next(this.ingrediants)
}
updateIngredient(index:number,newIngredient:Ingrediant){
  this.ingrediants[index]=newIngredient;
  this.changed.next(this.ingrediants.slice())
}
onDeleteIndgrediant(index:number){
  this.ingrediants.splice(index,1)
this.changed.next(this.ingrediants.slice())
}
}