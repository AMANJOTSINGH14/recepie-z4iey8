import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recepie } from '../recepie.model';
import { recepieservice } from '../recepie.service';

@Component({
  selector: 'app-recipestarted',
  templateUrl: './recipestarted.component.html',
  styleUrls: ['./recipestarted.component.css']
})
export class RecipestartedComponent implements OnInit,OnDestroy {
tr=false
  recipeS:Recepie[]=[]
  hh:Subscription
  constructor(private recipe:recepieservice) { }

  ngOnInit():void {
    this.recipeS=this.recipe.getRecipe();
    if(this.recipeS===[]){
      this.tr=false
    }
    if(this.recipeS){
      this.tr=true
    }
    this.hh=this.recipe.changed.subscribe(
      (data:Recepie[])=>{
   console.log(data)
        if(data===null){
     this.tr=false
     
     }else{
      this.tr=true;
     
     }
      }
    )
  }
ngOnDestroy(){
this.hh.unsubscribe()
}
}