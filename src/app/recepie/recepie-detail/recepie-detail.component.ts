import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import{Recepie} from '../recepie.model';
import { recepieservice } from '../recepie.service';
@Component({
  selector: 'app-recepie-detail',
  templateUrl: './recepie-detail.component.html',
  
})
export class RecepieDetailComponent implements OnInit{
recpie:Recepie;
id:number;
  constructor(private recepieser:recepieservice , private route:ActivatedRoute , private router:Router) { }
onAddToShoppingList(){
this.recepieser.addingredienttoshoppinglist(this.recpie.ingrediants);
}
ngOnInit(){
this.route.params.subscribe(
  (params:Params) => {
    this.id = +params['id'];
this.recpie=this.recepieser.getRecipes(this.id);
  }
);
}
onDelete(){
  this.recepieser.onDeleteRecipe(this.id);
  this.router.navigate(['/recipes'])
}
onEdit(){
  this.router.navigate(['edit'] , {relativeTo:this.route});
}



}