import { Component,  OnDestroy,  OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Ingrediant } from '../../shared/ingrediant.modal';
import { StorageService } from '../../shared/storage.service';
import { Recepie } from '../recepie.model';
import { recepieservice } from '../recepie.service';
@Component({
  selector: 'app-recepie-list', 
  templateUrl: './recepie-list.component.html',
  
})
export class RecepieListComponent implements OnInit{

 recepies:Recepie[]
unsub:Subscription
  constructor(private recepieSERVICE:recepieservice , private router: Router , private route:ActivatedRoute , private se:StorageService) { }

  ngOnInit() {
    // this.unsub=this.se.onData()
    // this.se.onFetchingData().subscribe();
    this.recepies=this.recepieSERVICE.getRecipe()
  console.log(this.recepies,'list')
    this.recepieSERVICE.changed.subscribe(
    (recip:Recepie[]) => {
    
    this.recepies=recip
    console.log(this.recepies,'list')  
  });

}
onNewRecipe(){
this.router.navigate(['new'] , {relativeTo:this.route});
}
// ngOnDestroy(){
//   console.log('destroy recipe')
//   this.unsub.unsubscribe()
// }
}