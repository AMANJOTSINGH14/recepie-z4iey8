import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../shared/storage.service';
import { Recepie } from './recepie.model';
import { recepieservice } from './recepie.service';

@Injectable()
export class RecipeResolverService implements Resolve<Recepie[]> {

  constructor(private service:StorageService , private recipeservice:recepieservice ) { }
resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
const recipe=this.recipeservice.getRecipe();
if(recipe.length<1){
return this.service.onFetchingData();
}
else{
  return recipe;
}
}
}