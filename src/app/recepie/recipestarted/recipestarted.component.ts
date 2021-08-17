import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FALSE_STR } from 'zone.js/lib/common/utils';
import { Recepie } from '../recepie.model';
import { recepieservice } from '../recepie.service';

@Component({
  selector: 'app-recipestarted',
  templateUrl: './recipestarted.component.html',
  styleUrls: ['./recipestarted.component.css']
})
export class RecipestartedComponent implements OnInit {
  tr=false ;
  recipeS: Recepie[];
  hh: Subscription;
  constructor(private recipe: recepieservice) {}

  ngOnInit(): void {
this.recipeS=this.recipe.getRecipe();
if(this.recipeS.length===0){
  this.tr=false
}
else{
  this.tr=true
}
console.log(this.tr,'this.tr')

     this.recipe.changed.subscribe((data: Recepie[]) => {
      console.log(data);
      if (data.length===0) {
        this.tr = false;
      } else {
        this.tr = true;
      }
      console.log(this.tr,'hbb')
    });

  }
  ngOnDestroy() {
    console.log('destroy started');
  
  }
}
