import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { Recepie } from '../recepie/recepie.model';
import { recepieservice } from '../recepie/recepie.service';
import { Ingrediant } from './ingrediant.modal';

@Injectable()
export class StorageService {
  constructor(
    private http: HttpClient,
    private service: recepieservice,
    private auth: AuthService
  ) {}
userId:string
  onData(){
   return this.auth.user.subscribe(data=>{
    if(!data){
      return null
    } 
    this.userId=data.id
    })
  }
  onStoringData() {
    const recipelist = this.service.getRecipe();

    this.http
      .put(
        'https://recipe-59dc9-default-rtdb.firebaseio.com/'+this.userId+'recipelist.json',
        recipelist
      )
      .subscribe(h => {
        console.log(h);
      });
  }
  onFetchingData() {
    return this.http
      .get<Recepie[]>(
        'https://recipe-59dc9-default-rtdb.firebaseio.com/'+this.userId+'recipelist.json'
      )
      .pipe(
        map(recipe => 
          {if(!recipe){
            return recipe=[]
          }

          return recipe.map(recipe => {
            return {
              ...recipe,
              ingrediants: recipe.ingrediants ? recipe.ingrediants : []
            };
          });
        }),
        tap(recipe => {
          this.service.onOverride(recipe);
        })
      );

    // .subscribe(Biqu => {
    //   this.service.onOverride(Biqu);
    // });
  }
}
