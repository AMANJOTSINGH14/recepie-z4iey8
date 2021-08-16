import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { recepieservice } from '../recepie/recepie.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {
userSub:Subscription;
isAuthenticate=false;
authHeader=false;
  constructor(private service:StorageService , private auth:AuthService, private router:Router,private recipe:recepieservice) { }
ngOnInit():void{
this.userSub=this.auth.user.subscribe(res=>{
this.isAuthenticate= !!res;
if(!this.isAuthenticate){
this.router.navigate(['/auth'])

}
console.log(!res);
console.log(!!res);
})
this.auth.clicked.subscribe(data=>{
this.authHeader=data
})
}
onStoreData(){

this.service.onStoringData()
}
onlogOut(){
this.auth.logOut();
this.router.navigate(['/auth'])
this.recipe.onEmptyRecipe()
}
onFetchData(){
  this.service.onFetchingData().subscribe();
}
ngOnDestroy(){
  this.userSub.unsubscribe();
}
}


